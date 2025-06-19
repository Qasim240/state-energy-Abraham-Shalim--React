import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CollectionCard from '../CollectionCard';
import CollectionCardSkeleton from '../../utils/CollectionCardSkeleton';
import { useGetCategoriesQuery } from '../../../features/api/apiSlice';
import BackBtn from '../../utils/BackBtn';
import { setCategories } from '../../../features/slices/userSlice.js';

const Collection = () => {
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useGetCategoriesQuery();





    const categories = data?.data?.categories || [];


    console.log("categories", categories)

    // Cache categories in Redux store
    useEffect(() => {
        if (categories.length) {
            dispatch(setCategories(categories));
        }
    }, [categories, dispatch]);

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

    return (
        <>
            <BackBtn link='/select-appointment' />

            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 my-6">
                {categories.map((category) => (
                    <CollectionCard
                        key={category.id}
                        title={category.name}
                        slug={category.name.toLowerCase()}
                        thumbnailImg={category.thumbnail_url}
                    />
                ))}
            </div>
        </>
    );
};

export default Collection;
