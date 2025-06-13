import React from 'react'

const OrderCard = ({ children, }) => {
    return (
        <>
            <div className='border border-secondary rounded-large p-4'>
                {children}
            </div>


        </>
    )
}

export default OrderCard