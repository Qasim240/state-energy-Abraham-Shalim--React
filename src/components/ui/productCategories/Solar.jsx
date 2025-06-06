import React, { useState } from 'react'
import PrimaryBtn from '../PrimaryBtn';
import { infoCircleIcon, orderSpec, solarBanner } from '../../../../imagesPath';
import Image from '../../utils/Image';
import IconHeading from '../../utils/IconHeading';
import Input from '../Input';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';
const Solar = () => {


    const [selectedAdders, setSelectedAdders] = useState([]);

    const adders = ['MPU', 'Panel Box Relocation', 'Sub-Panel', 'Stucco Repair'];

    const toggleAdder = (adder) =>

        setSelectedAdders((prev) =>
            prev.includes(adder)
                ? prev.filter((a) => a !== adder)
                : [...prev, adder]
        );


    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 hidden md:block">
                <Image className="w-[100%]" img={solarBanner} />
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
                                        <div className='col-span-12'><Input type="number" unit="KW" label="Amount of Panel" /></div>
                                    </div>



                                    <div>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/40 dark:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:bg-primary dark:border-gray-600" />
                                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Include Battery</span>
                                        </label>
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