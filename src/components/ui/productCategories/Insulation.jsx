/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  categoryIcon,
  infoCircleIcon,
  orderSpec,
} from '../../../../imagesPath';
import { useSelector, useDispatch } from 'react-redux';
import IconHeading from '../../utils/IconHeading';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';
import Dropdown from '../Dropdown';
import Input from '../Input';
import AddToCardWedget from '../../utils/AddToCardWedget';
import {
  useAddToCartMutation,
  useEditCartItemMutation,
  useGetCategoriesQuery,
} from '../../../features/api/apiSlice';
import { setInsulationSelection, addToCart } from '../../../features/slices/userSlice.js';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const Insulation = () => {
  /** ───── base hooks & RTK mutations (always run) ───── */
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { cartId } = useParams();
  const isEditMode = Boolean(cartId);

  const [addToCartApi, { isLoading: saving }] = useAddToCartMutation();
  const [editCartItemApi]                     = useEditCartItemMutation();

  /** 🔗 fetch categories every time (cold refresh safety) */
  const { data: catRes, isLoading: catLoading } = useGetCategoriesQuery();

  /** cached categories (hook always runs) */
  const cachedCategories = useSelector(
    (s) =>
      s.api.queries?.['getCategories(undefined)']?.data?.data?.categories || []
  );

  /** pick whichever list is available first */
  const categories = catRes?.data?.categories || cachedCategories;

  /** selected category */
  const insulation = categories.find(
    (c) => c.name?.toLowerCase() === 'insulation'
  );

  /** derive field/price tables (safe if undefined) */
  const fields       = insulation?.configuration?.fields || [];
  const pricingTbl   = insulation?.pricing || {};
  const rValueMap    = fields.find((f) => f.name === 'r_value')?.options || {};
  const typeOptions  = fields.find((f) => f.name === 'sub_category')?.options || [];
  const banner       = insulation ? [insulation.detail_photo_url] : [];

  /** user draft from Redux */
  const savedDraft = useSelector((s) => s.user.insulationSelection || {});

  /** ───── local state (hooks always declared) ───── */
  const [type, setType]   = useState(savedDraft.subCategory || typeOptions[0] || '');
  const [rValue, setRVal] = useState(savedDraft.rValue     || '');
  const [sqft, setSqft]   = useState(savedDraft.squareFootage || '');
  const [removeOld, setRemoveOld] = useState(savedDraft.insulationRemoval || false);

  /** dynamic R-value list */
  const rValueOptions = type ? rValueMap[type] || [] : [];

  /** keep R-value valid on type change */
  useEffect(() => {
    if (type && !rValueOptions.includes(rValue)) setRVal(rValueOptions[0] || '');
  }, [type, rValueOptions]); // rValue can remain if still valid

  /** pricing */
  const pricePerSqft = parseFloat(pricingTbl?.[type]?.[rValue] || 0);
  const basePrice    = (parseFloat(sqft) || 0) * pricePerSqft;
  const grandTotal   = basePrice;

  /** sync to Redux draft */
  useEffect(() => {
    dispatch(
      setInsulationSelection({
        subCategory       : type,
        rValue            : rValue,
        squareFootage     : sqft,
        insulationRemoval : removeOld,
        adders            : [],
        price             : grandTotal,
      })
    );
  }, [type, rValue, sqft, removeOld, grandTotal, dispatch]);

  /** validation schema */
  const schema = yup.object().shape({
    subCategory   : yup.string().required('Select insulation type'),
    rValue        : yup.string().required('Select R-value'),
    squareFootage : yup.number().typeError('Must be a number').required().positive(),
  });

  /** submit handler */
  const handleSubmit = async () => {
    try {
      await schema.validate(
        { subCategory: type, rValue, squareFootage: sqft },
        { abortEarly: false }
      );
    } catch (err) {
      toast.error(err.errors?.[0] || 'Fix validation errors');
      return;
    }

    const payload = {
      category_id       : insulation.id,
      configuration     : {
        sub_category      : type,
        r_value           : rValue,
        square_footage    : sqft,
        insulation_removal: removeOld,
      },
      configuration_meta: { fields },
      pricing_meta      : pricingTbl,
      adders            : [],
      price             : grandTotal,
    };

    try {
      const res = isEditMode
        ? await editCartItemApi({ cartId, updatedData: payload }).unwrap()
        : await addToCartApi(payload).unwrap();

      if (res.success) {
        dispatch(addToCart(res.data.cart));
        toast.success(isEditMode ? 'Insulation updated!' : 'Insulation added!');
        if (isEditMode) navigate('/cart-details');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Submission failed');
    }
  };

  /** label helper (safe) */
  const label = (n) => fields.find((f) => f.name === n)?.label || n;

  /** ───── loading guard AFTER all hooks ───── */
  if (catLoading || !insulation) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading insulation data…
      </p>
    );
  }

  /** ───── UI ───── */
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4 hidden md:block">
        <BackBtn className="mb-3" link="/collection" />
        <CustomSlider items={banner} />
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
        <div className="flex flex-col flex-grow">
          {/* type selector */}
          <IconHeading
            primaryIcon={categoryIcon}
            headingText={label('sub_category')}
            secondaryIcon={infoCircleIcon}
          />
          <div className="flex gap-4 flex-wrap my-8">
            {typeOptions.map((opt) => (
              <label
                key={opt}
                className={`px-5 py-2 rounded-full font-medium border cursor-pointer transition
                  ${type === opt ? 'bg-base-dark text-white' : 'bg-white text-black border-gray-300'}
                `}
              >
                <input
                  type="radio"
                  className="hidden"
                  checked={type === opt}
                  onChange={() => setType(opt)}
                />
                {opt}
              </label>
            ))}
          </div>

          {/* specs */}
          <IconHeading
            primaryIcon={orderSpec}
            headingText="Order Specifications"
            secondaryIcon={infoCircleIcon}
            className="my-10"
          />

          <div className="grid md:grid-cols-12 gap-4">
            <div className="col-span-6">
              <Dropdown
                label={label('r_value')}
                options={rValueOptions}
                value={rValue}
                onChange={setRVal}
              />
            </div>
            <div className="col-span-6">
              <Input
                type="text"
                label={label('square_footage')}
                unit="sqft"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
              />
            </div>
          </div>

          {/* removal toggle */}
          <div className="mt-6">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeOld}
                onChange={() => setRemoveOld((p) => !p)}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:bg-primary" />
              <span className="ms-3 text-sm font-medium text-gray-900">
                Include Insulation Removal
              </span>
            </label>
          </div>
        </div>

        {/* price widget */}
        <AddToCardWedget
          totalPrice={grandTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          onAddToCart={handleSubmit}
          isLoading={saving}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

export default Insulation;
