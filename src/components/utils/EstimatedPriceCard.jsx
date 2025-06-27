import React from 'react';
import Image from './Image';
import { calcicon, editicon } from '../../../imagesPath';
import { fontMedium } from './fontMedium';
import PrimaryBtn from '../ui/PrimaryBtn';
import DividerCard from './DividerCard';
import { useSelector } from 'react-redux';

const fmt = (n = 0) =>
  Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const EstimatedPriceCard = ({ subtotal = 0, loanFinance = 0 }) => {
  const totalPrice = subtotal - loanFinance;

  /* extra values you already pull from Redux */
  const utilityBills = useSelector((s) => s.user.utilityBill);
  const monthlyInsurance = useSelector((s) => s.user.insuranceBill);

  return (
    <>
      {/* Estimated consumption */}
      <div className="border border-secondary p-[24px] rounded-[16px] bg-gray-flat">
        <div className="flex justify-between items-center">
          <p className={`${fontMedium} text-[18px]`}>Your Estimated Consumption</p>
          <PrimaryBtn className="px-[0] py-[0] bg-transparent" iconLeft={editicon} />
        </div>

        <div className="py-4">
          <hr />
        </div>

        <DividerCard
          firstHeading="Monthly Utility Bill"
          firstInfo={utilityBills || '-'}
          secondheading="Monthly Insurance Bill"
          seondinfo={monthlyInsurance || '-'}
        />
      </div>

      {/* Price Summary */}
      <div className="border border-primary p-[24px] rounded-[16px] mt-5 bg-[#F1F6FF]">
        <div className="flex items-center gap-4">
          <Image img={calcicon} />
          <div>
            <p className="text-primary font-Avenir font-extrabold">Total Estimated Price</p>
            <span className="text-base-50">The prices may vary.</span>
          </div>
        </div>

        {/* Cart Subtotal */}
        <div className="flex justify-between items-center my-[20px]">
          <span className={`${fontMedium} text-base text-[14px]`}>Cart Subtotal</span>
          <span className={`${fontMedium} text-base text-[14px]`}>${fmt(subtotal)}</span>
        </div>

        {/* Loan finance row (only if non-zero) */}
        {loanFinance !== 0 && (
          <div className="flex justify-between items-center my-[20px]">
            <span className={`${fontMedium} text-base text-[14px]`}>
              Loan Finance&nbsp;
              <span className="text-base-50 font-normal">(monthly)</span>
            </span>
            <span className={`${fontMedium} text-base text-[14px]`}>- ${fmt(loanFinance)}</span>
          </div>
        )}

        <hr className="border border-primary mt-4" />

        {/* Total */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-[18px] font-Avenir font-extrabold">Total Price</span>
          <p className="text-[24px] font-Avenir font-extrabold text-primary">
            <span className="text-[14px] text-base">$</span>
            {fmt(totalPrice)}
          </p>
        </div>
      </div>
    </>
  );
};

export default EstimatedPriceCard;
