import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  categoryIcon,
  infoCircleIcon,
  orderSpec,
} from '../../../../imagesPath';
import Input from '../Input';
import IconHeading from '../../utils/IconHeading';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useAddToCartMutation,
  useEditCartItemMutation,
} from '../../../features/api/apiSlice.js';
import { addToCart, setSolarSelection } from '../../../features/slices/userSlice.js';
import { toast } from 'react-toastify';

const Solar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartId } = useParams();
  const isEditMode = !!cartId;

  const savedSolar = useSelector((state) => state.user.solarSelection || {});
  const categories = useSelector((state) => state.user.categories || []);
  const solarData = categories.find((cat) => cat.name.toLowerCase() === 'solar');

  const [addToCartApi, { isLoading }] = useAddToCartMutation();
  const [editCartItemApi] = useEditCartItemMutation();

  const [selectedAdders, setSelectedAdders] = useState(savedSolar.adders || []);
  const [includeBattery, setIncludeBattery] = useState(savedSolar.includeBattery || false);

  if (!solarData) return <p className="text-center py-10 text-gray-500">Loading Solar Data...</p>;

  const adders = solarData.adders.map((a) => a.name);
  const fields = solarData.configuration.fields;
  const getFieldLabel = (name) => fields.find((f) => f.name === name)?.label || name;

  const schema = yup.object().shape({
    panelAmount: yup.number().typeError('Must be a number').positive().required('Required'),
    panelSize: yup.number().typeError('Must be a number').positive().required('Required'),
    totalKW: yup.number().typeError('Must be a number').positive().required('Required'),
    batteryCapacity: yup
      .number()
      .typeError('Must be a number')
      .when([], {
        is: () => includeBattery,
        then: (schema) => schema.required('Required').positive(),
        otherwise: (schema) => schema.notRequired(),
      }),
    inverterCapacity: yup
      .number()
      .typeError('Must be a number')
      .when([], {
        is: () => includeBattery,
        then: (schema) => schema.required('Required').positive(),
        otherwise: (schema) => schema.notRequired(),
      }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      panelAmount: savedSolar.panelAmount || '',
      panelSize: savedSolar.panelSize || '',
      totalKW: savedSolar.totalKW || '',
      batteryCapacity: savedSolar.batteryCapacity || '',
      inverterCapacity: savedSolar.inverterCapacity || '',
    },
  });

  const panelAmount = watch('panelAmount');
  const panelSize = watch('panelSize');
  const totalKW = watch('totalKW');
  const batteryCapacity = watch('batteryCapacity');
  const inverterCapacity = watch('inverterCapacity');

  useEffect(() => {
    dispatch(
      setSolarSelection({
        panelAmount,
        panelSize,
        totalKW,
        includeBattery,
        batteryCapacity,
        inverterCapacity,
        adders: selectedAdders,
      })
    );
  }, [
    panelAmount,
    panelSize,
    totalKW,
    includeBattery,
    batteryCapacity,
    inverterCapacity,
    selectedAdders,
    dispatch,
  ]);

  const toggleAdder = (adder) => {
    setSelectedAdders((prev) =>
      prev.includes(adder) ? prev.filter((a) => a !== adder) : [...prev, adder]
    );
  };

  const BatteryChangeHandler = () => setIncludeBattery((prev) => !prev);

  const handleAddOrUpdate = async (data) => {
    const configuration = {
      number_of_panels: data.panelAmount,
      panel_size: data.panelSize,
      total_kw: data.totalKW,
      battery_backup: includeBattery,
      battery_capacity: includeBattery ? data.batteryCapacity : undefined,
      inverter_capacity: includeBattery ? data.inverterCapacity : undefined,
    };

    const payload = {
      category_id: solarData.id,
      configuration,
      configuration_meta: {
        fields,
      },
      pricing_meta: solarData.pricing || {},
      adders: selectedAdders.map((name) => {
        const found = solarData.adders.find((a) => a.name === name);
        return {
          id: found.id,
          name: found.name,
          price: found.price.toString(),
        };
      }),
      price: 200, // temp price
    };

    try {
      const response = isEditMode
        ? await editCartItemApi({ cartId, updatedData: payload }).unwrap()
        : await addToCartApi(payload).unwrap();

      if (response.success) {
        dispatch(addToCart(response.data.cart));
        toast.success(isEditMode ? 'Cart item updated!' : 'Added to cart!');
        if (isEditMode) navigate('/cart-details');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to submit');
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4 hidden md:block">
        <BackBtn className="mb-3" link="/collection" />
        <CustomSlider items={[solarData.detail_photo_url]} />
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
        <div className="flex flex-col flex-grow">
          <IconHeading
            primaryIcon={orderSpec}
            headingText="Order Specifications"
            secondaryIcon={infoCircleIcon}
          />

          <form>
            <div className="grid md:grid-cols-12 gap-4 mt-6">
              <div className="col-span-6">
                <Controller
                  name="panelAmount"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      label={getFieldLabel('panel_amount')}
                      placeholder="0"
                      error={errors.panelAmount?.message}
                    />
                  )}
                />
              </div>
              <div className="col-span-6">
                <Controller
                  name="panelSize"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      unit="w"
                      label={getFieldLabel('panel_size')}
                      placeholder="0"
                      error={errors.panelSize?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-4 mt-3">
              <div className="col-span-12">
                <Controller
                  name="totalKW"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      unit="KW"
                      label={getFieldLabel('total_kw')}
                      placeholder="0"
                      error={errors.totalKW?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="inline-flex items-center cursor-pointer mb-3">
                <input
                  onChange={BatteryChangeHandler}
                  type="checkbox"
                  checked={includeBattery}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:bg-primary" />
                <span className="ms-3 text-sm font-medium text-gray-900">Include Battery</span>
              </label>
            </div>

            {includeBattery && (
              <div className="grid md:grid-cols-12 gap-4 mt-3">
                <div className="col-span-6">
                  <Controller
                    name="batteryCapacity"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        unit="KW"
                        label="Battery Capacity"
                        placeholder="0"
                        error={errors.batteryCapacity?.message}
                      />
                    )}
                  />
                </div>
                <div className="col-span-6">
                  <Controller
                    name="inverterCapacity"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        unit="KW"
                        label="Inverter Capacity"
                        placeholder="0"
                        error={errors.inverterCapacity?.message}
                      />
                    )}
                  />
                </div>
              </div>
            )}

            <div className="mt-5">
              <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
              <AdderSelector
                adders={adders}
                selectedAdders={selectedAdders}
                toggleAdder={toggleAdder}
              />
            </div>
          </form>
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

export default Solar;
