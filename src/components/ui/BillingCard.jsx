import React, { useState } from 'react';
import VerticalSeparator from '../utils/VerticalSeparator';
import { setUtilityBill, setInsuranceBill } from '../../features/slices/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const BillingCard = ({ title, icon, type = 'utility', maxAmount = 10000 }) => {
    const dispatch = useDispatch();

    const amount = useSelector((state) =>
        type === 'utility' ? state.user.utilityBill : state.user.insuranceBill
    );

    const handleAmountChange = (value) => {
        const parsed = Number(value);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= maxAmount) {
            dispatch(type === 'utility' ? setUtilityBill(parsed) : setInsuranceBill(parsed));
        }
    };

    const fillPercent = (amount / maxAmount) * 100;

    return (
        <div className="border border-secondary p-4 mt-4 rounded-large bg-gray-flat">
            <div className="flex items-center gap-3 mb-2">
                <img src={icon} alt="icon" />
                <span className="font-medium font-Avenir text-gray-700">{title}</span>
            </div>

            <div className="flex items-center border border-gray-300 p-4 my-4 bg-white rounded-large">
                <span className="text-gray-400 text-[40px] font-medium font-Avenir">$</span>
                <VerticalSeparator className="mx-4 h-8 w-[2px]" />
                <input
                    type="number"
                    min="0"
                    max={maxAmount}
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="text-blue-900 text-2xl font-medium font-Avenir text-[40px] w-full bg-transparent focus:outline-none"
                />
            </div>

            <div className="relative">
                <input
                    type="range"
                    min="0"
                    max={maxAmount}
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full h-2 rounded-large appearance-none cursor-pointer bg-base-50"
                    style={{
                        background: `linear-gradient(to right, #C52F31 0%, #C52F31 ${fillPercent}%, #E5E7EB ${fillPercent}%, #E5E7EB 100%)`
                    }}
                />

                <div className="flex justify-between text-sm text-gray-500 mt-3">
                    <span className='text-base-dark font-extrabold font-Avenir'>$0</span>
                    <span className='text-base-dark font-extrabold font-Avenir'>$10K</span>
                </div>

                <style jsx>{`
                    input[type='range']::-webkit-slider-thumb {
                        appearance: none;
                        width: 48px;
                        height: 32px;
                        background-color: #C52F31;
                        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 12' fill='none' width='10' height='12'><path d='M1 1L1 11' stroke='%23FBFBFB' stroke-width='1.75' stroke-linecap='round'/><path d='M9 1L9 11' stroke='%23FBFBFB' stroke-width='1.75' stroke-linecap='round'/></svg>");
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: 10px 12px;
                        border-radius: 16px;
                        border: none;
                        cursor: pointer;
                        margin-top: 0px;
                    }
                    input[type='range']::-moz-range-thumb {
                        width: 28px;
                        height: 28px;
                        background-color: #C52F31;
                        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 12' fill='none' width='10' height='12'><path d='M1 1L1 11' stroke='%23FBFBFB' stroke-width='1.75' stroke-linecap='round'/><path d='M9 1L9 11' stroke='%23FBFBFB' stroke-width='1.75' stroke-linecap='round'/></svg>");
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: 10px 12px;
                        border-radius: 50%;
                        border: none;
                        cursor: pointer;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default BillingCard;
