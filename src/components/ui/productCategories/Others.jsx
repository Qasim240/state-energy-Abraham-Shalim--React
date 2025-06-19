import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
    infoCircleIcon,
    orderSpec
} from '../../../../imagesPath';
import IconHeading from '../../utils/IconHeading';
import Input from '../Input';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';
import { useAddToCartMutation } from '../../../features/api/apiSlice';

import { setOtherSelection, addToCart } from '../../../features/slices/userSlice.js';
// Validation schema
const otherSchema = yup.object().shape({
    feedback: yup
        .string()
        .required('Feedback is required')
        .max(300, 'Feedback must be less than 300 characters'),
    totalPrice: yup
        .number()
        .typeError('Must be a valid number')
        .required('Total price is required')
        .positive('Price must be positive')
        .min(1, 'Minimum price is $1'),
});

const Others = () => {
    const dispatch = useDispatch();
    const [addToCartApi, { isLoading }] = useAddToCartMutation();
    const [selectedAdders, setSelectedAdders] = useState([]);

    const categories = useSelector(
        (state) =>
            state.api.queries?.['getCategories(undefined)']?.data?.data?.categories || []
    );

    const savedOther = useSelector((state) => state.user.otherSelection || {});
    const otherCategory = categories.find((cat) => cat.name.toLowerCase() === 'other');

    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(otherSchema),
        defaultValues: {
            feedback: savedOther.feedback || '',
            totalPrice: savedOther.totalPrice || '',
        }
    });

    const sliderBanners = otherCategory?.detail_photo_url
        ? [otherCategory.detail_photo_url]
        : [];

    const adders = otherCategory?.adders || [];

    const toggleAdder = (adder) => {
        const newAdders = selectedAdders.includes(adder)
            ? selectedAdders.filter((a) => a !== adder)
            : [...selectedAdders, adder];
        setSelectedAdders(newAdders);
        dispatch(setOtherSelection({
            ...savedOther,
            adders: newAdders
        }));
    };

    const onSubmit = async (data) => {
        try {
            const payload = {
                category_id: otherCategory.id,
                configuration: {
                    feedback: data.feedback,
                    total_price: data.totalPrice
                },
                adders: selectedAdders.map(adderName => {
                    const adder = adders.find(a => a.name === adderName);
                    return {
                        id: adder.id,
                        name: adder.name,
                        price: adder.price.toString()
                    };
                })
            };

            const response = await addToCartApi(payload).unwrap();

            if (response.success) {
                dispatch(addToCart({
                    id: response.data.cart.id,
                    category: 'Other',
                    configuration: response.data.cart.configuration,
                    adders: response.data.cart.adders,
                    price: response.data.cart.price,
                    apiResponse: response
                }));
                toast.success('Added to cart successfully!');
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to add to cart');
        }
    };

    // Update Redux state on form changes
    const handleFormChange = (name, value) => {
        dispatch(setOtherSelection({
            ...savedOther,
            [name]: value
        }));
    };

    if (!otherCategory) return <p className="text-center py-10 text-gray-500">Loading Other Services Data...</p>;

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 hidden md:block">
                <BackBtn className="mb-3" link="/collection" />
                <CustomSlider items={sliderBanners} />
            </div>

            <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow">
                    <IconHeading
                        className="lg:text-[16px] text-[12px]"
                        primaryIcon={orderSpec}
                        headingText="Order Specifications"
                        secondaryIcon={infoCircleIcon}
                    />

                    <div className="grid grid-cols-1 gap-4 mt-10">
                        <div>
                            <Controller
                                name="feedback"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Feedback"
                                        type="textarea"
                                        rows={6}
                                        maxLength={300}
                                        className="h-40 w-full p-4"
                                        error={errors.feedback?.message}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleFormChange('feedback', e.target.value);
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4 mt-10">
                        <div>
                            <Controller
                                name="totalPrice"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Total Price"
                                        type="number"
                                        placeholder="e.g. 200.00"
                                        unit="$"
                                        error={errors.totalPrice?.message}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleFormChange('totalPrice', e.target.value);
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {adders.length > 0 && (
                        <>
                            <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
                            <AdderSelector
                                adders={adders.map(a => a.name)}
                                selectedAdders={selectedAdders}
                                toggleAdder={toggleAdder}
                            />
                        </>
                    )}

                    <AddToCardWedget
                        totalPrice={watch('totalPrice') || '0'}
                        onAddToCart={handleSubmit(onSubmit)}
                        isLoading={isLoading}
                    />
                </form>
            </div>
        </div>
    );
};

export default Others;