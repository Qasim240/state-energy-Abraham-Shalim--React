import React from 'react'

const PrimaryHeading = ({ HeadingText, className = '', ...props }) => {
    return (
        <h1 className={`text-base font-Avenir font-medium lg:text-h1 text-[25px] ${className}`}   {...props}>{HeadingText}</h1>
    )
}

export default PrimaryHeading