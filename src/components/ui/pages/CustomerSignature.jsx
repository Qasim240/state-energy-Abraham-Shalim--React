import React from 'react'
import IconHeading from '../../utils/IconHeading'
import PriceCard from '../PriceCard'
import PrimaryBtn from '../PrimaryBtn'
import { downloadIcon, infoCircleIcon, signature, supportIcon } from '../../../../imagesPath'
import Image from '../../utils/Image'
import Input from '../Input'
import { fontMedium } from '../../utils/fontMedium'
import { Link } from 'react-router-dom'

const CustomerSignature = () => {
    return (
        <div className="grid md:grid-cols-12 grid-cols-1 lg:gap-5 h-screen md:overflow-hidden">
            <div className='md:col-span-8  pr-2'>

                <div className='flex justify-between items-center'>
                    <nav className="flex  py-3 text-gray-700 " aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <a href="#" className="font-medium font-Avenir text-sm text-base-50">
                                    Cart Items
                                </a>
                            </li>
                            <li className="inline-flex items-center">
                                <a href="#" className="font-medium font-Avenir text-sm text-base-50">
                                    Customer Information
                                </a>
                            </li>
                            <li className="inline-flex items-center">

                                <a href="#" className="font-medium font-Avenir text-sm text-base-50">
                                    Loan Finance
                                </a>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="4" cy="4" r="4" fill="#D9D9D9" />
                                    </svg>
                                    <span className="ms-1 text-sm font-medium  font-Avenir md:ms-2 text-base">Loan Finance</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <PrimaryBtn className='bg-transparent px-[0] py-[0]'>
                        <span className='font-Avenir font-medium underline text-base-red text-[14px]'>Skip</span>
                    </PrimaryBtn>
                </div>

                <hr className='my-4' />
                <IconHeading className='lg:text-[16px] text-[12px] my-8' primaryIcon={supportIcon} headingText="Customer Signature" secondaryIcon={infoCircleIcon} />
                <div className='border border-secondary p-4 rounded-large lg:mt-4 '>

                    <Image className="mx-auto m-10" img={signature} />

                    <div className='text-end'>
                        <PrimaryBtn className='bg-transparent px-6 py-[7px] border  border-primary'>
                            <span className='text-base text-primary'>Clear</span>
                        </PrimaryBtn>
                    </div>
                </div>

                <div className='mt-4'>
                    <input
                        className='mr-2 h-[18px] w-[18px] accent-primary'
                        id='terms'
                        type="checkbox"
                    />


                    <label className={`text-base ${fontMedium}`} htmlFor="terms">I acknowledge that I have reviewed and agree to comply with the terms & conditions outlined in the purchase order.</label>
                </div>

            </div>

            <div className="md:col-span-4 mt-6 md:mt-[40px]">
                <PriceCard />


                <Link to='/all-orders'>
                    <PrimaryBtn className='w-full mt-4 '>
                        <span className='mx-auto'>Continue</span>
                    </PrimaryBtn>
                </Link>

                <div className='flex items-center justify-center gap-4 mt-4'>

                    <PrimaryBtn className='px-[0] py-[0] bg-transparent' iconLeft={downloadIcon}>
                        <span className='text-base-dark underline font-Avenir font-medium'>Download this order</span>
                    </PrimaryBtn>
                    <span className={`bg-[#C52F311A] text-base-red py-[5px] px-[10px] rounded-[5px] text-[14px] ${fontMedium}`}>PDF</span>
                </div>




            </div>
        </div>
    )
}

export default CustomerSignature