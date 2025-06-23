import React from 'react';
import clsx from 'clsx';

// Reusable shimmer box
const ShimmerBox = ({ className }) => (
    <div className={`${className} bg-gray-200 rounded relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
    </div>
);

const CollectionCardSkeleton = () => {
    return (

        <div
            className={clsx(
                'border border-secondary p-4 sm:p-6 md:p-8 lg:p-[30px] large bg-blue-flat',
                'relative min-h-[220px] sm:min-h-[250px] lg:min-h-[300px] rounded-large overflow-hidden',

            )}
        >

            <ShimmerBox className="h-[22px] sm:h-[24px] w-[120px] sm:w-[160px] mb-4 sm:mb-5" />

            {/* Bottom left image */}
            <div className="absolute bottom-0 left-0">
                <ShimmerBox className="w-[80px] sm:w-[100px] lg:w-[150px] h-[80px]" />
            </div>

            {/* Bottom right button */}
            <div className="absolute right-[-16px] sm:right-[-22px] bottom-0">
                <ShimmerBox className="w-[60px] sm:w-[70px] h-[50px] rounded-tl-[16px]" />
            </div>
        </div>
    );
};

export default CollectionCardSkeleton;
