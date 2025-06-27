/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { infoCircleIcon, orderSpec } from '../../../../imagesPath';
import IconHeading from '../../utils/IconHeading';
import Input from '../Input';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';
import {
  useAddToCartMutation,
  useEditCartItemMutation,
  useGetCategoriesQuery,
} from '../../../features/api/apiSlice';
import { setOtherSelection, addToCart } from '../../../features/slices/userSlice.js';

const schema = yup.object({
  description: yup.string().required().max(300),
  total_price: yup
    .number()
    .typeError('Must be a valid number')
    .required()
    .positive()
    .min(1),
});

const Others = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartId } = useParams();
  const isEditMode = Boolean(cartId);

  /* fetch categories so reload works */
  const { data: catRes, isLoading: catLoading } = useGetCategoriesQuery();
  const cachedCats = useSelector(
    (s) =>
      s.api.queries?.['getCategories(undefined)']?.data?.data?.categories || []
  );
  const categories = catRes?.data?.categories || cachedCats;
  const otherCategory = categories.find(
    (c) => c.name?.toLowerCase() === 'other'
  );

  /* local state */
  const saved = useSelector((s) => s.user.otherSelection || {});
  const [selectedAdders, setSelectedAdders] = useState(saved.adders || []);

  /* form */
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: saved.description || '',
      total_price: saved.total_price || '',
    },
  });

  /* mutations */
  const [addToCartApi, { isLoading: saving }] = useAddToCartMutation();
  const [editCartItemApi]                     = useEditCartItemMutation();

  /* helpers */
  const handleDraftChange = (key, val) =>
    dispatch(setOtherSelection({ ...saved, [key]: val }));

  const toggleAdder = (name) => {
    const next = selectedAdders.includes(name)
      ? selectedAdders.filter((n) => n !== name)
      : [...selectedAdders, name];
    setSelectedAdders(next);
    dispatch(setOtherSelection({ ...saved, adders: next }));
  };

  const onSubmit = async (data) => {
    const payload = {
      category_id: otherCategory.id,
      configuration: {
        description: data.description,
        total_price: data.total_price,
      },
      configuration_meta: { fields: otherCategory.configuration.fields },
      pricing_meta: otherCategory.pricing || {},
      adders: [],
      price: data.total_price,
    };

    try {
      const res = isEditMode
        ? await editCartItemApi({ cartId, updatedData: payload }).unwrap()
        : await addToCartApi(payload).unwrap();

      if (res.success) {
        dispatch(addToCart(res.data.cart));
        toast.success(isEditMode ? 'Item updated!' : 'Added to cart!');
        if (isEditMode) navigate('/cart-details');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to submit');
    }
  };

  /* loading guard after hooks */
  if (catLoading || !otherCategory) {
    return (
      <p className="text-center py-10 text-gray-500">
        Loading Other Services data…
      </p>
    );
  }

  const banner = [otherCategory.detail_photo_url];
  const adders = otherCategory.adders || [];

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4 hidden md:block">
        <BackBtn className="mb-3" link="/collection" />
        <CustomSlider items={banner} />
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow">
          <IconHeading
            primaryIcon={orderSpec}
            headingText="Order Specifications"
            secondaryIcon={infoCircleIcon}
          />

          {/* description */}
          <div className="mt-10">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Description"
                  type="textarea"
                  rows={6}
                  maxLength={300}
                  error={errors.description?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleDraftChange('description', e.target.value);
                  }}
                />
              )}
            />
          </div>

          {/* price */}
          <div className="mt-10">
            <Controller
              name="total_price"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Total Price"
                  type="number"
                  unit="$"
                  placeholder="e.g. 200.00"
                  error={errors.total_price?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleDraftChange('total_price', e.target.value);
                  }}
                />
              )}
            />
          </div>

          {/* adders (currently none) */}
          {adders.length > 0 && (
            <>
              <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
              <AdderSelector
                adders={adders.map((a) => a.name)}
                selectedAdders={selectedAdders}
                toggleAdder={toggleAdder}
              />
            </>
          )}

          <AddToCardWedget
            totalPrice={watch('total_price') || '0'}
            onAddToCart={handleSubmit(onSubmit)}
            isLoading={saving}
            isEditMode={isEditMode}
          />
        </form>
      </div>
    </div>
  );
};

export default Others;
