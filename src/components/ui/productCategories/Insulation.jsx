import React, { useState, useEffect } from 'react';
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
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';

import {
  useAddToCartMutation,
  useEditCartItemMutation,
} from '../../../features/api/apiSlice';

import { setInsulationSelection, addToCart } from '../../../features/slices/userSlice.js';

import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const Insulation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartId } = useParams();
  const isEditMode = !!cartId;

  const [addToCartApi, { isLoading }] = useAddToCartMutation();
  const [editCartItemApi] = useEditCartItemMutation();

  const saved = useSelector(state => state.user.insulationSelection || {});
  const categories = useSelector(
    (state) =>
      state.api.queries?.['getCategories(undefined)']?.data?.data?.categories || []
  );

  const insulationCategory = categories.find(cat => cat.name.toLowerCase() === 'insulation');
  if (!insulationCategory) return <p className="text-center text-gray-500 mt-10">Loading insulation data...</p>;

  const sliderBanner = [insulationCategory.detail_photo_url];
  const fields = insulationCategory.configuration?.fields || [];
  const pricing = insulationCategory.pricing || {};
  const addersData = insulationCategory.adders || [];

  const categoryOptions = fields.find(f => f.name === 'sub_category')?.options || [];
  const rValueDynamicOptions = fields.find(f => f.name === 'r_value')?.options || {};

  const [selectedVariant, setSelectedVariant] = useState(saved.subCategory || categoryOptions[0] || '');
  const [selectedRValue, setSelectedRValue] = useState(saved.rValue || '');
  const [squareFootage, setSquareFootage] = useState(saved.squareFootage || '');
  const [includeInsulationRemoval, setInsulationRemoval] = useState(saved.insulationRemoval || false);
  const [selectedAdders, setSelectedAdders] = useState(saved.adders || []);
  const [errors, setErrors] = useState({});

  const rValueOptions = selectedVariant ? rValueDynamicOptions[selectedVariant] || [] : [];

  const toggleAdder = (adder) => {
    setSelectedAdders(prev =>
      prev.includes(adder) ? prev.filter(a => a !== adder) : [...prev, adder]
    );
  };

  useEffect(() => {
    if (!selectedRValue && rValueOptions.length > 0) {
      setSelectedRValue(rValueOptions[0]);
    }
  }, [rValueOptions]);

  useEffect(() => {
    dispatch(setInsulationSelection({
      subCategory: selectedVariant,
      rValue: selectedRValue,
      squareFootage,
      insulationRemoval: includeInsulationRemoval,
      adders: selectedAdders
    }));
  }, [selectedVariant, selectedRValue, squareFootage, includeInsulationRemoval, selectedAdders, dispatch]);

  const validate = async () => {
    const schema = yup.object().shape({
      subCategory: yup.string().required('Please select insulation type'),
      rValue: yup.string().required('Please select R-value'),
      squareFootage: yup
        .number()
        .typeError('Square Footage must be a number')
        .required('Square Footage is required')
        .positive('Must be a positive number'),
    });

    try {
      await schema.validate({
        subCategory: selectedVariant,
        rValue: selectedRValue,
        squareFootage
      }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const errorObj = {};
      err.inner.forEach(e => {
        errorObj[e.path] = e.message;
      });
      setErrors(errorObj);
      return false;
    }
  };

  const handleSubmit = async () => {
    const isValid = await validate();
    if (!isValid) return toast.error('Please fix errors before submitting');

    const payload = {
      category_id: insulationCategory.id,
      configuration: {
        sub_category: selectedVariant,
        r_value: selectedRValue,
        square_footage: squareFootage,
        insulation_removal: includeInsulationRemoval,
      },
      configuration_meta: {
        fields
      },
      pricing_meta: pricing,
      adders: selectedAdders.map(name => {
        const found = addersData.find(a => a.name === name);
        return {
          id: found.id,
          name: found.name,
          price: found.price.toString(),
        };
      }),
      price: pricing?.[selectedVariant]?.[selectedRValue] || '0'
    };

    try {
      const response = isEditMode
        ? await editCartItemApi({ cartId, updatedData: payload }).unwrap()
        : await addToCartApi(payload).unwrap();

      if (response.success) {
        dispatch(addToCart(response.data.cart));
        toast.success(isEditMode ? 'Insulation updated!' : 'Insulation added to cart!');
        if (isEditMode) navigate('/cart-details');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to submit');
    }
  };

  const totalPrice = pricing?.[selectedVariant]?.[selectedRValue] || '0';

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4 hidden md:block">
        <BackBtn className="mb-3" link="/collection" />
        <CustomSlider items={sliderBanner} />
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
        <div className="flex flex-col flex-grow">
          <IconHeading primaryIcon={categoryIcon} headingText="Choose Insulation Type" secondaryIcon={infoCircleIcon} />

          <div className="flex gap-4 flex-wrap my-8">
            {categoryOptions.map((variant) => (
              <label
                key={variant}
                className={`px-5 py-2 text-nowrap text-center rounded-full font-Avenir font-medium border cursor-pointer transition ${selectedVariant === variant
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
          {errors.subCategory && <p className="text-red-500 text-sm">{errors.subCategory}</p>}

          <IconHeading
            primaryIcon={orderSpec}
            headingText="Order Specifications"
            secondaryIcon={infoCircleIcon}
            className="my-10"
          />

          <div className="grid md:grid-cols-12 gap-4 mt-6">
            <div className="col-span-6">
              <Dropdown
                options={rValueOptions}
                label="R-Value"
                value={selectedRValue}
                onChange={(val) => setSelectedRValue(val)}
                error={errors.rValue}
              />
            </div>
            <div className="col-span-6">
              <Input
                type="text"
                unit="sqf"
                label="Square Footage"
                placeholder="e.g. 1500"
                value={squareFootage}
                onChange={(e) => setSquareFootage(e.target.value)}
                error={errors.squareFootage}
              />
            </div>
          </div>

          <div>
            <label className="inline-flex items-center cursor-pointer mb-3 mt-6">
              <input
                onChange={() => setInsulationRemoval((prev) => !prev)}
                type="checkbox"
                checked={includeInsulationRemoval}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:bg-primary" />
              <span className="ms-3 text-sm font-medium text-gray-900">
                Include Insulation Removal
              </span>
            </label>
          </div>

          {addersData.length > 0 && (
            <>
              <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
              <AdderSelector
                adders={adders}
                selectedAdders={selectedAdders}
                toggleAdder={toggleAdder}
              />
            </>
          )}

          <AddToCardWedget
            totalPrice={totalPrice}
            onAddToCart={handleSubmit}
            isLoading={isLoading}
            isEditMode={isEditMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Insulation;
