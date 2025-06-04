import React from 'react'
import { collectionImg } from '../../../imagesPath'

const CollectionCard = () => {
    return (
        <div className='border border-secondary p-[30px] rounded-[16px] bg-blue-flat relative h-[100%]'>
            <p className='font-Avenir font-extrabold text-[21px] pb-5 text-left'>HVAC</p>
            <img className=' bottom-0' src={collectionImg} alt="" />
        </div>
    )
}

export default CollectionCard