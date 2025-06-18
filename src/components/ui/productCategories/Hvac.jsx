import React, { useState, useEffect } from 'react';
import {
  categoryIcon,
  infoCircleIcon,
  orderSpec,
} from '../../../../imagesPath';
import Input from '../Input';
import IconHeading from '../../utils/IconHeading';
import AdderSelector from '../../utils/AdderSelector';
import AddToCardWedget from '../../utils/AddToCardWedget';
import CustomSlider from '../../utils/CustomSlider';
import BackBtn from '../../utils/BackBtn';
import { useSelector } from 'react-redux';

const Hvac = () => {
  const categories = useSelector(
    (state) => state.api.queries?.['getCategories(undefined)']?.data?.categories || []
    // (state) => state.api.queries?.['getCategories(undefined)']?.data?.data?.categories || []
  );

  const hvacData = categories.find((cat) => cat.name.toLowerCase() === 'hvac');

  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedAdders, setSelectedAdders] = useState([]);

  useEffect(() => {
    if (hvacData) {
      const defaultOption = hvacData.configuration.fields.find(f => f.name === 'category')?.options[0];
      setSelectedVariant(defaultOption || '');
    }
  }, [hvacData]);

  if (!hvacData) return <p className="text-center mt-10 text-gray-500">Loading HVAC Data...</p>;

  const { configuration, adders, detail_photo_url } = hvacData;
  const variantOptions = configuration.fields.find(f => f.name === 'category')?.options || [];

  const toggleAdder = (adder) =>
    setSelectedAdders((prev) =>
      prev.includes(adder) ? prev.filter((a) => a !== adder) : [...prev, adder]
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4 lg:block hidden">
        <BackBtn className='mb-3' link='/collection' />
        <CustomSlider items={[detail_photo_url]} />
      </div>

      <div className="col-span-12 lg:col-span-8 flex flex-col min-h-full mt-4 lg:mt-0">
        <div className="flex flex-col flex-grow">

          <IconHeading
            primaryIcon={categoryIcon}
            headingText="Choose Category"
            secondaryIcon={infoCircleIcon}
          />

          <div className="flex gap-4 flex-wrap my-8">
            {variantOptions.map((variant) => (
              <label
                key={variant}
                className={`px-5 py-2 text-nowrap text-center rounded-full font-Avenir font-medium border cursor-pointer transition
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

         

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Input
              type="text"
              unit="TON"
              label={configuration.fields.find(f => f.name === 'capacity')?.label || 'Capacity'}
              placeholder="eg 2.5"
            />
          </div>

          <div className='mb-4'>
            <IconHeading headingText="Adders" secondaryIcon={infoCircleIcon} />
          <AdderSelector
            adders={adders.map(a => a.name)}
            selectedAdders={selectedAdders}
            toggleAdder={toggleAdder}
          />
          </div>

          <AddToCardWedget totalPrice="200" />
        </div>
      </div>
    </div>
  );
};

export default Hvac;
