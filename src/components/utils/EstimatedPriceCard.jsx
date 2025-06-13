import React from 'react'
import Image from './Image'
import { calcicon, downloadIcon, editicon } from '../../../imagesPath'
import { fontMedium } from './fontMedium'
import VerticalSeparator from './VerticalSeparator'
import PrimaryBtn from '../ui/PrimaryBtn'
import { Link } from 'react-router-dom'
import DividerCard from './DividerCard'

const EstimatedPriceCard = () => {
    return (
        <>

            <div className='border border-secondary p-[24px] rounded-[16px] bg-gray-flat'>
                <div className='flex justify-between items-center'>
                    <p className={`${fontMedium} text-[18px]`}>Your Estimated Consumption</p>
                    <PrimaryBtn className='px-[0] py-[0] bg-transparent' iconLeft={editicon}></PrimaryBtn>
                </div>
                <div className='py-4'>
                    <hr />
                </div>

                <DividerCard firstHeading="Monthly Utility Bill" firstInfo="123.45" secondheading="Monthly Insurance Bill" seondinfo="123.45" />

            </div>



            <div className='border border-primary p-[24px] rounded-[16px] mt-5 bg-[#F1F6FF]'>
                <div className='flex items-center gap-4'>
                    <Image img={calcicon} />
                    <div>
                        <p className='text-primary font-Avenir font-extrabold'>Total Estimated Price</p>
                        <span className='text-base-50'>The prices may vary.</span>
                    </div>
                </div>

                <div className='flex justify-between items-center my-[20px]'>
                    <span className={`${fontMedium} text-base text-[14px]`}>Cart Subtotal</span>
                    <span className={`${fontMedium} text-base text-[14px]`}>$200.00</span>
                </div>

                <div className='flex justify-between items-center'>
                    <span className={`${fontMedium} text-base text-[14px]`}>Loan Finance <span className='text-base-50 font-normal'>(6 months)</span></span>
                    <span className={`${fontMedium} text-base text-[14px]`}> - $130.00</span>
                </div>

                <hr className="border border-primary mt-4" />


                {/* total price */}

                <div className='flex justify-between items-center mt-4'>
                    <span className='text-[18px] font-Avenir font-extrabold'>Total Price</span>
                    <p className='text-[24px] font-Avenir font-extrabold text-primary'><span className='text-[14px] text-base'>$</span>70.00</p>
                </div>
            </div>
           

           




        </>
    )
}

export default EstimatedPriceCard