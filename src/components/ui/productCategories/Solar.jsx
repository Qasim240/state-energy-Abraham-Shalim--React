import React, { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { orderSpec, infoCircleIcon } from '../../../../imagesPath';
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
import Dropdown from '../Dropdown.jsx';

const Solar = () => {
  /* ───────── hooks & store ───────── */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartId } = useParams();
  const isEditMode = !!cartId;

  const savedSolar = useSelector((s) => s.user.solarSelection || {});
  const categories = useSelector((s) => s.user.categories || []);
  const solarData = categories.find((c) => c.name.toLowerCase() === 'solar');

  const [addToCartApi, { isLoading }] = useAddToCartMutation();
  const [editCartItemApi] = useEditCartItemMutation();

  const [selectedAdders, setSelectedAdders] = useState(savedSolar.adders || []);
  const [includeBattery, setIncludeBattery] = useState(savedSolar.includeBattery || false);

  if (!solarData) return <p className="text-center py-10 text-gray-500">Loading Solar Data...</p>;

  const adders = solarData.adders.map((a) => a.name);
  const fields = solarData.configuration.fields;

  const getField = (name) => fields.find((f) => f.name === name) || {};
  const getFieldLabel = (name) => getField(name).label || name;
  const getFieldUnit = (name) => getField(name).unit || undefined;

  /* ───────── form ───────── */
  const schema = yup.object().shape({
    panelAmount: yup.number().typeError('Must be a number').positive().required(),
    panelSize: yup.number().typeError('Must be a number').positive().required(),
    batteryType: yup.string().when([], {
      is: () => includeBattery,
      then: (s) => s.required('Please select a battery'),
      otherwise: (s) => s.notRequired(),
    }),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      panelAmount: savedSolar.panelAmount ?? '',
      panelSize: savedSolar.panelSize ?? '',
      totalKW: savedSolar.totalKW ?? '',
      batteryType: savedSolar.batteryType ?? '',
    },
  });

  const panelAmount = watch('panelAmount');
  const panelSize = watch('panelSize');
  const batteryType = watch('batteryType');

  /* ───────── calculations ───────── */
  const totalSystemWatts = useMemo(() => {
    const amt = +panelAmount || 0;
    const size = +panelSize || 0;
    return amt * size;
  }, [panelAmount, panelSize]);

  const totalSystemKW = useMemo(() => (totalSystemWatts / 1000).toFixed(2), [totalSystemWatts]);

  useEffect(() => {
    setValue('totalKW', totalSystemKW);
  }, [totalSystemKW, setValue]);

  /* Price per watt: always available from the first pricing entry */
  const pricePerWatt = useMemo(() => {
    if (batteryType && solarData.pricing[batteryType])
      return +solarData.pricing[batteryType].price_per_sqft;

    const firstKey = Object.keys(solarData.pricing)[0];
    return firstKey ? +solarData.pricing[firstKey].price_per_sqft : 0;
  }, [batteryType, solarData]);

  /* Battery price only if selected */
  const batteryPrice = useMemo(() => {
    if (!includeBattery || !batteryType) return 0;
    return +solarData.pricing[batteryType]?.price_per_sqft || 0;
  }, [includeBattery, batteryType, solarData]);

  /* Adders */
  const addersCost = useMemo(() => {
    return selectedAdders.reduce((sum, name) => {
      const a = solarData.adders.find((ad) => ad.name === name);
      if (!a) return sum;
      const unitPrice = +a.price;
      return sum + (a.type === 'dynamic' ? totalSystemWatts * unitPrice : unitPrice);
    }, 0);
  }, [selectedAdders, solarData, totalSystemWatts]);

  const subtotal = totalSystemWatts * pricePerWatt;
  const grandTotal = subtotal + batteryPrice + addersCost;

  /* ───────── sync with Redux ───────── */
  useEffect(() => {
    dispatch(
      setSolarSelection({
        panelAmount,
        panelSize,
        totalKW: totalSystemKW,
        includeBattery,
        batteryType,
        adders: selectedAdders,
        price: grandTotal,
      }),
    );
  }, [
    panelAmount,
    panelSize,
    totalSystemKW,
    includeBattery,
    batteryType,
    selectedAdders,
    grandTotal,
    dispatch,
  ]);

  /* ───────── handlers ───────── */
  const toggleAdder = (adder) =>
    setSelectedAdders((prev) =>
      prev.includes(adder) ? prev.filter((a) => a !== adder) : [...prev, adder],
    );

  const BatteryChangeHandler = () => setIncludeBattery((prev) => !prev);

  const handleAddOrUpdate = async (data) => {
    const configuration = {
      number_of_panels: data.panelAmount,
      panel_size: data.panelSize,
      total_kw: totalSystemKW,
      battery_backup: includeBattery,
      battery: data.batteryType,
    };

    const payload = {
      category_id: solarData.id,
      configuration,
      configuration_meta: { fields },
      pricing_meta: solarData.pricing || {},
      adders: selectedAdders.map((n) => {
        const a = solarData.adders.find((x) => x.name === n);
        return { id: a.id, name: a.name, price: a.price.toString() };
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

  /* ───────── UI ───────── */
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
            {/* Panels */}
            <div className="grid md:grid-cols-12 gap-4 mt-6">
              <div className="col-span-6">
                <Controller
                  name="panelAmount"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      label={getFieldLabel('number_of_panels')}
                      unit={getFieldUnit('number_of_panels')}
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
                      unit={getFieldUnit('panel_size')}        
                      label={getFieldLabel('panel_size')}
                      placeholder="0"
                      error={errors.panelSize?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* Computed kW */}
            <div className="grid md:grid-cols-12 gap-4 mt-3">
              <div className="col-span-12">
                <Controller
                  name="totalKW"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={totalSystemKW}
                      readOnly
                      type="number"
                      unit={getFieldUnit('total_kw') || 'W'}
                      label={getFieldLabel('Total System Size')}
                    />
                  )}
                />
              </div>
            </div>

            {/* Battery toggle + dropdown */}
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
                <div className="col-span-12">
                  <Controller
                    name="batteryType"
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        {...field}
                        label="Select Battery"

                        options={[
                          { value: '', label: '— None —' },
                          ...(getField('battery').options || []).map((o) => ({
                            value: o,
                            label: o,
                          })),
                        ]}
                        placeholder="Choose..."
                        error={errors.batteryType?.message}
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {/* Adders */}
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

        {/* Price widget */}
        <AddToCardWedget
          totalPrice={grandTotal.toLocaleString()}
          onAddToCart={handleSubmit(handleAddOrUpdate)}
          isLoading={isLoading}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

export default Solar;
