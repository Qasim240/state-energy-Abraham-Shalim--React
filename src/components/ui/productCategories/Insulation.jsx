import React, { useState } from 'react';
import {
    categoryIcon,
    detailBanner,
    infoCircleIcon,
    insulation,
    orderSpec,
} from '../../../../imagesPath';
import Image from '../../utils/Image';
import Input from '../Input';
import IconHeading from '../../utils/IconHeading';
import PrimaryBtn from '../PrimaryBtn';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';
import Dropdown from '../Dropdown'
import CustomSlider from '../../utils/CustomSlider';
const Insulation = () => {
    const [selectedVariant, setSelectedVariant] = useState('Shingle');
    const [selectedAdders, setSelectedAdders] = useState([]);
    const [includeInsulationRemoval, setInsulationRemoval] = useState(false);
    const sliderbanner = [insulation, insulation, insulation]


    const BatteryChangeHanlder = () => {
        setInsulationRemoval((prev) => !prev)
        console.log(includeInsulationRemoval)
    }
    const variants = ['Blown-in Insulation', 'Batt Insulation'];
    const adders = [];
    const options = ['Blown-in Insulation'];


    const toggleAdder = (adder) =>
        setSelectedAdders((prev) =>
            prev.includes(adder)
                ? prev.filter((a) => a !== adder)
                : [...prev, adder]
        );

    return (
        <div className="grid grid-cols-12 gap-4">

            <div className="col-span-12 md:col-span-4 hidden md:block">
                <CustomSlider items={sliderbanner} />

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
                                <Dropdown
                                    options={options}
                                    label="R-Value"
                                />

                            </div>
                            <div className="col-span-6">
                                <Input type="text" unit="sqf " label="Square Footage" placeholder="eg 2.5" />
                            </div>
                        </div>

                        <div>
                            <label className="inline-flex items-center cursor-pointer mb-3">
                                <input onChange={BatteryChangeHanlder} type="checkbox" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/40 dark:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:bg-primary dark:border-gray-600" />
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Include Insulation Removal</span>
                            </label>
                        </div>




                        {adders.length === 0 ? undefined : <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />}

                        <AdderSelector adders={adders} selectedAdders={selectedAdders} toggleAdder={toggleAdder} />

                    </div>
                    {/* Add to cart wedget */}

                    <AddToCardWedget totalPrice="200" />





                </div>
            </div>
        </div>
    );
};

export default Insulation;
