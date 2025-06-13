import React from 'react'
import { fontMedium } from './utils/fontMedium'
import DividerCard from './utils/DividerCard'
import IconHeading from './utils/IconHeading'
import Image from './utils/Image'
import OrderCard from './utils/OrderCard'
import { greenTick, infoCircleIcon, redCrossIcon, shoppingBag } from '../../imagesPath'

const OrderCardItem = ({
    orderNo,
    orderDate,
    customerName,
    utilityBill,
    insuranceBill,
    itemCount,
    amount,
    showIcon,
    completed
}) => {

    const orderStatus = completed ? 'bg-[#EDF9F3] text-[#48C382]' : 'bg-[#F9EAEA] text-[#FF4D4F]'
    const isSigned = completed ? 'Contract Signed' : 'Not Signed'

    return (
        <OrderCard>
            <div className='flex justify-between items-center'>
                <div>
                    <span className='text-[14px] font-Avenir text-base-dark mr-1'>Order No.</span>
                    <span className='text-primary font-Avenir font-extrabold text-[20px]'>#{orderNo}</span>
                </div>
                <span className={`px-[12px] py-2 rounded-[5px] font-Avenir text-[14px] uppercase ${orderStatus}  ${fontMedium}`} >
                    {completed ? "Completed" : "pending"}
                </span>
            </div>

            <hr className='my-5' />
            <DividerCard firstHeading="Order Date" firstInfo={orderDate} secondheading="Customer Name" seondinfo={customerName} />
            <hr className='my-5' />
            <DividerCard firstHeading="Monthly Utility Bill" firstInfo={`$ ${utilityBill}`} secondheading="Monthly Insurance Bill" seondinfo={`$ ${insuranceBill}`} />

            <div className='border border-primary px-4 py-2 my-4 rounded-md bg-[#F1F6FF]'>
                <div className='flex items-center justify-between'>
                    <IconHeading primaryIcon={shoppingBag} headingText="View all Items" />
                    <span className='bg-base rounded-full h-[24px] w-[24px] flex justify-center items-center text-[12px] bg-base-dark text-white font-Avenir font-extrabold'>
                        {itemCount}
                    </span>
                </div>
            </div>

            <div className='flex justify-between items-center'>
                <IconHeading primaryIcon={completed ? greenTick : redCrossIcon} headingText={isSigned} />
                <div className='flex items-center gap-2'>
                    <span className='text-primary text-[28px] font-Avenir font-extrabold'>
                        <span className='text-base-dark text-[14px]'>$</span>{amount.toFixed(2)}
                    </span>
                    {showIcon && <Image img={infoCircleIcon} />}
                </div>
            </div>
        </OrderCard>
    )
}

export default OrderCardItem
