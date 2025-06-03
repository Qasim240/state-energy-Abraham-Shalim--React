import React from 'react'

const BillingCard = ({ children, title, icon }) => {
    return (
        <div>
            <div className='border border-secondary p-4 mt-4 rounded-[16px] bg-gray-flat '>
                <div className='flex items-center gap-3'>
                    <img src={icon} alt="icon" />
                    {title}
                </div>
                {children}
            </div>


        </div>
    )
}

export default BillingCard