import React, { useState } from 'react'
import PrimaryBtn from '../PrimaryBtn'
import IconHeading from '../../utils/IconHeading'
import { infoCircleIcon, supportIcon, mosaicLogo, reviewFinancial } from '../../../../imagesPath'
import PriceCard from '../PriceCard'

const LoanFinance = () => {
    const [selectedLoan, setSelectedLoan] = useState('1');

    const loanOptions = [
        {
            id: '1',
            img: mosaicLogo,
            amount: 130.0,
        },
        {
            id: '2',
            img: reviewFinancial,
            amount: 246.0,
        },
    ];

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
                <IconHeading className='lg:text-[16px] text-[12px]' primaryIcon={supportIcon} headingText="Loan Finance" secondaryIcon={infoCircleIcon} />

                <form className='mt-6'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {loanOptions.map(option => (
                            <div
                                key={option.id}
                                onClick={() => setSelectedLoan(option.id)}
                                className={`border rounded-lg p-5 cursor-pointer text-center transition-all duration-200 ${selectedLoan === option.id ? 'border-primary shadow-md' : 'border-gray-300'
                                    }`}
                            >
                                <div className='flex flex-col gap-3'>
                                    <img className='mx-auto' src={option.img} alt="loan-logo" />
                                <p className="text-sm text-gray-500">New Monthly Payment</p>
                                <p className="text-xl font-bold text-primary-700">${option.amount.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </form>
            </div>

            <div className="md:col-span-4 mt-6 md:mt-[40px]">
                <PriceCard />
            </div>
        </div>
    )
}

export default LoanFinance
