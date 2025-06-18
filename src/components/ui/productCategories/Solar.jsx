import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryBtn from '../PrimaryBtn';
import {
    infoCircleIcon,
    orderSpec
} from '../../../../imagesPath';
import IconHeading from '../../utils/IconHeading';
import Input from '../Input';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';
import { addToCart } from '../../../features/slices/userSlice.js';
import { setSolarSelection } from '../../../features/slices/userSlice.js';
const Solar = () => {
    const savedSolar = useSelector((state) => state.user.solarSelection) || {};

    const dispatch = useDispatch();

    const categories = useSelector(
        (state) => state.user.categories || []
    );

    const solarData = categories.find((cat) => cat.name.toLowerCase() === 'solar');



    const [panelAmount, setPanelAmount] = useState(savedSolar.panelAmount || '');
    const [panelSize, setPanelSize] = useState(savedSolar.panelSize || '');
    const [totalKW, setTotalKW] = useState(savedSolar.totalKW || '');
    const [includeBattery, setIncludeBattery] = useState(savedSolar.includeBattery || false);
    const [batteryCapacity, setBatteryCapacity] = useState(savedSolar.batteryCapacity || '');
    const [inverterCapacity, setInverterCapacity] = useState(savedSolar.inverterCapacity || '');
    const [selectedAdders, setSelectedAdders] = useState(savedSolar.adders || []);

    useEffect(() => {
        dispatch(setSolarSelection({
            panelAmount,
            panelSize,
            totalKW,
            includeBattery,
            batteryCapacity,
            inverterCapacity,
            adders: selectedAdders,
        }));
    }, [
        panelAmount,
        panelSize,
        totalKW,
        includeBattery,
        batteryCapacity,
        inverterCapacity,
        selectedAdders,
        dispatch
    ]);

    const toggleAdder = (adder) => {
        setSelectedAdders((prev) =>
            prev.includes(adder) ? prev.filter((a) => a !== adder) : [...prev, adder]
        );
    };

    const BatteryChangeHandler = () => setIncludeBattery((prev) => !prev);

    if (!solarData) return <p className="text-center py-10 text-gray-500">Loading Solar Data...</p>;

    const sliderBanner = [solarData.detail_photo_url];
    const adders = solarData.adders.map((a) => a.name);
    const fields = solarData.configuration.fields;

    const getFieldLabel = (name) =>
        fields.find((f) => f.name === name)?.label || name;



    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 hidden md:block">
                <BackBtn className="mb-3" link="/collection" />
                <CustomSlider items={sliderBanner} />
            </div>

            <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
                <div className="flex flex-col flex-grow">
                    <div>
                        <IconHeading
                            primaryIcon={orderSpec}
                            headingText="Order Specifications"
                            secondaryIcon={infoCircleIcon}
                        />
                        <div className="mt-5">
                            <form>
                                <div className="grid md:grid-cols-12 gap-4 mt-6">
                                    <div className="col-span-6">
                                        <Input
                                            type="number"
                                            label={getFieldLabel('panel_amount')}
                                            placeholder="0"
                                            value={panelAmount}
                                            onChange={(e) => setPanelAmount(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-6">
                                        <Input
                                            label={getFieldLabel('panel_size')}
                                            unit="w"
                                            placeholder="0"
                                            value={panelSize}
                                            onChange={(e) => setPanelSize(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-12 gap-4 mt-3">
                                    <div className="col-span-12">
                                        <Input
                                            type="number"
                                            unit="KW"
                                            label={getFieldLabel('total_kw')}
                                            placeholder="0"
                                            value={totalKW}
                                            onChange={(e) => setTotalKW(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Battery Toggle */}
                                <div className="mt-3">
                                    <label className="inline-flex items-center cursor-pointer mb-3">
                                        <input
                                            onChange={BatteryChangeHandler}
                                            type="checkbox"
                                            className="sr-only peer"
                                        />
                                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:bg-primary" />
                                        <span className="ms-3 text-sm font-medium text-gray-900">Include Battery</span>
                                    </label>
                                </div>

                                {/* Battery Fields */}
                                <div
                                    className={`transition-all duration-300 ease-in-out transform origin-top ${includeBattery
                                        ? 'scale-y-100 opacity-100 max-h-[500px]'
                                        : 'scale-y-0 opacity-0 max-h-0 overflow-hidden'
                                        }`}
                                >
                                    <div className="grid md:grid-cols-12 gap-4 mt-3">
                                        <div className="col-span-6">
                                            <Input
                                                type="number"
                                                unit="KW"
                                                label="Battery Capacity"
                                                placeholder="0"
                                                value={batteryCapacity}
                                                onChange={(e) => setBatteryCapacity(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-6">
                                            <Input
                                                type="number"
                                                unit="KW"
                                                label="Inverter Capacity"
                                                placeholder="0"
                                                value={inverterCapacity}
                                                onChange={(e) => setInverterCapacity(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

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
                    </div>
                </div>

                {/* Add to Cart */}
                <AddToCardWedget
                    totalPrice="200"
                    onAddToCart={() => {
                        dispatch(addToCart({
                            id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                            category: 'Solar',
                            panelAmount,
                            panelSize,
                            totalKW,
                            includeBattery,
                            batteryCapacity: includeBattery ? batteryCapacity : null,
                            inverterCapacity: includeBattery ? inverterCapacity : null,
                            adders: selectedAdders,
                        }));
                    }}
                />
            </div>
        </div>
    );
};

export default Solar;
