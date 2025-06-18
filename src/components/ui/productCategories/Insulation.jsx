import React, { useState, useEffect } from 'react';
import {
    categoryIcon,
    infoCircleIcon,
    orderSpec,
} from '../../../../imagesPath';

import { useSelector } from 'react-redux';
import IconHeading from '../../utils/IconHeading';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';
import Dropdown from '../Dropdown';
import Input from '../Input';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';

const Insulation = () => {
    const categories = useSelector(
        (state) =>
            state.api.queries?.['getCategories(undefined)']?.data?.categories || []
    );

    const insulationCategory = categories.find(
        (cat) => cat.name.toLowerCase() === 'insulation'
    );

    const [selectedVariant, setSelectedVariant] = useState('');
    const [selectedRValue, setSelectedRValue] = useState('');
    const [squareFootage, setSquareFootage] = useState('');
    const [includeInsulationRemoval, setInsulationRemoval] = useState(false);
    const [selectedAdders, setSelectedAdders] = useState([]);

    const sliderBanner = insulationCategory?.detail_photo_url
        ? [insulationCategory.detail_photo_url]
        : [];

    const fields = insulationCategory?.configuration?.fields || [];
    const pricing = insulationCategory?.pricing || {};
    const adders = insulationCategory?.adders?.map((a) => a.name) || [];

    // Get category options
    const categoryOptions =
        fields.find((f) => f.name === 'sub_category')?.options || [];

    // Get R-Value options dynamically from configuration
    const rValueDynamicOptions =
        fields.find((f) => f.name === 'r_value')?.options || {};

    const rValueOptions = selectedVariant ? rValueDynamicOptions[selectedVariant] || [] : [];

    const toggleAdder = (adder) => {
        setSelectedAdders((prev) =>
            prev.includes(adder) ? prev.filter((a) => a !== adder) : [...prev, adder]
        );
    };

    useEffect(() => {
        if (categoryOptions.length > 0) {
            setSelectedVariant(categoryOptions[0]);
        }
    }, [categoryOptions]);

    useEffect(() => {
        if (rValueOptions.length > 0) {
            setSelectedRValue(rValueOptions[0]);
        }
    }, [rValueOptions]);

    // Calculate price dynamically
    const totalPrice = pricing?.[selectedVariant]?.[selectedRValue] || '0';

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 hidden md:block">
                <BackBtn className="mb-3" link="/collection" />
                <CustomSlider items={sliderBanner} />
            </div>

            <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
                <div className="flex flex-col flex-grow">
                    <IconHeading
                        primaryIcon={categoryIcon}
                        headingText="Choose Insulation Type"
                        secondaryIcon={infoCircleIcon}
                    />

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
                            />
                        </div>
                        <div className="col-span-6">
                            <Input
                                type="text"
                                unit="sqf"
                                label="Square Footage"
                                placeholder="eg 2.5"
                                value={squareFootage}
                                onChange={(e) => setSquareFootage(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="inline-flex items-center cursor-pointer mb-3 mt-6">
                            <input
                                onChange={() => setInsulationRemoval((prev) => !prev)}
                                type="checkbox"
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:bg-primary" />
                            <span className="ms-3 text-sm font-medium text-gray-900">
                                Include Insulation Removal
                            </span>
                        </label>
                    </div>

                    {adders.length > 0 && (
                        <>
                            <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
                            <AdderSelector
                                adders={adders}
                                selectedAdders={selectedAdders}
                                toggleAdder={toggleAdder}
                            />
                        </>
                    )}

                    <AddToCardWedget totalPrice={totalPrice} />
                </div>
            </div>
        </div>
    );
};

export default Insulation;
