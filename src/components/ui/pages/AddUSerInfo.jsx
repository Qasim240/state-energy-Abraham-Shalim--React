import React from 'react'
import PrimaryBtn from '../PrimaryBtn'
import Input from '../Input'
import PriceCard from '../PriceCard'
import IconHeading from '../../utils/IconHeading'
import { generalinfoIcon, infoCircleIcon, orderSpec } from '../../../../imagesPath'
import { Link } from 'react-router-dom'

const AddUSerInfo = () => {
    return (
        <>
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

                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="4" cy="4" r="4" fill="#D9D9D9" />
                                        </svg>

                                        <span className="ms-1 text-sm font-medium  font-Avenir md:ms-2 text-base">Customer Information</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                      <Link to="/loan-finance">
                      
                        <PrimaryBtn className='bg-transparent px-[0] py-[0]'>
                            <span className='font-Avenir font-medium underline text-base-red text-[14px]'>Skip & Continue Anonymously </span>
                        </PrimaryBtn>
                      
                      </Link>



                    </div>

                    <hr className='my-4' />

                    <IconHeading className='lg:text-[16px] text-[12px]' primaryIcon={generalinfoIcon} headingText="Order Specifications" secondaryIcon={infoCircleIcon} />
                    <form action="">

                        <div className='grid md:grid-cols-12 grid-cols-1 mt-10 gap-5'>
                            <div className='col-span-6'>
                                <Input type="text" label="First Name" placeholder="Ben" />
                            </div>
                            <div className='col-span-6'>
                                <Input type="text" label="Last Name" placeholder="Weisblatt" />
                            </div>
                            <div className='col-span-6'>
                                <Input type="email" label="Email" placeholder="johnwick@mystateenergy.com" />
                            </div>
                            <div className='col-span-6'>
                                <Input type="number" label="Phone Number" placeholder="(+1) 484 569 |" />
                            </div>
                            <div className='col-span-12'>
                                <Input type="Address" label="Phone Number" placeholder="Enter Address" />
                            </div>
                            <div className='col-span-6'>
                                <Input type="number" label="Zip-code" placeholder="Enter Zip-code" />
                            </div>
                            <div className='col-span-6'>
                                <Input type="number" label="City" placeholder="e.g New York" />
                            </div>
                        </div>






                    </form>

                </div>
                <div className="md:col-span-4 mt-6 md:mt-[40px]">
                    <PriceCard />
                </div>
            </div>


        </>
    )
}

export default AddUSerInfo