import React from 'react'
import { Link } from 'react-router-dom'
import PrimaryBtn from '../ui/PrimaryBtn'
import Image from './Image'
import { backArrow } from '../../../imagesPath'

const BackBtn = ({ link, className = '' }) => {
    return (
        <Link to={link}>
            <PrimaryBtn className={`px-2 py-1 bg-transparent ${className}`} >
                <Image className='h-[20px]' img={backArrow} />
            </PrimaryBtn>
        </Link>
    )
}

export default BackBtn