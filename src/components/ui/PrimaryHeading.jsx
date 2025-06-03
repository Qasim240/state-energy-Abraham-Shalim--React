import React from 'react'

const PrimaryHeading = ({ HeadingText, className = '', ...props }) => {
    return (
        <h1 className={`text-base font-Avenir font-medium text-h1 ${className}`}   {...props}>{HeadingText}</h1>
    )
}

export default PrimaryHeading