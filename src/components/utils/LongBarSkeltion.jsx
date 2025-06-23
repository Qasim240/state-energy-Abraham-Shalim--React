import React from 'react'
import clsx from 'clsx';

const LongBarSkeltion = ({ className = '' }) => {
    return (
        <div className={clsx(
            `border border-secondary p-4 sm:p-6 md:p-8 lg:p-[25px] large bg-blue-flat  ${className}`,
            'relative h-[50px] rounded-large overflow-hidden',
            'animate-pulse'
        )}>

        </div>
    )
}

export default LongBarSkeltion