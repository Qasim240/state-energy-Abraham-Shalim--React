/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import {
  addmoreIcon, arrowUpIcon, arrowDownIcon, deleteIcon, doorIcon,
  infoCircleIcon, orderSpec
} from '../../../../imagesPath';
import { useSelector, useDispatch } from 'react-redux';
import {
  useAddToCartMutation,
  useEditCartItemMutation,
  useGetCategoriesQuery
} from '../../../features/api/apiSlice';
import { toast } from 'react-toastify';
import {
  setWindowSelection,
  addToCart,
  
} from '../../../features/slices/userSlice.js';



import CustomSlider from '../../utils/CustomSlider';
import IconHeading from '../../utils/IconHeading';
import PrimaryBtn from '../PrimaryBtn';
import Image from '../../utils/Image';
import Input from '../Input';
import Dropdown from '../Dropdown';
import Counter from '../../utils/Counter';
import AddToCardWedget from '../../utils/AddToCardWedget';
import VerticalSeparator from '../../utils/VerticalSeparator';
import BackBtn from '../../utils/BackBtn';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

/* ───────── helpers ───────── */
const pricePerSqft = (cat) =>
  parseFloat(cat?.pricing?.price_per_sqft || 0);

const windowSchema = yup.object().shape({
  height: yup.number().typeError('Height must be a number').required().positive(),
  width : yup.number().typeError('Width must be a number').required().positive(),
  type  : yup.string().required(),
  frameColor: yup.string().required(),
  tintColor : yup.string().required(),
  qty   : yup.number().typeError('Qty must be a number').required().min(1),
});

