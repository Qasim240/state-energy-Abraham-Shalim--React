/* eslint-disable react/prop-types */
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

/* ────────────────────────────────────────────────────────── */

const Solar = () => {
  /* ───── hooks / store ───── */
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const { cartId } = useParams();
  const isEditMode = Boolean(cartId);

  const savedSolar = useSelector((s) => s.user.solarSelection || {});
  const categories = useSelector((s) => s.user.categories || []);
  const solarData  = categories.find((c) => c.name?.toLowerCase() === 'solar');

  const [addToCartApi, { isLoading }] = useAddToCartMutation();
  const [editCartItemApi]             = useEditCartItemMutation();

  /* ───────── adders state (qty aware) ───────── */
  const initialAdders = () => {
    if (Array.isArray(savedSolar.adders) && savedSolar.adders.length) {
      const first = savedSolar.adders[0];
      if (typeof first === 'object' && 'quantity' in first) return savedSolar.adders;
      return savedSolar.adders.map((name) => {
        const def = solarData.adders.find((a) => a.name === name) || {};
        return { ...def, quantity: def.min_qty ?? 1 };
      });
    }
    return [];
  };

  const [selectedAdders, setSelectedAdders] = useState(initialAdders);
  const [includeBattery, setIncludeBattery] = useState(savedSolar.includeBattery || false);

  if (!solarData)
    return <p className="text-center py-10 text-gray-500">Loading Solar Data…</p>;

  const addersList = solarData.adders.map((a) => a.name);
  const fields     = solarData.configuration.fields;

  const getField       = (n) => fields.find((f) => f.name === n) || {};
  const getFieldLabel  = (n) => getField(n).label || n;
  const getFieldUnit   = (n) => getField(n).unit  || undefined;

  /* ───── validation schema ───── */
  const schema = yup.object().shape({
    panelAmount: yup.number().typeError('Must be a number').positive().required(),
    panelSize  : yup.number().typeError('Must be a number').positive().required(),
    batteryType: yup.string().when([], {
      is : () => includeBattery,
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
      panelSize  : savedSolar.panelSize   ?? '',
      totalSize  : savedSolar.totalSize   ?? '',
      batteryType: savedSolar.batteryType ?? '',
    },
  });

  const panelAmount = watch('panelAmount');
  const panelSize   = watch('panelSize');
  const batteryType = watch('batteryType');

  /* ───────────────── calculations ───────────────── */

  /* 1) Total system size (W) */
  const totalSystemWatts = useMemo(() => {
    const amt  = Number(panelAmount) || 0;
    const size = Number(panelSize)   || 0;
    return amt * size;
  }, [panelAmount, panelSize]);

  /* keep read-only totalSize field synced */
  useEffect(() => setValue('totalSize', totalSystemWatts), [totalSystemWatts, setValue]);

  /* 2) Price per watt from pricing object */
  const pricePerWatt = useMemo(() => {
    const p = solarData.pricing?.price_per_watt;
    return p ? parseFloat(p) : 0;
  }, [solarData]);

  /* 3) Battery flat cost (optional) */
  const batteryCost = useMemo(() => {
    if (!includeBattery || !batteryType) return 0;
    return parseFloat(solarData.pricing?.battery?.[batteryType] || 0);
  }, [includeBattery, batteryType, solarData]);

  /* 4) Adders cost (new rules) */
  const addersCost = useMemo(() => {
    return selectedAdders.reduce((sum, adder) => {
      const unitPrice = parseFloat(adder.price) || 0;
      const qty       = adder.quantity ?? 1;
      const line      =
        adder.type === 'dynamic'
          ? pricePerWatt * unitPrice * qty          // dynamic = pricePerWatt × adder unit price × qty
          : unitPrice * qty;                        // linear  = fixed price × qty
      return sum + line;
    }, 0);
  }, [selectedAdders, pricePerWatt]);

  /* 5) Sub- & Grand-totals */
  const subtotal   = totalSystemWatts * pricePerWatt; // systemSize × pricePerWatt
  const grandTotal = subtotal + batteryCost + addersCost;

  /* ───── Redux sync (keeps draft in store) ───── */
  useEffect(() => {
    dispatch(
      setSolarSelection({
        panelAmount,
        panelSize,
        totalSize      : totalSystemWatts,
        includeBattery,
        batteryType,
        adders         : selectedAdders,
        price          : grandTotal,
      }),
    );
  }, [
    panelAmount,
    panelSize,
    totalSystemWatts,
    includeBattery,
    batteryType,
    selectedAdders,
    grandTotal,
    dispatch,
  ]);

  /* ───────── adder helpers ───────── */
  const toggleAdder = (name) => {
    setSelectedAdders((prev) => {
      const ix = prev.findIndex((a) => a.name === name);
      if (ix > -1) return prev.filter((a) => a.name !== name); // remove
      const def = solarData.adders.find((a) => a.name === name);
      return [...prev, { ...def, quantity: def.min_qty ?? 1 }]; // add w/ default qty
    });
  };

  const updateAdderQty = (name, val) => {
    const qty = Number(val) || 0;
    setSelectedAdders((prev) =>
      prev.map((a) => (a.name === name ? { ...a, quantity: qty } : a)),
    );
  };

  /* ───────── submit handler ───────── */
  const onSubmit = async (form) => {
    const configuration = {
      number_of_panels : form.panelAmount,
      panel_size       : form.panelSize,
      total_size_watts : totalSystemWatts,
      battery_backup   : includeBattery,
      battery          : form.batteryType,
    };

    const payload = {
      category_id       : solarData.id,
      configuration,
      configuration_meta: { fields },
      pricing_meta      : solarData.pricing || {},
      adders            : selectedAdders.map((a) => ({
        id      : a.id,
        name    : a.name,
        price   : a.price.toString(),
        type    : a.type,
        quantity: a.quantity,
      })),
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

  /* ───────────────────────── UI ───────────────────────── */
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* left image */}
      <div className="col-span-12 md:col-span-4 hidden md:block">
        <BackBtn className="mb-3" link="/collection" />
        <CustomSlider items={[solarData.detail_photo_url]} />
      </div>

      {/* right form */}
      <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
        <div className="flex flex-col flex-grow">
          <IconHeading
            primaryIcon={orderSpec}
            headingText="Order Specifications"
            secondaryIcon={infoCircleIcon}
          />

          <form>
            {/* panel amount & size */}
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

            {/* total system size */}
            <div className="grid md:grid-cols-12 gap-4 mt-3">
              <div className="col-span-12">
                <Controller
                  name="totalSize"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} readOnly type="number" unit="W" label={getFieldLabel('Total System Size')} />
                  )}
                />
              </div>
            </div>

            {/* battery toggle / select */}
            <div className="mt-3">
              <label className="inline-flex items-center cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={includeBattery}
                  onChange={() => setIncludeBattery((p) => !p)}
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
                        placeholder="Choose…"
                        options={[
                          { value: '', label: '— None —' },
                          ...(getField('battery').options || []).map((o) => ({ value: o, label: o })),
                        ]}
                        error={errors.batteryType?.message}
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {/* adders section */}
            <div className="mt-5">
              <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
              <AdderSelector
                adders={addersList}
                selectedAdders={selectedAdders.map((a) => a.name)}
                toggleAdder={toggleAdder}
              />

              {/* qty + line cost display */}
              {selectedAdders.length > 0 && (
                <div className="mt-4 space-y-3">
                  {selectedAdders.map((a) => {
                    const unitPrice = parseFloat(a.price) || 0;
                    const line =
                      a.type === 'dynamic'
                        ? pricePerWatt * unitPrice * a.quantity
                        : unitPrice * a.quantity;

                    return (
                      <div key={a.name} className="flex items-center gap-4">
                        <span className="flex-1">
                          {a.name} ({a.type})
                        </span>
                        <input
                          type="number"
                          min={a.min_qty}
                          max={a.max_qty}
                          value={a.quantity}
                          onChange={(e) => updateAdderQty(a.name, e.target.value)}
                          className="w-24 border rounded px-2 py-1 text-center"
                        />
                        <span className="w-24 text-right">
                          {line.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* price widget */}
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

export default Solar;
