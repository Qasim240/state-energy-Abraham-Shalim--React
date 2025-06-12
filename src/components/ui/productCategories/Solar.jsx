import React, { useState } from 'react'
import PrimaryBtn from '../PrimaryBtn';
import { infoCircleIcon, orderSpec, solarBanner } from '../../../../imagesPath';
import Image from '../../utils/Image';
import IconHeading from '../../utils/IconHeading';
import Input from '../Input';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';
import CustomSlider from '../../utils/CustomSlider';

const Solar = () => {

    const [selectedAdders, setSelectedAdders] = useState([]);
    const [includeBattery, setIsncludeBattery] = useState(false);

    const BatteryChangeHanlder = () => {
        setIsncludeBattery((prev) => !prev)
    }

    const adders = ['MPU', 'Panel Box Relocation', 'Sub-Panel', 'Stucco Repair'];
    const sliderbanner = [solarBanner, solarBanner, solarBanner]
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
                        <IconHeading primaryIcon={orderSpec} headingText="Order Specifications" secondaryIcon={infoCircleIcon} />
                        <div className='mt-5'>
                            <form action="">
                                <div className='flex flex-col flex-grow'>
                                    <div className="grid md:grid-cols-12 gap-4 mt-6">
                                        <div className='col-span-6'><Input type="number" label="Amount of Panel" /></div>
                                        <div className='col-span-6'><Input label="Size of Panel" unit="w" /></div>
                                    </div>
                                    <div className="grid md:grid-cols-12 gap-4 mt-3">
                                        <div className='col-span-12'><Input type="number" unit="KW" label="Total System KW" /></div>
                                    </div>

                                    <div>
                                        <label className="inline-flex items-center cursor-pointer mb-3">
                                            <input onChange={BatteryChangeHanlder} type="checkbox" className="sr-only peer" />
                                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/40 dark:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:bg-primary dark:border-gray-600" />
                                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Include Battery</span>
                                        </label>
                                    </div>

                                    <div
                                        className={`transition-all duration-300 ease-in-out transform origin-top ${includeBattery
                                            ? 'scale-y-100 opacity-100 max-h-[500px]'
                                            : 'scale-y-0 opacity-0 max-h-0 overflow-hidden'
                                            }`}
                                    >
                                        <div className="grid md:grid-cols-12 gap-4 mt-3">
                                            <div className="col-span-6">
                                                <Input type="number" unit="KW" label="Kilowatt" />
                                            </div>
                                            <div className="col-span-6">
                                                <Input type="number" unit="KW" label="Kilowatt" />
                                            </div>
                                        </div>
                                    </div>


                                    <div className='mt-5'>
                                        <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
                                        <AdderSelector
                                            adders={adders}
                                            selectedAdders={selectedAdders}
                                            toggleAdder={toggleAdder}

                                        />
                                    </div>
                                </div>

                                {/* Adders */}






                            </form>
                        </div>
                    </div>
                </div>
                <AddToCardWedget totalPrice="200" />
            </div>


        </div>
    )
}

export default Solar