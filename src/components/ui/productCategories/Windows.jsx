import React, { useState, useEffect } from 'react';
import {
    addmoreIcon, arrowUpIcon, arrowDownIcon, deleteIcon, doorIcon,
    infoCircleIcon, orderSpec
} from '../../../../imagesPath';

import { useSelector, useDispatch } from 'react-redux';
import {
    useAddToCartMutation,
    useEditCartItemMutation,
    useGetCategoriesQuery
} from '../../../features/api/apiSlice';
import { toast } from 'react-toastify';

import {
    setWindowSelection,
    addToCart,
    removeCartItem
} from '../../../features/slices/userSlice.js';

import CustomSlider from '../../utils/CustomSlider';
import IconHeading from '../../utils/IconHeading';
import PrimaryBtn from '../PrimaryBtn';
import Image from '../../utils/Image';
import Input from '../Input';
import Dropdown from '../Dropdown';
import Counter from '../../utils/Counter';
import AddToCardWedget from '../../utils/AddToCardWedget';
import VerticalSeparator from '../../utils/VerticalSeparator';
import BackBtn from '../../utils/BackBtn';
import { useParams, useNavigate } from 'react-router-dom';

import * as yup from 'yup';

const Windows = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartId } = useParams();
    const isEditMode = !!cartId;

    const { data, isLoading } = useGetCategoriesQuery();
    const [addToCartApi, { isLoading: isAdding }] = useAddToCartMutation();
    const [editCartItemApi] = useEditCartItemMutation();

    const categories = data?.data?.categories || [];
    const windowCategory = categories.find(cat => cat.name?.toLowerCase() === 'windows');
    const fields = windowCategory?.configuration?.fields || [];

    const savedSelection = useSelector((state) => state.user.windowSelection || []);

    const [windowList, setWindowList] = useState(
        savedSelection.length
            ? savedSelection.map(w => ({ ...w, errors: {}, isOpen: true }))
            : [
                {
                    id: Date.now(),
                    height: '',
                    width: '',
                    type: '',
                    frameColor: '',
                    tintColor: '',
                    qty: 1,
                    isOpen: true,
                    errors: {}
                }
            ]
    );

    const getFieldLabel = (name) => fields.find(f => f.name === name)?.label || name;
    const windowTypeOptions = fields.find(f => f.name === 'type')?.options || [];
    const frameColorOptions = fields.find(f => f.name === 'frame_color')?.options || [];
    const sliderBanner = windowCategory?.detail_photo_url ? [windowCategory.detail_photo_url] : [];

    useEffect(() => {
        dispatch(setWindowSelection(windowList));
    }, [windowList, dispatch]);

    const handleAddWindow = () => {
        setWindowList(prev => [
            ...prev,
            {
                id: Date.now(),
                height: '',
                width: '',
                type: '',
                frameColor: '',
                tintColor: '',
                qty: 1,
                isOpen: true,
                errors: {}
            }
        ]);
    };

    const confirmRemoveWindow = (id) => {
        const confirm = window.confirm('Are you sure you want to remove this window?');
        if (confirm) {
            setWindowList(prev => prev.filter(w => w.id !== id));
            dispatch(removeCartItem(id));
        }
    };

    const handleChange = (id, key, value) => {
        setWindowList(prev =>
            prev.map(w =>
                w.id === id ? { ...w, [key]: value, errors: { ...w.errors, [key]: '' } } : w
            )
        );
    };

    const toggleAccordion = (id) => {
        setWindowList(prev =>
            prev.map(w => (w.id === id ? { ...w, isOpen: !w.isOpen } : w))
        );
    };

    const handleAddOrUpdate = async () => {
        const schema = yup.object().shape({
            height: yup.number().typeError('Height must be a number').required('Required').positive(),
            width: yup.number().typeError('Width must be a number').required('Required').positive(),
            type: yup.string().required('Type is required'),
            frameColor: yup.string().required('Frame Color is required'),
            tintColor: yup.string().required('Tint Color is required'),
            qty: yup.number().typeError('Quantity must be a number').required().min(1),
        });

        let allValid = true;
        const newList = await Promise.all(windowList.map(async win => {
            try {
                await schema.validate(win, { abortEarly: false });
                return { ...win, errors: {} };
            } catch (err) {
                allValid = false;
                const newErrors = {};
                err.inner.forEach(e => {
                    newErrors[e.path] = e.message;
                });
                return { ...win, errors: newErrors };
            }
        }));

        setWindowList(newList);
        if (!allValid) return toast.error('Please fix validation errors');

        const configWindows = newList.map(({ height, width, type, frameColor, tintColor, qty }) => ({
            height,
            width,
            type,
            frame_color: frameColor,
            tint_color: tintColor,
            qty
        }));

        const payload = {
            category_id: windowCategory.id,
            configuration: {
                windows: configWindows
            },
            configuration_meta: {
                fields
            },
            pricing_meta: windowCategory.pricing || {},
            adders: [],
            price: 5000
        };

        try {
            const response = isEditMode
                ? await editCartItemApi({ cartId, updatedData: payload }).unwrap()
                : await addToCartApi(payload).unwrap();

            if (response.success) {
                dispatch(addToCart(response.data.cart));
                toast.success(isEditMode ? 'Windows updated!' : 'Windows added to cart!');
                if (isEditMode) navigate('/cart-details');
            }
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to submit');
        }
    };

    if (isLoading) {
        return <p className="text-center mt-10 text-gray-500">Loading window data...</p>;
    }

    if (!windowCategory) {
        return <p className="text-center mt-10 text-red-500">Window category not found.</p>;
    }

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 hidden md:block">
                <BackBtn className="mb-3" link="/collection" />
                <CustomSlider items={sliderBanner} />
            </div>

            <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
                <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-center">
                        <IconHeading
                            className="lg:text-[16px] text-[12px]"
                            primaryIcon={orderSpec}
                            headingText="Order Specifications"
                            secondaryIcon={infoCircleIcon}
                        />
                        <PrimaryBtn className="bg-transparent px-[0px] py-[0px]" iconLeft={addmoreIcon} onClick={handleAddWindow}>
                            <span className="text-base-dark lg:text-[16px] text-[12px]">Add window</span>
                        </PrimaryBtn>
                    </div>

                    {windowList.length === 0 ? (
                        <p className="text-gray-500 italic mt-6">Please add a window to continue.</p>
                    ) : (
                        windowList.map((item, index) => (
                            <div key={item.id} className="border border-secondary rounded-large p-[15px] large mt-6">
                                <div className="flex justify-between items-center">
                                    <IconHeading primaryIcon={doorIcon} headingText={`Window ${index + 1}`} secondaryIcon={infoCircleIcon} />
                                    <div className="flex gap-4 items-center">
                                        <button onClick={() => confirmRemoveWindow(item.id)}>
                                            <Image img={deleteIcon} />
                                        </button>
                                        <VerticalSeparator className="h-10" />
                                        <PrimaryBtn className="bg-transparent px-2" onClick={() => toggleAccordion(item.id)}>
                                            <Image img={item.isOpen ? arrowUpIcon : arrowDownIcon} />
                                        </PrimaryBtn>
                                    </div>
                                </div>

                                {item.isOpen && (
                                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <Input
                                            label={getFieldLabel('height')}
                                            unit="sqf"
                                            value={item.height}
                                            onChange={(e) => handleChange(item.id, 'height', e.target.value)}
                                            error={item.errors.height}
                                        />
                                        <Input
                                            label={getFieldLabel('width')}
                                            unit="sqf"
                                            value={item.width}
                                            onChange={(e) => handleChange(item.id, 'width', e.target.value)}
                                            error={item.errors.width}
                                        />
                                        <Dropdown
                                            label={getFieldLabel('type')}
                                            options={windowTypeOptions}
                                            value={item.type}
                                            onChange={(val) => handleChange(item.id, 'type', val)}
                                            error={item.errors.type}
                                        />
                                        <Dropdown
                                            label={getFieldLabel('frame_color')}
                                            options={frameColorOptions}
                                            value={item.frameColor}
                                            onChange={(val) => handleChange(item.id, 'frameColor', val)}
                                            error={item.errors.frameColor}
                                        />
                                        <Input
                                            label={getFieldLabel('tint_color')}
                                            value={item.tintColor}
                                            onChange={(e) => handleChange(item.id, 'tintColor', e.target.value)}
                                            error={item.errors.tintColor}
                                        />
                                        <Counter
                                            label={getFieldLabel('qty')}
                                            value={item.qty}
                                            onChange={(val) => handleChange(item.id, 'qty', val)}
                                            min={1}
                                            max={100}
                                            error={item.errors.qty}
                                        />
                                    </div>
                                )}
                            </div>
                        ))
                    )}

                    <AddToCardWedget
                        totalPrice="5000"
                        onAddToCart={handleAddOrUpdate}
                        isLoading={isAdding}
                        isEditMode={isEditMode}
                    />
                </div>
            </div>
        </div>
    );
};

export default Windows;
