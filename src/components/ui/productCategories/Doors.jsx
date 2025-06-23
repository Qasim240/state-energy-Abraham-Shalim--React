import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import {
  arrowUpIcon, arrowDownIcon, deleteIcon, doorIcon,
  infoCircleIcon, orderSpec, addmoreIcon,
} from '../../../../imagesPath';

import {
  useAddToCartMutation,
  useEditCartItemMutation,
} from '../../../features/api/apiSlice';

import { setDoorSelection, addToCart } from '../../../features/slices/userSlice.js';

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

const Doors = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartId } = useParams();
  const isEditMode = !!cartId;

  const categories = useSelector(state => state.user.categories || []);



  const doorCategory = categories.find(cat => cat.name?.toLowerCase() === 'doors');
  const fields = doorCategory?.configuration?.fields || [];
  const pricing = doorCategory?.pricing || {};

  const savedDoors = useSelector(state => state.user.doorSelection || []);
  const [addToCartApi, { isLoading }] = useAddToCartMutation();
  const [editCartItemApi] = useEditCartItemMutation();

  const getFieldLabel = name => fields.find(f => f.name === name)?.label || name;
  const typeOptions = fields.find(f => f.name === 'type')?.options || [];
  const frameColorOptions = fields.find(f => f.name === 'frame_color')?.options || [];
  const sliderBanner = doorCategory?.detail_photo_url ? [doorCategory.detail_photo_url] : [];

  const [doors, setDoors] = useState(
    savedDoors.length
      ? savedDoors.map(d => ({ ...d, errors: {}, isOpen: true }))
      : [{
        id: Date.now(), height: '', width: '', type: '', frameColor: '',
        tintColor: '', qty: 1, isOpen: true, errors: {}
      }]
  );

  useEffect(() => {
    dispatch(setDoorSelection(doors));
  }, [doors, dispatch]);

  const handleAddDoor = () => {
    setDoors(prev => [
      ...prev,
      {
        id: Date.now(),
        height: '', width: '', type: '', frameColor: '',
        tintColor: '', qty: 1, isOpen: true, errors: {}
      }
    ]);
  };

  const handleChange = (id, key, value) => {
    setDoors(prev =>
      prev.map(d =>
        d.id === id ? { ...d, [key]: value, errors: { ...d.errors, [key]: '' } } : d
      )
    );
  };

  const handleRemoveDoor = id => {
    if (window.confirm('Are you sure you want to remove this door?')) {
      setDoors(prev => prev.filter(d => d.id !== id));
    }
  };

  const toggleAccordion = id => {
    setDoors(prev =>
      prev.map(d => d.id === id ? { ...d, isOpen: !d.isOpen } : d)
    );
  };

  const handleAddToCart = async () => {
    const schema = yup.object().shape({
      height: yup.number().typeError('Height must be a number').required('Height is required').positive(),
      width: yup.number().typeError('Width must be a number').required('Width is required').positive(),
      type: yup.string().required('Type is required'),
      frameColor: yup.string().required('Frame Color is required'),
      tintColor: yup.string().required('Tint Color is required'),
      qty: yup.number().typeError('Quantity must be a number').required('Quantity is required').min(1),
    });

    let allValid = true;
    const validated = await Promise.all(
      doors.map(async (d) => {
        try {
          await schema.validate(d, { abortEarly: false });
          return { ...d, errors: {} };
        } catch (err) {
          allValid = false;
          const errObj = {};
          err.inner.forEach(e => {
            errObj[e.path] = e.message;
          });
          return { ...d, errors: errObj };
        }
      })
    );

    setDoors(validated);
    if (!allValid) {
      toast.error('Please fix the highlighted errors.');
      return;
    }

    const payload = {
      category_id: doorCategory.id,
      configuration: {
        doors: validated.map(d => ({
          height: Number(d.height),
          width: Number(d.width),
          type: d.type,
          frame_color: d.frameColor,
          tint_color: d.tintColor,
          qty: Number(d.qty),
        }))
      },
      configuration_meta: { fields },
      pricing_meta: pricing,
      adders: [],
      price: 5000
    };

    try {
      const response = isEditMode
        ? await editCartItemApi({ cartId, updatedData: payload }).unwrap()
        : await addToCartApi(payload).unwrap();

      if (response.success) {
        dispatch(addToCart(response.data.cart));
        toast.success(isEditMode ? 'Door updated in cart!' : 'Door(s) added to cart!');
        if (isEditMode) navigate('/cart-details');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong.');
    }
  };

  if (!doorCategory) {
    return <p className="text-center text-red-500 mt-10">Door category not found.</p>;
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4 hidden md:block">
        <BackBtn className="mb-3" link="/collection" />
        <CustomSlider items={sliderBanner} />
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center">
            <IconHeading
              className="lg:text-[16px] text-[12px]"
              primaryIcon={orderSpec}
              headingText="Order Specifications"
              secondaryIcon={infoCircleIcon}
            />
            <PrimaryBtn className="bg-transparent px-[0px] py-[0px]" iconLeft={addmoreIcon} onClick={handleAddDoor}>
              <span className="text-base-dark lg:text-[16px] text-[12px]">Add Door</span>
            </PrimaryBtn>
          </div>

          {doors.length === 0 ? (
            <p className="text-gray-500 italic mt-6">Please add a door to continue.</p>
          ) : (
            doors.map((door, index) => (
              <div key={door.id} className="border border-secondary rounded-large p-[15px] large mt-6">
                <div className="flex justify-between items-center">
                  <IconHeading primaryIcon={doorIcon} headingText={`Door ${index + 1}`} secondaryIcon={infoCircleIcon} />
                  <div className="flex gap-4 items-center">
                    <button onClick={() => handleRemoveDoor(door.id)}>
                      <Image img={deleteIcon} />
                    </button>
                    <VerticalSeparator className="h-10" />
                    <PrimaryBtn className="bg-transparent px-2" onClick={() => toggleAccordion(door.id)}>
                      <Image img={door.isOpen ? arrowUpIcon : arrowDownIcon} />
                    </PrimaryBtn>
                  </div>
                </div>

                {door.isOpen && (
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Input
                      label={getFieldLabel('height')}
                      unit="sqf"
                      value={door.height}
                      onChange={(e) => handleChange(door.id, 'height', e.target.value)}
                      error={door.errors.height}
                    />
                    <Input
                      label={getFieldLabel('width')}
                      unit="sqf"
                      value={door.width}
                      onChange={(e) => handleChange(door.id, 'width', e.target.value)}
                      error={door.errors.width}
                    />
                    <Dropdown
                      label={getFieldLabel('type')}
                      options={typeOptions}
                      value={door.type}
                      onChange={(val) => handleChange(door.id, 'type', val)}
                      error={door.errors.type}
                    />
                    <Dropdown
                      label={getFieldLabel('frame_color')}
                      options={frameColorOptions}
                      value={door.frameColor}
                      onChange={(val) => handleChange(door.id, 'frameColor', val)}
                      error={door.errors.frameColor}
                    />
                    <Input
                      label={getFieldLabel('tint_color')}
                      value={door.tintColor}
                      onChange={(e) => handleChange(door.id, 'tintColor', e.target.value)}
                      error={door.errors.tintColor}
                    />
                    <Counter
                      label={getFieldLabel('qty')}
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

          <AddToCardWedget
            totalPrice="5000"
            className="sticky bottom-0"
            onAddToCart={handleAddToCart}
            isLoading={isLoading}
            isEditMode={isEditMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Doors;
