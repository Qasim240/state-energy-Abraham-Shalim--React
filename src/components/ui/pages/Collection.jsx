import React from 'react';
import CollectionCard from '../CollectionCard';
import CollectionCardSkeleton from '../../utils/CollectionCardSkeleton';
import { useGetCategoriesQuery } from '../../../features/api/apiSlice';

const Collection = () => {
    const { data, isLoading, isError } = useGetCategoriesQuery();

    if (isLoading) {
        return (
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <CollectionCardSkeleton key={idx} />
                ))}
            </div>
        );
    }

    if (isError) {
        return <p className="text-center py-10 text-red-500">Failed to load categories</p>;
    }

    const categories = data?.data?.categories || [];

    return (
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
            {categories.map((category) => (
                <CollectionCard
                    key={category.id}
                    title={category.name}
                    slug={category.name.toLowerCase()}
                    thumbnailImg={category.thumbnail_url}
                />
            ))}
        </div>
    );
};

export default Collection;
