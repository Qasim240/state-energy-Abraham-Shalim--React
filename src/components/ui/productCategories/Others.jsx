import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from '../../utils/Image';
import IconHeading from '../../utils/IconHeading';
import Input from '../Input';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';
import { infoCircleIcon, orderSpec } from '../../../../imagesPath';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';

const Others = () => {
    const categories = useSelector(
        (state) =>
            state.api.queries?.['getCategories(undefined)']?.data?.data?.categories || []
    );

    const otherCategory = categories.find((cat) => cat.name.toLowerCase() === 'other');

    const sliderBanners = otherCategory?.detail_photo_url
        ? [otherCategory.detail_photo_url]
        : [];

    const adders = otherCategory?.adders?.map((a) => a.name) || [];

    const [feedback, setFeedback] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [selectedAdders, setSelectedAdders] = useState([]);

    const toggleAdder = (adder) => {
        setSelectedAdders((prev) =>
            prev.includes(adder)
                ? prev.filter((a) => a !== adder)
                : [...prev, adder]
        );
    };

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 hidden md:block">
                <BackBtn className="mb-3" link="/collection" />
                <CustomSlider items={sliderBanners} />
            </div>

            <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
                <div className="flex flex-col flex-grow">
                    <IconHeading
                        className="lg:text-[16px] text-[12px]"
                        primaryIcon={orderSpec}
                        headingText="Order Specifications"
                        secondaryIcon={infoCircleIcon}
                    />
                    <form>
                        <div className="grid grid-cols-1 gap-4 mt-10">
                            <div>
                                <Input
                                    label="Feedback"
                                    type="textarea"
                                    rows={6}
                                    maxLength={300}
                                    className="h-40 w-full p-4"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-4 mt-10">
                            <div>
                                <Input
                                    label="Total Price"
                                    type="number"
                                    placeholder="eg 200.00"
                                    unit="$"
                                    value={totalPrice}
                                    onChange={(e) => setTotalPrice(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>

                    {adders.length > 0 && (
                        <>
                            <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
                            <AdderSelector
                                adders={adders}
                                selectedAdders={selectedAdders}
                                toggleAdder={toggleAdder}
                            />
                        </>
                    )}
                </div>

                <AddToCardWedget totalPrice={totalPrice || '0'} />
            </div>
        </div>
    );
};

export default Others;
