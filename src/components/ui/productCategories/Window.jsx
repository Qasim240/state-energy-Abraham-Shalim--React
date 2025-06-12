
import React, { useState } from 'react'
import CustomSlider from '../../utils/CustomSlider'
import IconHeading from '../../utils/IconHeading'
import PrimaryBtn from '../PrimaryBtn'
import Image from '../../utils/Image'
import Input from '../Input'
import Dropdown from '../Dropdown'
import Counter from '../../utils/Counter'
import AddToCardWedget from '../../utils/AddToCardWedget'
import { addmoreIcon, arrowUpIcon, deleteIcon, doorIcon, hvac, infoCircleIcon, orderSpec, windowBanner, windowSliderbanner } from '../../../../imagesPath'
import VerticalSeparator from '../../utils/VerticalSeparator'

const Window = () => {

    const windowTypeOptions = ['French', 'Sliding', 'Glass', 'Flush window'];
    const colorOptions = ['White', 'Black', 'Green', 'Brown'];
    const sliderbanner = [windowSliderbanner, windowSliderbanner, windowSliderbanner];

    const [window, setWindow] = useState([
        { id: Date.now(), height: '', width: '', type: '', frameColor: '', tintColor: '', qty: 0, isOpen: true }
    ]);

    const handleAddWindow = () => {
        setWindow(prev => [
            ...prev,
            {
                id: Date.now(),
                height: '',
                width: '',
                type: '',
                frameColor: '',
                tintColor: '',
                qty: 0,
                isOpen: true
            }
        ]);
    };

    const handleRemoveWindow = (id) => {
        setWindow(prev => prev.filter(window => window.id !== id));
    };

    const handleChange = (id, key, value) => {
        setWindow(prev =>
            prev.map(window =>
                window.id === id ? { ...window, [key]: value } : window
            )
        );
    };

    const toggleAccordion = (id) => {
        setWindow(prev =>
            prev.map(window =>
                window.id === id ? { ...window, isOpen: !window.isOpen } : window
            )
        );
    };


    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 hidden md:block">
                <CustomSlider items={sliderbanner} />
            </div>


            <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
                <div className='flex flex-col flex-grow'>
                    <div className='flex justify-between items-center'>
                        <IconHeading className='lg:text-[16px] text-[12px]' primaryIcon={orderSpec} headingText="Order Specifications" secondaryIcon={infoCircleIcon} />
                        <PrimaryBtn className='bg-transparent px-[0px] py-[0px]' iconLeft={addmoreIcon} onClick={handleAddWindow}>
                            <span className='text-base-dark lg:text-[16px] text-[12px]'>Add window</span>
                        </PrimaryBtn>
                    </div>

                    {window.map((window, index) => (
                        <div key={window.id} className="border border-secondary rounded-large p-[15px] large mt-6">
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <IconHeading
                                    primaryIcon={doorIcon}
                                    headingText={`window ${index + 1}`}
                                    secondaryIcon={infoCircleIcon}
                                />
                                <div className="flex gap-4 items-center">
                                    <button onClick={() => handleRemoveWindow(window.id)}>
                                        <Image img={deleteIcon} />
                                    </button>
                                    <VerticalSeparator className="h-10" />
                                    <PrimaryBtn
                                        className="bg-transparent px-2"
                                        onClick={() => toggleAccordion(window.id)}
                                    >
                                        <Image img={window.isOpen ? arrowUpIcon : arrowDownIcon} />
                                    </PrimaryBtn>
                                </div>
                            </div>

                            {/* Body */}
                            {window.isOpen && (
                                <div className="mt-5">
                                    <form>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div>
                                                <Input
                                                    label="Height"
                                                    unit="sqf"
                                                    value={window.height}
                                                    onChange={(e) => handleChange(window.id, 'height', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    label="Width"
                                                    unit="sqf"
                                                    value={window.width}
                                                    onChange={(e) => handleChange(window.id, 'width', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Dropdown
                                                    label="Type"
                                                    options={windowTypeOptions}
                                                    value={window.type}
                                                    onChange={(val) => handleChange(window.id, 'type', val)}
                                                />
                                            </div>
                                            <div>
                                                <Dropdown
                                                    label="Frame Color"
                                                    options={colorOptions}
                                                    value={window.frameColor}
                                                    onChange={(val) => handleChange(window.id, 'frameColor', val)}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    label="Tint Color"
                                                    value={window.tintColor}
                                                    onChange={(e) => handleChange(window.id, 'tintColor', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Counter
                                                    value={window.qty}
                                                    onChange={(val) => handleChange(window.id, 'qty', val)}
                                                    min={0}
                                                    max={100}
                                                />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            )}
                        </div>
                    ))}

                    <AddToCardWedget className='sticky bottom-0' totalPrice="5000" />

                </div>


            </div>
        </div>
    )
}

export default Window