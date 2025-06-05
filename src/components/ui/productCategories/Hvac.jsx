import React, { useState } from 'react';
import {
    categoryIcon,
    detailBanner,
    infoCircleIcon,
    orderSpec,
} from '../../../../imagesPath';
import Image from '../../utils/Image';
import Input from '../Input';
import IconHeading from '../../utils/IconHeading';
import PrimaryBtn from '../PrimaryBtn';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';

const Hvac = () => {
    const [selectedVariant, setSelectedVariant] = useState('Shingle');
    const [selectedAdders, setSelectedAdders] = useState([]);

    const variants = ['Central', 'Mini Split'];
    const adders = ['New Slub', 'New Duct'];






    const toggleAdder = (adder) =>
        setSelectedAdders((prev) =>
            prev.includes(adder)
                ? prev.filter((a) => a !== adder)
                : [...prev, adder]
        );

    return (
        <div className="grid grid-cols-12 gap-4">

            <div className="col-span-12 md:col-span-4 hidden md:block">
                <Image className="w-[100%]" img={detailBanner} />
            </div>


            <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
                <div className='flex flex-col flex-grow'>

                    <div>
                        <IconHeading
                            primaryIcon={categoryIcon}
                            headingText="Choose Category"
                            secondaryIcon={infoCircleIcon}
                        />


                        <div className="flex gap-4 flex-wrap my-8">
                            {variants.map((variant) => (
                                <label
                                    key={variant}
                                    className={`px-5 py-2  text-nowrap text-center rounded-full font-Avenir font-medium border cursor-pointer transition
                                        ${selectedVariant === variant
                                            ? 'bg-base text-white border-base'
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
                            className='my-10'
                        />

                        <div className="grid md:grid-cols-12 gap-4 mt-6">

                            <div className="col-span-6">
                                <Input type="text" unit="TON" label="Capacity" placeholder="eg 2.5" />
                            </div>
                        </div>

                        <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
                        <AdderSelector adders={adders} selectedAdders={selectedAdders} toggleAdder={toggleAdder} />

                    </div>
                    {/* Add to cart wedget */}

                    <AddToCardWedget totalPrice="200" />





                </div>
            </div>
        </div>
    );
};

export default Hvac;
