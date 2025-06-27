/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import {
  arrowUpIcon, arrowDownIcon, deleteIcon, doorIcon,
  infoCircleIcon, orderSpec, addmoreIcon,
} from '../../../../imagesPath';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import {
  useAddToCartMutation,
  useEditCartItemMutation,
} from '../../../features/api/apiSlice';
import {
  setDoorSelection,
  addToCart,
} from '../../../features/slices/userSlice.js';
import IconHeading from '../../utils/IconHeading';
import Image from '../../utils/Image';
import VerticalSeparator from '../../utils/VerticalSeparator';
import PrimaryBtn from '../PrimaryBtn';
import Input from '../Input';
import Dropdown from '../Dropdown';
import Counter from '../../utils/Counter';
import AddToCardWedget from '../../utils/AddToCardWedget';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';
import { useParams, useNavigate } from 'react-router-dom';

/* ───────── validation ───────── */
const doorSchema = yup.object().shape({
  height     : yup.number().typeError('Height must be a number').required().positive(),
  width      : yup.number().typeError('Width must be a number').required().positive(),
  type       : yup.string().required(),
  frameColor : yup.string().required(),
  tintColor  : yup.string().required(),
  qty        : yup.number().typeError('Quantity must be a number').required().min(1),
});

const Doors = () => {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const { cartId } = useParams();
  const isEditMode = !!cartId;

  /* ───── category data from Redux (already fetched on home) ───── */
  const categories   = useSelector((s) => s.user.categories || []);
  const doorCategory = categories.find((c) => c.name?.toLowerCase() === 'doors');
  const fields       = doorCategory?.configuration?.fields || [];
  const pricing      = doorCategory?.pricing || {};

  /* ───── saved draft ───── */
  const savedDoors = useSelector((s) => s.user.doorSelection || []);

  /* ───── RTK Query mutations ───── */
  const [addToCartApi, { isLoading: saving }] = useAddToCartMutation();
  const [editCartItemApi]                     = useEditCartItemMutation();

  /* ───── helpers to render labels & options ───── */
  const label = (n) => fields.find((f) => f.name === n)?.label || n;
  const typeOptions       = fields.find((f) => f.name === 'type')?.options        || [];
  const frameColorOptions = fields.find((f) => f.name === 'frame_color')?.options || [];
  const banner            = doorCategory?.detail_photo_url ? [doorCategory.detail_photo_url] : [];

  /* ───── local state (doors array) ───── */
  const [doors, setDoors] = useState(
    savedDoors.length
      ? savedDoors.map((d) => ({ ...d, errors: {}, isOpen: true }))
      : [{
          id: Date.now(), height: '', width: '', type: '',
          frameColor: '', tintColor: '', qty: 1,
          isOpen: true, errors: {},
        }]
  );

  /* ───── price calculation ───── */
  const grandTotal = useMemo(() => {
    return doors.reduce((sum, d) => {
      const h    = parseFloat(d.height) || 0;
      const w    = parseFloat(d.width)  || 0;
      const area = (h * w) / 144;                             // sqft
      const pps  = parseFloat(pricing?.[d.type]?.price || 0); // $ / sqft
      return sum + area * pps * (d.qty || 1);
    }, 0);
  }, [doors, pricing]);

  /* ───── sync draft to Redux ───── */
  useEffect(() => {
    dispatch(setDoorSelection(doors));
  }, [doors, dispatch]);

  /* ───── door list helpers ───── */
  const addDoor = () =>
    setDoors((p) => [
      ...p,
      {
        id: Date.now(), height: '', width: '', type: '',
        frameColor: '', tintColor: '', qty: 1,
        isOpen: true, errors: {},
      },
    ]);

  const handleChange = (id, key, val) =>
    setDoors((p) =>
      p.map((d) =>
        d.id === id ? { ...d, [key]: val, errors: { ...d.errors, [key]: '' } } : d
      )
    );

  const toggleAccordion = (id) =>
    setDoors((p) => p.map((d) => (d.id === id ? { ...d, isOpen: !d.isOpen } : d)));

  const removeDoor = (id) =>
    window.confirm('Remove this door?') &&
    setDoors((p) => p.filter((d) => d.id !== id));

  /* ───── validate & submit ───── */
  const handleAddOrUpdate = async () => {
    let allValid = true;
    const validated = await Promise.all(
      doors.map(async (d) => {
        try {
          await doorSchema.validate(d, { abortEarly: false });
          return { ...d, errors: {} };
        } catch (err) {
          allValid = false;
          const errs = {};
          err.inner.forEach((e) => (errs[e.path] = e.message));
          return { ...d, errors: errs };
        }
      })
    );

    setDoors(validated);
    if (!allValid) return toast.error('Please fix the highlighted errors.');

    const configDoors = validated.map(
      ({ height, width, type, frameColor, tintColor, qty }) => ({
        height: Number(height),
        width : Number(width),
        type,
        frame_color: frameColor,
        tint_color : tintColor,
        qty: Number(qty),
      })
    );

    const payload = {
      category_id       : doorCategory.id,
      configuration     : { doors: configDoors },
      configuration_meta: { fields },
      pricing_meta      : pricing,
      adders            : [],
      price             : grandTotal,
    };

    try {
      const res = isEditMode
        ? await editCartItemApi({ cartId, updatedData: payload }).unwrap()
        : await addToCartApi(payload).unwrap();

      if (res.success) {
        dispatch(addToCart(res.data.cart));
        toast.success(isEditMode ? 'Doors updated!' : 'Doors added to cart!');
        if (isEditMode) navigate('/cart-details');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Submission failed.');
    }
  };

  if (!doorCategory)
    return <p className="text-center text-red-500 mt-10">Door category not found.</p>;

  /* ───── render ───── */
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* left banner */}
      <div className="col-span-12 md:col-span-4 hidden md:block">
        <BackBtn className="mb-3" link="/collection" />
        <CustomSlider items={banner} />
      </div>

      {/* right side */}
      <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
        <div className="flex flex-col flex-grow">
          {/* header */}
          <div className="flex justify-between items-center">
            <IconHeading
              className="lg:text-[16px] text-[12px]"
              primaryIcon={orderSpec}
              headingText="Order Specifications"
              secondaryIcon={infoCircleIcon}
            />
            <PrimaryBtn
              className="bg-transparent px-0 py-0"
              iconLeft={addmoreIcon}
              onClick={addDoor}
            >
              <span className="text-base-dark text-sm">Add Door</span>
            </PrimaryBtn>
          </div>

          {/* door list */}
          {doors.length === 0 ? (
            <p className="text-gray-500 italic mt-6">Please add a door.</p>
          ) : (
            doors.map((door, idx) => (
              <div
                key={door.id}
                className="border border-secondary rounded-large p-4 mt-6"
              >
                {/* accordion header */}
                <div className="flex justify-between items-center">
                  <IconHeading
                    primaryIcon={doorIcon}
                    headingText={`Door ${idx + 1}`}
                    secondaryIcon={infoCircleIcon}
                  />
                  <div className="flex gap-4 items-center">
                    <button onClick={() => removeDoor(door.id)}>
                      <Image img={deleteIcon} />
                    </button>
                    <VerticalSeparator className="h-10" />
                    <PrimaryBtn
                      className="bg-transparent px-2"
                      onClick={() => toggleAccordion(door.id)}
                    >
                      <Image
                        img={door.isOpen ? arrowUpIcon : arrowDownIcon}
                      />
                    </PrimaryBtn>
                  </div>
                </div>

                {/* accordion body */}
                {door.isOpen && (
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Input
                      label={label('height')}
                      unit="inch"
                      value={door.height}
                      onChange={(e) =>
                        handleChange(door.id, 'height', e.target.value)
                      }
                      error={door.errors.height}
                    />
                    <Input
                      label={label('width')}
                      unit="inch"
                      value={door.width}
                      onChange={(e) =>
                        handleChange(door.id, 'width', e.target.value)
                      }
                      error={door.errors.width}
                    />
                    <Dropdown
                      label={label('type')}
                      options={typeOptions}
                      value={door.type}
                      onChange={(val) => handleChange(door.id, 'type', val)}
                      error={door.errors.type}
                    />
                    <Dropdown
                      label={label('frame_color')}
                      options={frameColorOptions}
                      value={door.frameColor}
                      onChange={(val) =>
                        handleChange(door.id, 'frameColor', val)
                      }
                      error={door.errors.frameColor}
                    />
                    <Input
                      label={label('tint_color')}
                      value={door.tintColor}
                      onChange={(e) =>
                        handleChange(door.id, 'tintColor', e.target.value)
                      }
                      error={door.errors.tintColor}
                    />
                    <Counter
                      label={label('qty')}
                      value={door.qty}
                      onChange={(val) => handleChange(door.id, 'qty', val)}
                      min={1}
                      max={100}
                      error={door.errors.qty}
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
          className="sticky bottom-0"
          onAddToCart={handleAddOrUpdate}
          isLoading={saving}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

export default Doors;
