import React from 'react'
import { Link } from 'react-router-dom'
import PrimaryBtn from '../ui/PrimaryBtn'

const BackBtn = ({ link, className = '' }) => {
    return (
        <Link to={link}>
            <PrimaryBtn className={`px-2 py-1 ${className}`} >
                back
            </PrimaryBtn>
        </Link>
    )
}

export default BackBtn