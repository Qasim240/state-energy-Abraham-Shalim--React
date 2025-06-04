import React from 'react'
import PrimaryBtn from './PrimaryBtn'
import { addIcon } from '../../../imagesPath'

const CollectionCard = ({title, thumbnailImg}) => {
    return (
        <div className='border border-secondary p-4 sm:p-6 md:p-8 lg:p-[30px] rounded-[16px] bg-blue-flat relative h-[220px] sm:h-[250px] lg:h-[300px] overflow-hidden'>
            <p className='font-Avenir uppercase font-extrabold text-[18px] sm:text-[20px] lg:text-[21px] pb-4 sm:pb-5 text-left'>
                {title}
            </p>

            <img
                className='absolute bottom-0 left-0 w-[80px] sm:w-[100px] lg:w-[150px] object-contain'
                src={thumbnailImg}
                alt="Collection"
            />

            <PrimaryBtn className='py-3 px-4 sm:py-4 sm:px-5 absolute right-[-16px] sm:right-[-22px] bottom-0 bg-[#1E1E1E] text-[24px] sm:text-[30px] rounded-none rounded-tl-[16px] flex items-center'>
                <img className='mr-2 sm:mr-4 w-[16px] sm:w-[20px]' src={addIcon} alt={addIcon} />
            </PrimaryBtn>
        </div>
    )
}

export default CollectionCard
