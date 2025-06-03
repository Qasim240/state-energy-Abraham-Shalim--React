import React from 'react'
import PrimaryHeading from '../PrimaryHeading'
import BillingCard from '../BillingCard'
import { monthlyBillIcon } from '../../../../imagesPath'

const Home = () => {
    return (
        <>
            <div className='text-center mt-10'>
                <span className='text-base-red bg-base-red-200 font-Avenir font-medium px-4 py-3 rounded-[12px] text-[14px]'>
                    Utilization Details
                </span>
                <PrimaryHeading className='mt-10' HeadingText="Estimated Consumption" />

            </div>

            <BillingCard title="billing" icon={monthlyBillIcon}>
                test
            </BillingCard>



        </>
    )
}

export default Home