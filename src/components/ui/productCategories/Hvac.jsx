/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  categoryIcon,
  infoCircleIcon,
} from '../../../../imagesPath';
import IconHeading from '../../utils/IconHeading';
import Input from '../Input';
import AdderSelector from '../../utils/AdderSelector';
import Counter from '../../utils/Counter';
import AddToCardWedget from '../../utils/AddToCardWedget';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useAddToCartMutation,
  useEditCartItemMutation,
  useGetCategoriesQuery,
} from '../../../features/api/apiSlice';
import { setHvacSelection, addToCart } from '../../../features/slices/userSlice.js';
import { toast } from 'react-toastify';

/* ───────── validation ───────── */
const schema = yup.object({
  sub_category: yup.string().required('Choose system type'),
  capacity    : yup.string().required('Select capacity'),
});

const Hvac = () => {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const { cartId } = useParams();
  const isEditMode = Boolean(cartId);

  /* fetch categories */
  const { data: catRes, isLoading: catsLoading } = useGetCategoriesQuery();
  const categories = catRes?.data?.categories || [];
  const hvacData   = categories.find((c) => c.name?.toLowerCase() === 'hvac');

  if (catsLoading || !hvacData)
    return <p className="text-center mt-10 text-gray-500">Loading HVAC data…</p>;

  const { configuration, pricing, adders, detail_photo_url } = hvacData;

  /* form */
  const saved = useSelector((s) => s.user.hvacSelection || {});
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sub_category: saved.sub_category || '',
      capacity    : saved.capacity    || '',
    },
  });

  /* adder state with qty */
  const initialAdders = () =>
    (saved.adders || []).map((a) => {
      const def = adders.find((d) => d.name === (a.name || a));
      return { ...def, quantity: a.quantity ?? def.min_qty ?? 1 };
    });

  const [selectedAdders, setSelectedAdders] = useState(initialAdders);

  /* reactive values */
  const subCategory = watch('sub_category');
  const capacityStr = watch('capacity');          // e.g. "2 TON"

  /* base price (selected option) */
  const basePrice = useMemo(() => {
    if (!subCategory || !capacityStr) return 0;
    return parseFloat(pricing?.[subCategory]?.[capacityStr] || 0);
  }, [subCategory, capacityStr, pricing]);

  /* adder cost rule */
  const addersCost = useMemo(() => {
    return selectedAdders.reduce((sum, ad) => {
      const unit = parseFloat(ad.price) || 0;
      const qty  = ad.quantity ?? 1;
      const line =
        ad.type === 'dynamic'
          ? basePrice * unit * qty        // << rule you gave
          : unit * qty;                   // linear
      return sum + line;
    }, 0);
  }, [selectedAdders, basePrice]);

  const grandTotal = basePrice + addersCost;

  /* push to redux */
  useEffect(() => {
    dispatch(
      setHvacSelection({
        sub_category: subCategory,
        capacity    : capacityStr,
        adders      : selectedAdders,
        price       : grandTotal,
      })
    );
  }, [subCategory, capacityStr, selectedAdders, grandTotal, dispatch]);

  /* adder helpers */
  const toggleAdder = (name) => {
    setSelectedAdders((prev) => {
      const idx = prev.findIndex((p) => p.name === name);
      if (idx > -1) return prev.filter((p) => p.name !== name);

      const def = adders.find((d) => d.name === name);
      return [...prev, { ...def, quantity: def.min_qty ?? 1 }];
    });
  };

  const changeQty = (name, val) =>
    setSelectedAdders((prev) =>
      prev.map((a) => (a.name === name ? { ...a, quantity: val } : a))
    );

  /* submit */
  const [addToCartApi, { isLoading: saving }] = useAddToCartMutation();
  const [editCartItemApi]                     = useEditCartItemMutation();

  const onSubmit = async (form) => {
    const payload = {
      category_id: hvacData.id,
      configuration: {
        sub_category: form.sub_category,
        capacity    : form.capacity,
      },
      configuration_meta: { fields: configuration.fields },
      pricing_meta      : pricing,
      adders: selectedAdders.map((a) => {
        const unit = parseFloat(a.price);
        const qty  = a.quantity;
        const line =
          a.type === 'dynamic'
            ? basePrice * unit * qty
            : unit * qty;
        return {
          id         : a.id,
          name       : a.name,
          type       : a.type,
          unit_price : a.price,
          quantity   : qty,
          line_total : line.toString(),
        };
      }),
      price: grandTotal,
    };

    try {
      const res = isEditMode
        ? await editCartItemApi({ cartId, updatedData: payload }).unwrap()
        : await addToCartApi(payload).unwrap();

      if (res.success) {
        dispatch(addToCart(res.data.cart));
        toast.success(isEditMode ? 'Cart item updated!' : 'Added to cart!');
        if (isEditMode) navigate('/cart-details');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to submit');
    }
  };

  /* option lists */
  const systemTypes = configuration.fields.find((f) => f.name === 'sub_category')?.options || [];
  const capacityOpts =
    configuration.fields.find((f) => f.name === 'capacity')?.options?.[subCategory] || [];

  /* UI */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 hidden lg:block">
        <BackBtn link="/collection" className="mb-3" />
        <CustomSlider items={[detail_photo_url]} />
      </div>

      <div className="lg:col-span-8 flex flex-col mt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow">
          {/* system type */}
          <IconHeading primaryIcon={categoryIcon} headingText="Choose System Type" secondaryIcon={infoCircleIcon} />
          <div className="flex flex-wrap gap-4 my-6">
            {systemTypes.map((opt) => (
              <label key={opt}
                className={`px-5 py-2 w-[120px] text-center rounded-full font-medium border cursor-pointer transition
                  ${subCategory === opt ? 'bg-base-dark text-white border-base' : 'bg-white text-black border-gray-300'}`}
              >
                <input type="radio" className="hidden" value={opt}
                  checked={subCategory === opt}
                  onChange={() => { setValue('sub_category', opt); setValue('capacity', ''); }}
                />
                {opt}
              </label>
            ))}
          </div>
          {errors.sub_category && <p className="text-red-500 text-xs -mt-4 mb-4">{errors.sub_category.message}</p>}

          {/* capacity */}
          <div className="grid md:grid-cols-12 gap-4">
            <div className="col-span-6">
              <Controller
                name="capacity"
                control={control}
                render={({ field }) => (
                  <select {...field} className="border w-full rounded px-3 py-2">
                    <option value="">Select Capacity</option>
                    {capacityOpts.map((cap) => (
                      <option key={cap} value={cap}>{cap}</option>
                    ))}
                  </select>
                )}
              />
              {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity.message}</p>}
            </div>
          </div>

          {/* adders */}
          <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} className="mt-6" />
          <AdderSelector
            adders={adders.map((a) => a.name)}
            selectedAdders={selectedAdders.map((a) => a.name)}
            toggleAdder={toggleAdder}
          />

          {/* qty controls */}
          {selectedAdders.length > 0 && (
            <div className="mt-4 space-y-4">
              {selectedAdders.map((a) => (
                <div key={a.name} className="flex items-center gap-4">
                  <span className="flex-1">{a.name} ({a.type})</span>
                  <Counter
                    value={a.quantity}
                    min={a.min_qty}
                    max={a.max_qty}
                    onChange={(val) => changeQty(a.name, val)}
                  />
                  <span className="w-32 text-right">
                    {(
                      (a.type === 'dynamic'
                        ? basePrice * parseFloat(a.price)
                        : parseFloat(a.price)) * a.quantity
                    ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                    $
                  </span>
                </div>
              ))}
            </div>
          )}

        </form>

        {/* price widget */}
        <AddToCardWedget
          totalPrice={grandTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          onAddToCart={handleSubmit(onSubmit)}
          isLoading={saving}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

export default Hvac;
