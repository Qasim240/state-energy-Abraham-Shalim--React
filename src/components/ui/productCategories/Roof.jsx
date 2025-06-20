import React, { useEffect, useState } from 'react';
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
import Dropdown from '../Dropdown';
import RoofSkeleton from '../../utils/RoofSkeleton.jsx';
import { toast } from 'react-toastify';
import {
  useAddToCartMutation,
  useEditCartItemMutation
} from '../../../features/api/apiSlice.js';
import { addToCart } from '../../../features/slices/userSlice.js';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

// ✅ Validation schema
const schema = yup.object({
  variant: yup.string().required('Please select a roof variant'),
  square_footage: yup
    .number()
    .typeError('Square footage must be a number')
    .required('Please enter square footage')
    .positive('Must be positive'),
  color: yup.string().required('Please select a color'),
});

const Roof = () => {
  const dispatch = useDispatch();
  const { cartId } = useParams();
  const isEditMode = !!cartId;

  const [addToCartApi, { isLoading }] = useAddToCartMutation();
  const [editCartItemApi] = useEditCartItemMutation();

  const categories = useSelector((state) => state.user.categories);
  const cartItems = useSelector((state) => state.user.cart);
  const existingCartItem = cartItems.find((item) => item.id == cartId);
  const roofData = categories.find((cat) => cat.name.toLowerCase() === 'roof');

  const [selectedAdders, setSelectedAdders] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      variant: '',
      square_footage: '',
      color: ''
    }
  });

  // Prefill form and adder data
  useEffect(() => {
    if (!roofData) return;

    const configFields = roofData.configuration?.fields || [];

    configFields.forEach((field) => {
      const name = field.name;
      const defaultValue =
        isEditMode && existingCartItem?.configuration?.[name]
          ? existingCartItem.configuration[name]
          : '';
      setValue(name, defaultValue);
    });

    const adderNames = isEditMode
      ? existingCartItem?.adders?.map((a) => a.name) || []
      : [];
    setSelectedAdders(adderNames);
  }, [roofData, isEditMode, existingCartItem, setValue]);

  const toggleAdder = (name) => {
    setSelectedAdders((prev) =>
      prev.includes(name)
        ? prev.filter((a) => a !== name)
        : [...prev, name]
    );
  };

  const handleAddOrUpdate = async (formData) => {
    const configFields = roofData.configuration?.fields || [];

    const configuration = {};
    configFields.forEach((field) => {
      const val = formData[field.name];
      if (val !== undefined) {
        configuration[field.name] = typeof val === 'number' ? val.toString() : val;
      }
    });

    const payload = {
      category_id: roofData.id,
      configuration,
      adders: selectedAdders.map((name) => {
        const match = roofData.adders.find((a) => a.name === name);
        return {
          id: match.id,
          name: match.name,
          price: match.price.toString()
        };
      })
    };

    try {
      if (isEditMode) {
        await editCartItemApi({ cartId, updatedData: payload }).unwrap();
        toast.success('Updated cart item');
      } else {
        const res = await addToCartApi(payload).unwrap();
        if (res.success) {
          dispatch(addToCart({ ...res.data.cart }));
          toast.success('Added to cart');
        }
      }
    } catch (err) {
      toast.error(err.data?.message || 'Failed to submit cart');
    }
  };

  if (!roofData) return <RoofSkeleton />;

  const { configuration, adders, detail_photo_url } = roofData;
  const fieldMap = Object.fromEntries(
    (configuration?.fields || []).map((f) => [f.name, f])
  );

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4 hidden md:block">
        <BackBtn className="mb-3" link="/collection" />
        <CustomSlider items={detail_photo_url ? [detail_photo_url] : []} />
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
        <div className="flex flex-col flex-grow">
          <IconHeading
            primaryIcon={categoryIcon}
            headingText="Choose Variant"
            secondaryIcon={infoCircleIcon}
          />

          <div className="flex gap-4 flex-wrap my-8">
            {fieldMap.variant?.options?.map((variantOption) => (
              <label
                key={variantOption}
                className={`px-5 py-2 w-[100px] text-center rounded-full font-Avenir font-medium border cursor-pointer transition
                  ${watch('variant') === variantOption
                    ? 'bg-base-dark text-white border-base'
                    : 'bg-white text-black border-gray-300'
                  }`}
              >
                <input
                  type="radio"
                  name="variant"
                  value={variantOption}
                  className="hidden"
                  checked={watch('variant') === variantOption}
                  onChange={() => setValue('variant', variantOption)}
                />
                {variantOption}
              </label>
            ))}
            {errors.variant && <p className="text-red-500 text-xs mt-1">{errors.variant.message}</p>}
          </div>

          <div className="grid md:grid-cols-12 gap-4 mt-6">
            <div className="col-span-6">
              <Controller
                name="square_footage"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label={fieldMap.square_footage?.label}
                    placeholder="2000"
                    error={errors.square_footage?.message}
                  />
                )}
              />
            </div>
            <div className="col-span-6">
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    label={fieldMap.color?.label}
                    options={fieldMap.color?.options || []}
                    error={errors.color?.message}
                  />
                )}
              />
            </div>
          </div>

          <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
          <AdderSelector
            adders={adders.map((a) => a.name)}
            selectedAdders={selectedAdders}
            toggleAdder={toggleAdder}
          />
        </div>

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

export default Roof;
