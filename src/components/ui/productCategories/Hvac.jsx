import React, { useState } from 'react';
import {
    categoryIcon,
    hvac,
    infoCircleIcon,
    orderSpec,
} from '../../../../imagesPath';
import Input from '../Input';
import IconHeading from '../../utils/IconHeading';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';
import CustomSlider from '../../utils/CustomSlider';

const Hvac = () => {
    const [selectedVariant, setSelectedVariant] = useState('Shingle');
    const [selectedAdders, setSelectedAdders] = useState([]);
    const sliderbanner = [hvac, hvac, hvac];
    const variants = ['Central', 'Mini Split'];
    const adders = ['New Slub', 'New Duct'];

    const toggleAdder = (adder) =>
        setSelectedAdders((prev) =>
            prev.includes(adder)
                ? prev.filter((a) => a !== adder)
                : [...prev, adder]
        );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4 lg:block hidden">
                <CustomSlider items={sliderbanner} />
            </div>

            {/* Form and content: full width on tablet (md), col-span-8 on lg+ */}
            <div className="col-span-12 lg:col-span-8 flex flex-col min-h-full mt-4 lg:mt-0">
                <div className="flex flex-col flex-grow">

                    <IconHeading
                        primaryIcon={categoryIcon}
                        headingText="Choose Category"
                        secondaryIcon={infoCircleIcon}
                    />

                    <div className="flex gap-4 flex-wrap my-8">
                        {variants.map((variant) => (
                            <label
                                key={variant}
                                className={`px-5 py-2 text-nowrap text-center rounded-full font-Avenir font-medium border cursor-pointer transition
                                    ${selectedVariant === variant
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

                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                        <Input type="text" unit="TON" label="Capacity" placeholder="eg 2.5" />
                    </div>

                    <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
                    <AdderSelector
                        adders={adders}
                        selectedAdders={selectedAdders}
                        toggleAdder={toggleAdder}
                    />

                    <AddToCardWedget totalPrice="200" />
                </div>
            </div>
        </div>
    );
};

export default Hvac;
