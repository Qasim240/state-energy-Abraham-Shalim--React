import React from 'react'
import { fontMedium } from './fontMedium'
import VerticalSeparator from './VerticalSeparator'

const DividerCard = ({ firstHeading, firstInfo, secondheading, seondinfo }) => {


    const monthalyBillStyle = `${fontMedium} text-[13px] text-base-50 mb-3`
    const monthalyInsuranceStyle = `font-Avenir font-medium lg:text-[18px] text-[16px]`

    return (
        <div className='flex gap-5 justify-between items-center'>
            <div>
                <p className={monthalyBillStyle}>{firstHeading}</p>
                <p className={monthalyInsuranceStyle}><span>$</span> {firstInfo}</p>
            </div>
            <VerticalSeparator className='h-[44px]' />
            <div>
                <p className={monthalyBillStyle}>{secondheading}</p>
                <p className={monthalyInsuranceStyle}>$<span></span>{seondinfo}</p>
            </div>
        </div>
    )
}

export default DividerCard