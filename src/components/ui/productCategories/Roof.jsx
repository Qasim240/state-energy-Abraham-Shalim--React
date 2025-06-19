import React, { useEffect, useState } from 'react';
import {
  categoryIcon,
  infoCircleIcon,
  orderSpec
} from '../../../../imagesPath';
import Input from '../Input';
import IconHeading from '../../utils/IconHeading';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from '../Dropdown';
import RoofSkeleton from '../../utils/RoofSkeleton.jsx';
import { toast } from 'react-toastify';
import { useAddToCartMutation } from '../../../features/api/apiSlice.js';
import { setRoofSelection, addToCart } from '../../../features/slices/userSlice.js';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  squareFootage: yup
    .number()
    .typeError('Square footage must be a number')
    .positive('Must be greater than 0')
    .required('Square footage is required'),
  color: yup.string().required('Color is required')
});

const Roof = () => {
  const dispatch = useDispatch();
  const [addToCartApi, { isLoading }] = useAddToCartMutation();
  const categories = useSelector((state) => state.user.categories);
  const savedRoof = useSelector((state) => state.user.roofSelection || {});
  const roofData = categories.find((cat) => cat.name.toLowerCase() === 'roof');

  const [selectedVariant, setSelectedVariant] = useState(savedRoof.variant || '');
  const [selectedAdders, setSelectedAdders] = useState(savedRoof.adders || []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      squareFootage: savedRoof.squareFootage || '',
      color: savedRoof.color || ''
    }
  });

  const squareFootage = watch('squareFootage');
  const color = watch('color');

  useEffect(() => {
    if (roofData && !savedRoof.variant) {
      const defaultCategory = roofData.configuration.fields.find(f => f.name === 'category')?.options[0];
      setSelectedVariant(defaultCategory || '');
    }
  }, [roofData, savedRoof.variant]);

  useEffect(() => {
    dispatch(setRoofSelection({
      variant: selectedVariant,
      squareFootage,
      color,
      adders: selectedAdders
    }));
  }, [selectedVariant, squareFootage, color, selectedAdders, dispatch]);

  const toggleAdder = (adderName) => {
    setSelectedAdders((prev) =>
      prev.includes(adderName)
        ? prev.filter((a) => a !== adderName)
        : [...prev, adderName]
    );
  };

  const handleAddToCart = async (formData) => {
    try {
      const cartData = {
        category_id: roofData.id,
        configuration: {
          variant: selectedVariant,
          square_footage: formData.squareFootage.toString(),
          color: formData.color
        },
        adders: selectedAdders.map(name => {
          const adder = roofData.adders.find(a => a.name === name);
          return {
            id: adder.id,
            name: adder.name,
            price: adder.price.toString()
          };
        })
      };

      const response = await addToCartApi(cartData).unwrap();

      if (response.success) {
        dispatch(addToCart({ ...response.data.cart }));
        toast.success('Added to cart successfully!');
      }
    } catch (err) {
      toast.error(err.data?.message || 'Failed to add to cart');
    }
  };

  if (!roofData) return <RoofSkeleton />;

  const { configuration, adders, detail_photo_url } = roofData;
  const categoryOptions = configuration.fields.find(f => f.name === 'category')?.options || [];
  const colorOptions = configuration.fields.find(f => f.name === 'color')?.options || [];

  const fieldMap = Object.fromEntries(
    (configuration?.fields || []).map((f) => [f.name, f])
  );

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4 hidden md:block">
        <BackBtn className='mb-3' link='/collection' />
        <CustomSlider items={detail_photo_url ? [detail_photo_url] : []} />
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
        <div className='flex flex-col flex-grow'>
          <IconHeading
            primaryIcon={categoryIcon}
            headingText={fieldMap.category?.label}
            secondaryIcon={infoCircleIcon}
          />

          <div className="flex gap-4 flex-wrap my-8">
            {categoryOptions.map((variant) => (
              <label
                key={variant}
                className={`px-5 py-2 w-[100px] text-center rounded-full font-Avenir font-medium border cursor-pointer transition
                  ${selectedVariant === variant
                    ? 'bg-base-dark text-white border-base'
                    : 'bg-white text-black border-gray-300'
                  }`}
              >
                <input
                  type="radio"
                  name="variant"
                  value={variant}
                  className="hidden"
                  checked={selectedVariant === variant}
                  onChange={() => setSelectedVariant(variant)}
                />
                {variant}
              </label>
            ))}
          </div>

          <div className="grid md:grid-cols-12 gap-4 mt-6">
            <div className="col-span-6">
              <Controller
                name="squareFootage"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label={fieldMap.square_footage?.label}
                    placeholder="2000"
                    error={errors.squareFootage?.message}
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
                    options={colorOptions}
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
          onAddToCart={handleSubmit(handleAddToCart)}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Roof;
