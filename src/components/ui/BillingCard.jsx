import React, { useState } from 'react';
import VerticalSeparator from '../utils/VerticalSeparator';

const BillingCard = ({ title, icon, initialAmount = 2000, maxAmount = 10000 }) => {
    const [amount, setAmount] = useState(2000);


    const handleSliderChange = (e) => {
        setAmount(Number(e.target.value));
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
                <span className="text-blue-900  text-2xl font-medium font-Avenir text-[40px]">{amount}</span>
            </div>


            <div className="relative">
                <input
                    type="range"
                    min="0"
                    max={maxAmount}
                    value={amount}
                    onChange={handleSliderChange}
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
            background-image: url("data:image/svg+xml;utf8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2010%2012'%20fill='none'%20width='10'%20height='12'><path%20d='M1%201L1%2011'%20stroke='%23FBFBFB'%20stroke-width='1.75'%20stroke-linecap='round'/><path%20d='M9%201L9%2011'%20stroke='%23FBFBFB'%20stroke-width='1.75'%20stroke-linecap='round'/></svg>");
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
            background-image: url("data:image/svg+xml;utf8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2010%2012'%20fill='none'%20width='10'%20height='12'><path%20d='M1%201L1%2011'%20stroke='%23FBFBFB'%20stroke-width='1.75'%20stroke-linecap='round'/><path%20d='M9%201L9%2011'%20stroke='%23FBFBFB'%20stroke-width='1.75'%20stroke-linecap='round'/></svg>");
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
