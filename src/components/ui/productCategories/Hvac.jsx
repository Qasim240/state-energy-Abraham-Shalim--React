import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  categoryIcon,
  infoCircleIcon
} from '../../../../imagesPath';
import Input from '../Input';
import IconHeading from '../../utils/IconHeading';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useAddToCartMutation,
  useEditCartItemMutation,
  useGetCategoriesQuery
} from '../../../features/api/apiSlice';
import { addToCart, setHvacSelection } from '../../../features/slices/userSlice.js';
import { toast } from 'react-toastify';

// ✅ Schema
const hvacSchema = yup.object().shape({
  capacity: yup
    .number()
    .typeError('Capacity must be a number')
    .required('Capacity is required')
    .positive('Capacity must be positive')
    .min(1, 'Minimum capacity is 1 TON')
    .max(10, 'Maximum capacity is 10 TON'),
});

const Hvac = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartId } = useParams();
  const isEditMode = !!cartId;

  const [addToCartApi, { isLoading }] = useAddToCartMutation();
  const [editCartItemApi] = useEditCartItemMutation();
  const { data, isLoading: isCatLoading } = useGetCategoriesQuery();

  const savedHvac = useSelector((state) => state.user.hvacSelection || {});
  const [selectedAdders, setSelectedAdders] = useState(savedHvac.adders || []);

  const categories = data?.data?.categories || [];
  const hvacData = categories.find((cat) => cat.name.toLowerCase() === 'hvac');

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(hvacSchema),
    defaultValues: {
      capacity: savedHvac.capacity || ''
    }
  });

  const capacity = watch('capacity');

  useEffect(() => {
    dispatch(setHvacSelection({
      capacity,
      adders: selectedAdders
    }));
  }, [capacity, selectedAdders, dispatch]);

  if (isCatLoading || !hvacData) {
    return <p className="text-center mt-10 text-gray-500">Loading HVAC Data...</p>;
  }

  const { configuration, adders, detail_photo_url, pricing } = hvacData;

  const toggleAdder = (adder) =>
    setSelectedAdders((prev) =>
      prev.includes(adder) ? prev.filter((a) => a !== adder) : [...prev, adder]
    );

  const handleAddOrUpdate = async (formData) => {
    const configPayload = {
      capacity: formData.capacity
    };

    const metaFields = {
      fields: configuration.fields
    };

    const payload = {
      category_id: hvacData.id,
      configuration: configPayload,
      configuration_meta: metaFields,
      pricing_meta: pricing || {},
      adders: selectedAdders.map(name => {
        const found = adders.find(a => a.name === name);
        return {
          id: found.id,
          name: found.name,
          price: found.price.toString()
        };
      }),
      price: 200
    };

    try {
      const response = isEditMode
        ? await editCartItemApi({ cartId, updatedData: payload }).unwrap()
        : await addToCartApi(payload).unwrap();

      if (response.success) {
        dispatch(addToCart(response.data.cart));
        toast.success(isEditMode ? 'Cart item updated!' : 'Added to cart!');
        if (isEditMode) navigate('/cart-details');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Action failed');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4 lg:block hidden">
        <BackBtn className="mb-3" link="/collection" />
        <CustomSlider items={[detail_photo_url]} />
      </div>

      <div className="col-span-12 lg:col-span-8 flex flex-col min-h-full mt-4 lg:mt-0">
        <form onSubmit={handleSubmit(handleAddOrUpdate)} className="flex flex-col flex-grow">
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Controller
              name="capacity"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  unit="TON"
                  label={configuration.fields.find(f => f.name === 'capacity')?.label || 'Capacity'}
                  placeholder="e.g. 2.5"
                  error={errors.capacity?.message}
                />
              )}
            />
          </div>

          <div className="mb-4 mt-6">
            <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
            <AdderSelector
              adders={adders.map(a => a.name)}
              selectedAdders={selectedAdders}
              toggleAdder={toggleAdder}
            />
          </div>
        </form>

        <AddToCardWedget
          totalPrice="200"
          onAddToCart={handleSubmit(handleAddOrUpdate)}
          isLoading={isLoading}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

export default Hvac;
