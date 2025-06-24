import React, { useEffect } from 'react'
import PrimaryHeading from '../PrimaryHeading'
import BillingCard from '../BillingCard'
import { arrowRight, monthlyBillIcon } from '../../../../imagesPath'
import PrimaryBtn from '../PrimaryBtn'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BackBtn from '../../utils/BackBtn'

const Home = () => {
    const selectedAppointment = useSelector((state) => state.user.selectedAppointment);


    return (
        <>
            <BackBtn link='/select-appointment' />

            <div className='text-center mt-10'>
                <span className='text-base-red bg-base-red-200 font-Avenir font-medium px-4 py-3 rounded-[12px] text-[14px] '>
                    Utilization Details
                </span>
                <PrimaryHeading className='mb-[24px] mt-[40px]' HeadingText="Estimated Consumption" />

            </div>
            <div className="grid lg:grid-cols-12 gap-4">
                <div className="lg:col-start-2 lg:col-span-5">
                    <BillingCard
                        title="Monthly Utility Bill"
                        icon={monthlyBillIcon}
                        type="utility"
                        maxAmount={10000}
                    />
                </div>
                <div className="lg:col-span-5">
                    <BillingCard
                        title="Monthly Insurance Bill"
                        icon={monthlyBillIcon}
                        type="insurance"
                        maxAmount={10000}
                    />
                </div>
            </div>

            <div className='text-center mt-[48px]'>
                <Link to="/collection">
                    <PrimaryBtn
                        Name='py-4 px-5' icon={arrowRight}>
                        Proceed with Order
                    </PrimaryBtn>
                </Link>
            </div>

        </>
    )
}

export default Home