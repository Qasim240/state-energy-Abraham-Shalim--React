import React from 'react'
import { categoryIcon, detailBanner } from '../../../../imagesPath'

const DetailPage = () => {
    return (
        <>

            <div class="grid grid-cols-12 gap-4">
                <div className='col-span-4'>
                    <img src={detailBanner} alt="" />

                </div>
                <div className='col-span-8'>

                    <div className='flex items-center'>
                        <img src={categoryIcon} alt={categoryIcon} />
                        <span className='font-Avenir font-medium'>Choose Category</span>
                    </div>


                </div>
            </div>


        </>
    )
}

export default DetailPage