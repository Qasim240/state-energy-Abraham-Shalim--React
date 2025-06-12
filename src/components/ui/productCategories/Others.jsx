import React from 'react'
import Image from '../../utils/Image'
import IconHeading from '../../utils/IconHeading'
import Input from '../Input'
import AdderSelector from '../../utils/AdderSelector'
import AddToCardWedget from '../../utils/AddToCardWedget'
import { infoCircleIcon, orderSpec, otherBanner } from '../../../../imagesPath'
import CustomSlider from '../../utils/CustomSlider'

const Others = () => {

    const sliderBanners = [otherBanner, otherBanner, otherBanner]

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 hidden md:block">
                <CustomSlider items={sliderBanners} />
            </div>


            <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">

                <div className='flex flex-col flex-grow'>
                    <IconHeading className='lg:text-[16px] text-[12px]' primaryIcon={orderSpec} headingText="Order Specifications" secondaryIcon={infoCircleIcon} />
                    <form action="">
                        <div className="grid grid-cols-1 gap-4 mt-10">
                            <div>
                                <Input
                                    label="Feedback"
                                    type="textarea"
                                    rows={6}
                                    maxLength={300}
                                    className="h-40 w-full p-4"
                                />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-4 mt-10">
                            <div>
                                <Input
                                    label="Total Price"
                                    type="number"
                                    placeholder="eg 200.00"
                                    unit="$"
                                />
                            </div>
                        </div>



                    </form>

                </div>
                 <AddToCardWedget totalPrice="200" />
            </div>
           
        </div>
    )
}

export default Others