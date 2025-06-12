import React from 'react'
import Image from './Image'
import { calcicon, downloadIcon, editicon } from '../../../imagesPath'
import { fontMedium } from './fontMedium'
import VerticalSeparator from './VerticalSeparator'
import PrimaryBtn from '../ui/PrimaryBtn'
import { Link } from 'react-router-dom'

const EstimatedPriceCard = () => {
    const monthalyBillStyle = `${fontMedium} text-[14px] text-base-50 mb-3`
    const monthalyInsuranceStyle = `font-Avenir font-medium text-[20px]`
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

                <div className='flex gap-5 justify-center items-center'>
                    <div>
                        <p className={monthalyBillStyle}>Monthly Utility Bill</p>
                        <p className={monthalyInsuranceStyle}><span>$</span>$123.45</p>
                    </div>
                    <VerticalSeparator className='h-[44px]' />
                    <div>
                        <p className={monthalyBillStyle}>Monthly Insurance Bill</p>
                        <p className={monthalyInsuranceStyle}>$<span></span>123.45</p>
                    </div>
                </div>

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


            <Link to='/user-info'>
                <PrimaryBtn className='w-full mt-4 '>
                    <span className='mx-auto'>Continue</span>
                </PrimaryBtn></Link>
            <div className='flex items-center justify-center gap-4 mt-4'>

                <PrimaryBtn className='px-[0] py-[0] bg-transparent' iconLeft={downloadIcon}>
                    <span className='text-base underline font-Avenir font-medium'> Download this order</span>
                </PrimaryBtn>
                <span className={`bg-[#C52F311A] text-base-red py-[5px] px-[10px] rounded-[5px] text-[14px] ${fontMedium}`}>PDF</span>
            </div>



        </>
    )
}

export default EstimatedPriceCard