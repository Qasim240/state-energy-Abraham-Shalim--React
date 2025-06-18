import React, { useState, useEffect } from 'react';
import {
    categoryIcon,
    infoCircleIcon,
    orderSpec
} from '../../../../imagesPath';
import Input from '../Input';
import IconHeading from '../../utils/IconHeading';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from '../Dropdown';
import { setRoofSelection } from '../../../features/slices/userSlice.js';
import { addToCart } from '../../../features/slices/userSlice.js';
import RoofSkeleton from '../../utils/RoofSkeleton.jsx';

const Roof = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.user.categories);
    const savedRoof = useSelector((state) => state.user.roofSelection || {});
    const roofData = categories.find((cat) => cat.name.toLowerCase() === 'roof');

    const [selectedVariant, setSelectedVariant] = useState(savedRoof.variant || '');
    const [selectedAdders, setSelectedAdders] = useState(savedRoof.adders || []);
    const [squareFootage, setSquareFootage] = useState(savedRoof.squareFootage || '');
    const [color, setColor] = useState(savedRoof.color || '');

    useEffect(() => {
        if (roofData && !savedRoof.variant) {
            const defaultCategory = roofData.configuration.fields.find(f => f.name === 'category')?.options[0];
            setSelectedVariant(defaultCategory || '');
        }
    }, [roofData, savedRoof.variant]);

    useEffect(() => {
        dispatch(setRoofSelection({
            variant: selectedVariant,
            squareFootage,
            color,
            adders: selectedAdders
        }));
    }, [selectedVariant, squareFootage, color, selectedAdders, dispatch]);

    if (!roofData) return <RoofSkeleton />;

    const { configuration, pricing, adders, detail_photo_url } = roofData;

    const categoryOptions = configuration.fields.find(f => f.name === 'category')?.options || [];
    const colorOptions = configuration.fields.find(f => f.name === 'color')?.options || [];

    const toggleAdder = (adderName) => {
        setSelectedAdders((prev) =>
            prev.includes(adderName)
                ? prev.filter((a) => a !== adderName)
                : [...prev, adderName]
        );
    };

    const fieldMap = Object.fromEntries(
        (roofData?.configuration?.fields || []).map((f) => [f.name, f])
    );

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 hidden md:block">
                <BackBtn className='mb-3' link='/collection' />
                <CustomSlider items={detail_photo_url ? [detail_photo_url] : []} />
            </div>

            <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
                <div className='flex flex-col flex-grow'>
                    <IconHeading
                        primaryIcon={categoryIcon}
                        headingText={fieldMap.category?.label}
                        secondaryIcon={infoCircleIcon}
                    />
                    <div className="flex gap-4 flex-wrap my-8">
                        {categoryOptions.map((variant) => (
                            <label
                                key={variant}
                                className={`px-5 py-2 w-[100px] text-center rounded-full font-Avenir font-medium border cursor-pointer transition
                                    ${selectedVariant === variant
                                        ? 'bg-base-dark text-white border-base'
                                        : 'bg-white text-black border-gray-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="variant"
                                    value={variant}
                                    className="hidden"
                                    checked={selectedVariant === variant}
                                    onChange={() => setSelectedVariant(variant)}
                                />
                                {variant}
                            </label>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-12 gap-4 mt-6">
                        <div className="col-span-6">
                            <Input
                                type="number"
                                label={fieldMap.square_footage?.label}
                                placeholder="2000"
                                value={squareFootage}
                                onChange={(e) => setSquareFootage(e.target.value)}
                            />
                        </div>
                        <div className="col-span-6">
                            <Dropdown
                                label={fieldMap.color?.label}
                                options={colorOptions}
                                value={color}
                                onChange={(val) => setColor(val)}
                            />
                        </div>
                    </div>

                    <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
                    <AdderSelector
                        adders={adders.map((a) => a.name)}
                        selectedAdders={selectedAdders}
                        toggleAdder={toggleAdder}
                    />
                </div>

                <AddToCardWedget
                    totalPrice="200"
                    onAddToCart={() => {
                        dispatch(addToCart({
                            id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                            category: 'Roof',
                            variant: selectedVariant,
                            squareFootage,
                            color,
                            adders: selectedAdders
                        }));
                    }}
                />
            </div>
        </div>
    );
};

export default Roof;
