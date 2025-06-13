import React from 'react'

const Image = ({ img, className = '', ...props }) => {
    return (
        <img className={className} src={img} alt={img} {...props} />
    )
}

export default Image