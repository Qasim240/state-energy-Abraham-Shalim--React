/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import {
  categoryIcon,
  infoCircleIcon,
} from '../../../../imagesPath';
import Input from '../Input';
import Dropdown from '../Dropdown';
import IconHeading from '../../utils/IconHeading';
import AdderSelector from '../../utils/AdderSelector';
import Counter from '../../utils/Counter';                 // ⬅ plus/minus component
import AddToCardWedget from '../../utils/AddToCardWedget';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';
import { useDispatch, useSelector } from 'react-redux';
import RoofSkeleton from '../../utils/RoofSkeleton';
import {
  useAddToCartMutation,
  useEditCartItemMutation,
} from '../../../features/api/apiSlice';
import { addToCart } from '../../../features/slices/userSlice.js';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

/* ───────── validation ───────── */
const schema = yup.object({
  category: yup.string().required(),
  square_footage: yup.number().typeError('Number').positive().required(),
  color: yup.string().required(),
});

const Roof = () => {
  const dispatch = useDispatch();
  const { cartId } = useParams();
  const isEditMode = Boolean(cartId);

  /* API hooks */
  const [addToCartApi, { isLoading }] = useAddToCartMutation();
  const [editCartItemApi]             = useEditCartItemMutation();

  /* Redux state */
  const categories = useSelector((s) => s.user.categories);
  const cartItems  = useSelector((s) => s.user.cart);

  const roofData = categories.find((c) => c.name?.toLowerCase() === 'roof');
  const existing = cartItems.find((c) => c.id == cartId);

  if (!roofData) return <RoofSkeleton />;

  const fields       = roofData.configuration.fields;
  const addersMaster = roofData.adders;

  /* helpers */
  const getField = (n) => fields.find((f) => f.name === n) || {};
  const label    = (n) => getField(n).label || n;
  const unit     = (n) => getField(n).unit  || undefined;

  /* -------- adder state with qty -------- */
  const initialAdders = () => {
    if (isEditMode && existing?.adders?.length) return existing.adders;
    return [];
  };
  const [selectedAdders, setSelectedAdders] = useState(initialAdders);

  /* form */
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category      : '',
      square_footage: '',
      color         : '',
    },
  });

  /* pre-fill on edit */
  useEffect(() => {
    if (!isEditMode || !existing) return;
    fields.forEach(({ name }) => setValue(name, existing.configuration?.[name] ?? ''));
  }, [isEditMode, existing, fields, setValue]);

  /* reactive prices */
  const category = watch('category');
  const sqft     = +watch('square_footage') || 0;

  const pricePerSqft = useMemo(() => {
    if (!category) return 0;
    return +roofData.pricing?.[category]?.price_per_sqft || 0;
  }, [category, roofData]);

  const addersCost = useMemo(() => {
    return selectedAdders.reduce((sum, a) => {
      const line =
        a.type === 'dynamic'
          ? +a.price * pricePerSqft * a.quantity
          : +a.price * a.quantity;
      return sum + line;
    }, 0);
  }, [selectedAdders, pricePerSqft]);

  const subtotal   = sqft * pricePerSqft;
  const grandTotal = subtotal + addersCost;

  /* ---------- adder helpers ---------- */
  const toggleAdder = (name) => {
    setSelectedAdders((prev) => {
      const idx = prev.findIndex((p) => p.name === name);
      if (idx > -1) return prev.filter((p) => p.name !== name);

      const def = addersMaster.find((d) => d.name === name);
      return [...prev, { ...def, quantity: def.min_qty ?? 1 }];
    });
  };

  const updateQty = (name, val) => {
    setSelectedAdders((prev) =>
      prev.map((a) => (a.name === name ? { ...a, quantity: val } : a))
    );
  };

  /* ---------- submit ---------- */
  const onSubmit = async (data) => {
    const configuration = {
      category      : data.category,
      square_footage: data.square_footage,
      color         : data.color,
    };

    const payload = {
      category_id       : roofData.id,
      configuration,
      configuration_meta: { fields },
      pricing_meta      : roofData.pricing,
      adders            : selectedAdders.map((a) => ({
        id       : a.id,
        name     : a.name,
        price    : a.price,
        type     : a.type,
        quantity : a.quantity,
      })),
      price: grandTotal,
    };

    try {
      if (isEditMode) {
        await editCartItemApi({ cartId, updatedData: payload }).unwrap();
        toast.success('Cart item updated');
      } else {
        const res = await addToCartApi(payload).unwrap();
        if (res.success) dispatch(addToCart(res.data.cart));
        toast.success('Added to cart');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to submit');
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4 hidden md:block">
        <BackBtn link="/collection" className="mb-3" />
        <CustomSlider items={[roofData.detail_photo_url]} />
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col mt-4">
        <div className="flex flex-col flex-grow">
          {/* category */}
          <IconHeading
            primaryIcon={categoryIcon}
            headingText="Choose Category"
            secondaryIcon={infoCircleIcon}
          />
          <div className="flex flex-wrap gap-4 my-8">
            {getField('category').options.map((opt) => (
              <label
                key={opt}
                className={`px-5 py-2 w-[100px] text-center rounded-full font-medium border cursor-pointer transition
                  ${watch('category') === opt
                    ? 'bg-base-dark text-white border-base'
                    : 'bg-white text-black border-gray-300'}`}
              >
                <input
                  type="radio"
                  className="hidden"
                  value={opt}
                  checked={watch('category') === opt}
                  onChange={() => setValue('category', opt)}
                />
                {opt}
              </label>
            ))}
          </div>
          {errors.category && (
            <p className="text-red-500 text-xs -mt-3 mb-3">{errors.category.message}</p>
          )}

          {/* sqft + color */}
          <div className="grid md:grid-cols-12 gap-4">
            <div className="col-span-6">
              <Controller
                name="square_footage"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label={label('square_footage')}
                    unit={unit('square_footage')}
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
                    label={label('color')}
                    options={getField('color').options}
                    error={errors.color?.message}
                  />
                )}
              />
            </div>
          </div>

          {/* adders */}
          <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} className="mt-6" />
          <AdderSelector
            adders={addersMaster.map((a) => a.name)}
            selectedAdders={selectedAdders.map((a) => a.name)}
            toggleAdder={toggleAdder}
          />

          {/* quantity controls */}
          {selectedAdders.length > 0 && (
            <div className="mt-5 space-y-4">
              {selectedAdders.map((a) => (
                <div key={a.name} className="flex items-center gap-4">
                  {/* <span className="flex-1">
                    {a.name} ({a.type})
                  </span> */}

                  {/* Counter with min/max */}
                  {/* <Counter
                    value={a.quantity}
                    onChange={(val) => updateQty(a.name, val)}
                    min={a.min_qty}
                    max={a.max_qty}
                  /> */}

                  {/* <span className="w-24 text-right">
                    {(
                      (a.type === 'dynamic'
                        ? +a.price * pricePerSqft
                        : +a.price) * a.quantity
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    $
                  </span> */}
                </div>
              ))}
            </div>
          )}
        </div>

        <AddToCardWedget
          totalPrice={grandTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          onAddToCart={handleSubmit(onSubmit)}
          isLoading={isLoading}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

export default Roof;
