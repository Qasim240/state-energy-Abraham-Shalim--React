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
import { useAddToCartMutation, useGetCategoriesQuery } from '../../../features/api/apiSlice';
import { addToCart, setHvacSelection } from '../../../features/slices/userSlice.js';
import { toast } from 'react-toastify';

// ✅ Validation schema
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
  const [addToCartApi, { isLoading }] = useAddToCartMutation();
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

  const { configuration, adders, detail_photo_url } = hvacData;

  const toggleAdder = (adder) =>
    setSelectedAdders((prev) =>
      prev.includes(adder) ? prev.filter((a) => a !== adder) : [...prev, adder]
    );

  const onSubmit = async (data) => {
    const payload = {
      category_id: hvacData.id,
      configuration: {
        capacity: data.capacity
      },
      adders: selectedAdders.map(name => {
        const found = adders.find(a => a.name === name);
        return {
          id: found.id,
          name: found.name,
          price: found.price.toString()
        };
      })
    };

    try {
      const response = await addToCartApi(payload).unwrap();

      if (response.success) {
        dispatch(addToCart({ ...response.data.cart }));
        toast.success('Added to cart successfully!');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add to cart');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4 lg:block hidden">
        <BackBtn className="mb-3" link="/collection" />
        <CustomSlider items={[detail_photo_url]} />
      </div>

      <div className="col-span-12 lg:col-span-8 flex flex-col min-h-full mt-4 lg:mt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow">
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
          onAddToCart={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Hvac;
