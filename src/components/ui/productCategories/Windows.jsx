import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import CustomSlider from '../../utils/CustomSlider';
import IconHeading from '../../utils/IconHeading';
import PrimaryBtn from '../PrimaryBtn';
import Image from '../../utils/Image';
import Input from '../Input';
import Dropdown from '../Dropdown';
import Counter from '../../utils/Counter';
import AddToCardWedget from '../../utils/AddToCardWedget';

import {
    addmoreIcon,
    arrowUpIcon,
    arrowDownIcon,
    deleteIcon,
    doorIcon,
    infoCircleIcon,
    orderSpec,
} from '../../../../imagesPath';
import VerticalSeparator from '../../utils/VerticalSeparator';
import BackBtn from '../../utils/BackBtn';

const Windows = () => {
    const categories = useSelector(
        (state) =>
            //   state.api.queries?.['getCategories(undefined)']?.data?.data?.categories || []
            state.api.queries?.['getCategories(undefined)']?.data?.categories || []
    );

    const windowCategory = categories.find((cat) => cat.name.toLowerCase() === 'window');

    const windowTypeOptions =
        windowCategory?.configuration?.fields?.find((f) => f.name === 'type')?.options || [];

    const frameColorOptions =
        windowCategory?.configuration?.fields?.find((f) => f.name === 'frameColor')?.options || [];

    const sliderbanner = windowCategory?.detail_photo_url
        ? [windowCategory.detail_photo_url]
        : [];

    const [window, setWindow] = useState([
        {
            id: Date.now(),
            height: '',
            width: '',
            type: '',
            frameColor: '',
            tintColor: '',
            qty: 0,
            isOpen: true,
        },
    ]);

    const handleAddWindow = () => {
        setWindow((prev) => [
            ...prev,
            {
                id: Date.now(),
                height: '',
                width: '',
                type: '',
                frameColor: '',
                tintColor: '',
                qty: 0,
                isOpen: true,
            },
        ]);
    };

    const handleRemoveWindow = (id) => {
        setWindow((prev) => prev.filter((w) => w.id !== id));
    };

    const handleChange = (id, key, value) => {
        setWindow((prev) =>
            prev.map((w) => (w.id === id ? { ...w, [key]: value } : w))
        );
    };

    const toggleAccordion = (id) => {
        setWindow((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isOpen: !w.isOpen } : w))
        );
    };

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 hidden md:block">
                <BackBtn className="mb-3" link="/collection" />
                <CustomSlider items={sliderbanner} />
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
                        <PrimaryBtn
                            className="bg-transparent px-[0px] py-[0px]"
                            iconLeft={addmoreIcon}
                            onClick={handleAddWindow}
                        >
                            <span className="text-base-dark lg:text-[16px] text-[12px]">
                                Add window
                            </span>
                        </PrimaryBtn>
                    </div>

                    {window.map((item, index) => (
                        <div
                            key={item.id}
                            className="border border-secondary rounded-large p-[15px] large mt-6"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <IconHeading
                                    primaryIcon={doorIcon}
                                    headingText={`window ${index + 1}`}
                                    secondaryIcon={infoCircleIcon}
                                />
                                <div className="flex gap-4 items-center">
                                    <button onClick={() => handleRemoveWindow(item.id)}>
                                        <Image img={deleteIcon} />
                                    </button>
                                    <VerticalSeparator className="h-10" />
                                    <PrimaryBtn
                                        className="bg-transparent px-2"
                                        onClick={() => toggleAccordion(item.id)}
                                    >
                                        <Image img={item.isOpen ? arrowUpIcon : arrowDownIcon} />
                                    </PrimaryBtn>
                                </div>
                            </div>

                            {/* Body */}
                            {item.isOpen && (
                                <div className="mt-5">
                                    <form>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <Input
                                                label="Height"
                                                unit="sqf"
                                                value={item.height}
                                                onChange={(e) =>
                                                    handleChange(item.id, 'height', e.target.value)
                                                }
                                            />
                                            <Input
                                                label="Width"
                                                unit="sqf"
                                                value={item.width}
                                                onChange={(e) =>
                                                    handleChange(item.id, 'width', e.target.value)
                                                }
                                            />
                                            <Dropdown
                                                label="Type"
                                                options={windowTypeOptions}
                                                value={item.type}
                                                onChange={(val) => handleChange(item.id, 'type', val)}
                                            />
                                            <Dropdown
                                                label="Frame Color"
                                                options={frameColorOptions}
                                                value={item.frameColor}
                                                onChange={(val) =>
                                                    handleChange(item.id, 'frameColor', val)
                                                }
                                            />
                                            <Input
                                                label="Tint Color"
                                                value={item.tintColor}
                                                onChange={(e) =>
                                                    handleChange(item.id, 'tintColor', e.target.value)
                                                }
                                            />
                                            <Counter
                                                value={item.qty}
                                                onChange={(val) => handleChange(item.id, 'qty', val)}
                                                min={0}
                                                max={100}
                                            />
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    ))}

                    <AddToCardWedget className="sticky bottom-0" totalPrice="5000" />
                </div>
            </div>
        </div>
    );
};

export default Windows;
