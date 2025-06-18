// src/components/skeletons/RoofSkeleton.jsx
import React from 'react';

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const RoofSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4 hidden md:block">
        <SkeletonBox className="h-[350px] w-full rounded-large mb-4" />
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col space-y-6 mt-4">
        <SkeletonBox className="h-5 w-[200px]" />
        <div className="flex gap-3 flex-wrap">
          {[1, 2, 3, 4].map((_, i) => (
            <SkeletonBox key={i} className="w-[100px] h-[38px]" />
          ))}
        </div>

        <div className="grid md:grid-cols-12 gap-4">
          <SkeletonBox className="h-[60px] col-span-6 w-full" />
          <SkeletonBox className="h-[60px] col-span-6 w-full" />
        </div>

        <SkeletonBox className="h-5 w-[150px]" />
        <div className="flex gap-3 flex-wrap">
          {[1, 2].map((_, i) => (
            <SkeletonBox key={i} className="w-[100px] h-[38px]" />
          ))}
        </div>

        <SkeletonBox className="h-[80px] w-full rounded-lg" />
      </div>
    </div>
  );
};

export default RoofSkeleton;