const Windows = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartId } = useParams();
  const isEditMode = !!cartId;

  /* ───── API ───── */
  const { data, isLoading } = useGetCategoriesQuery();
  const categories = data?.data?.categories || [];
  const windowCat  = categories.find((c) => c.name?.toLowerCase() === 'windows');
  const fields     = windowCat?.configuration?.fields || [];

  const [addToCartApi, { isLoading: saving }] = useAddToCartMutation();
  const [editCartItemApi]                     = useEditCartItemMutation();

  /* ───── Redux saved selection ───── */
  const saved = useSelector((s) => s.user.windowSelection || []);

  /* ───── local state ───── */
  const [windowList, setWindowList] = useState(
    saved.length
      ? saved.map((w) => ({ ...w, errors: {}, isOpen: true }))
      : [{
          id: Date.now(),
          height: '', width: '', type: '', frameColor: '',
          tintColor: '', qty: 1, isOpen: true, errors: {}
        }]
  );

  /* ───── option helpers ───── */
  const label = (n) => fields.find((f) => f.name === n)?.label || n;
  const typeOptions       = fields.find(f => f.name === 'type')?.options        || [];
  const frameColorOptions = fields.find(f => f.name === 'frame_color')?.options || [];
  const banner = windowCat?.detail_photo_url ? [windowCat.detail_photo_url] : [];

  /* ───── price calculation ───── */
  const grandTotal = useMemo(() => {
    const pps = pricePerSqft(windowCat);
    return windowList.reduce((sum, w) => {
      const h = parseFloat(w.height) || 0;
      const wi = parseFloat(w.width) || 0;
      const area = (h * wi) / 144;           // sqft
      return sum + area * pps * (w.qty || 1);
    }, 0);
  }, [windowList, windowCat]);

  /* ───── sync to Redux draft ───── */
  useEffect(() => {
    dispatch(setWindowSelection(windowList));
  }, [windowList, dispatch]);

  /* ───── field helpers ───── */
  const handleChange = (id, key, val) =>
    setWindowList((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, [key]: val, errors: { ...w.errors, [key]: '' } } : w
      )
    );

  const addWindow = () =>
    setWindowList((p) => [
      ...p,
      {
        id: Date.now(),
        height: '', width: '', type: '', frameColor: '',
        tintColor: '', qty: 1, isOpen: true, errors: {}
      },
    ]);

  const confirmRemove = (id) => {
    if (window.confirm('Remove this window?')) {
      setWindowList((p) => p.filter((w) => w.id !== id));
      dispatch(removeCartItem(id));
    }
  };

  const toggleAccordion = (id) =>
    setWindowList((p) => p.map((w) => (w.id === id ? { ...w, isOpen: !w.isOpen } : w)));

  /* ───── validate & submit ───── */
  const handleAddOrUpdate = async () => {
    let allValid = true;

    const validated = await Promise.all(
      windowList.map(async (w) => {
        try {
          await windowSchema.validate(w, { abortEarly: false });
          return { ...w, errors: {} };
        } catch (err) {
          allValid = false;
          const errs = {};
          err.inner.forEach((e) => (errs[e.path] = e.message));
          return { ...w, errors: errs };
        }
      })
    );

    setWindowList(validated);
    if (!allValid) return toast.error('Please fix validation errors');

    /* build config */
    const windowsConf = validated.map(({ height, width, type, frameColor, tintColor, qty }) => ({
      height, width, type,
      frame_color: frameColor,
      tint_color : tintColor,
      qty,
    }));

    const payload = {
      category_id       : windowCat.id,
      configuration     : { windows: windowsConf },
      configuration_meta: { fields },
      pricing_meta      : windowCat.pricing || {},
      adders            : [],
      price             : grandTotal,
    };

    try {
      const res = isEditMode
        ? await editCartItemApi({ cartId, updatedData: payload }).unwrap()
        : await addToCartApi(payload).unwrap();

      if (res.success) {
        dispatch(addToCart(res.data.cart));
        toast.success(isEditMode ? 'Windows updated!' : 'Windows added!');
        if (isEditMode) navigate('/cart-details');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to submit');
    }
  };

  /* ───── loading guards ───── */
  if (isLoading)        return <p className="text-center mt-10">Loading window data…</p>;
  if (!windowCat)       return <p className="text-center mt-10 text-red-500">Category not found.</p>;

  /* ───── render ───── */
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* left banner */}
      <div className="col-span-12 md:col-span-4 hidden md:block">
        <BackBtn className="mb-3" link="/collection" />
        <CustomSlider items={banner} />
      </div>

      {/* right */}
      <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center">
            <IconHeading
              primaryIcon={orderSpec}
              headingText="Order Specifications"
              secondaryIcon={infoCircleIcon}
            />
            <PrimaryBtn
              className="bg-transparent px-0 py-0"
              iconLeft={addmoreIcon}
              onClick={addWindow}
            >
              <span className="text-base-dark text-sm">Add window</span>
            </PrimaryBtn>
          </div>

          {windowList.length === 0 ? (
            <p className="text-gray-500 italic mt-6">Please add a window.</p>
          ) : (
            windowList.map((w, idx) => (
              <div key={w.id} className="border border-secondary rounded-large p-4 mt-6">
                {/* header row */}
                <div className="flex justify-between items-center">
                  <IconHeading
                    primaryIcon={doorIcon}
                    headingText={`Window ${idx + 1}`}
                    secondaryIcon={infoCircleIcon}
                  />
                  <div className="flex gap-4 items-center">
                    <button onClick={() => confirmRemove(w.id)}>
                      <Image img={deleteIcon} />
                    </button>
                    <VerticalSeparator className="h-10" />
                    <PrimaryBtn
                      className="bg-transparent px-2"
                      onClick={() => toggleAccordion(w.id)}
                    >
                      <Image img={w.isOpen ? arrowUpIcon : arrowDownIcon} />
                    </PrimaryBtn>
                  </div>
                </div>

                {/* body */}
                {w.isOpen && (
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Input
                      label={label('height')}
                      unit="inch"
                      value={w.height}
                      onChange={(e) => handleChange(w.id, 'height', e.target.value)}
                      error={w.errors.height}
                    />
                    <Input
                      label={label('width')}
                      unit="inch"
                      value={w.width}
                      onChange={(e) => handleChange(w.id, 'width', e.target.value)}
                      error={w.errors.width}
                    />
                    <Dropdown
                      label={label('type')}
                      options={typeOptions}
                      value={w.type}
                      onChange={(val) => handleChange(w.id, 'type', val)}
                      error={w.errors.type}
                    />
                    <Dropdown
                      label={label('frame_color')}
                      options={frameColorOptions}
                      value={w.frameColor}
                      onChange={(val) => handleChange(w.id, 'frameColor', val)}
                      error={w.errors.frameColor}
                    />
                    <Input
                      label={label('tint_color')}
                      value={w.tintColor}
                      onChange={(e) => handleChange(w.id, 'tintColor', e.target.value)}
                      error={w.errors.tintColor}
                    />
                    <Counter
                      label={label('qty')}
                      value={w.qty}
                      onChange={(val) => handleChange(w.id, 'qty', val)}
                      min={1}
                      max={100}
                      error={w.errors.qty}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* price widget */}
        <AddToCardWedget
          totalPrice={grandTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          onAddToCart={handleAddOrUpdate}
          isLoading={saving}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

export default Windows;
