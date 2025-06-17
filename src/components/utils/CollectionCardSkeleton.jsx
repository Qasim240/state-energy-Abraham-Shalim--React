// src/components/Collection/CollectionCardSkeleton.jsx
import React from 'react';
import clsx from 'clsx';

const CollectionCardSkeleton = () => {
    return (
        <div className={clsx(
            'border border-secondary p-4 sm:p-6 md:p-8 lg:p-[30px] large bg-blue-flat',
            'relative h-[220px] sm:h-[250px] lg:h-[300px] rounded-large overflow-hidden',
            'animate-pulse'
        )}>
            <div className="h-6 sm:h-7 w-1/2 bg-gray-300 rounded mb-4"></div>
            <div className="absolute bottom-0 left-0 w-[80px] sm:w-[100px] lg:w-[150px] h-10 bg-gray-300 rounded" />
            <div className="absolute right-[-16px] sm:right-[-22px] bottom-0 w-[60px] sm:w-[70px] h-[50px] bg-gray-300 rounded-tl-[16px]" />
        </div>
    );
};

export default CollectionCardSkeleton;
