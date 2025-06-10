import React, { useState } from 'react';
import IconHeading from '../../utils/IconHeading';
import { arrowUpIcon, arrowDownIcon, deleteIcon, doorIcon, infoCircleIcon, orderSpec, addmoreIcon, hvac } from '../../../../imagesPath';
import Image from '../../utils/Image';
import VerticalSeparator from '../../utils/VerticalSeparator';
import PrimaryBtn from '../PrimaryBtn';
import Input from '../Input';
import Dropdown from '../Dropdown';
import Counter from '../../utils/Counter';
import AddToCardWedget from '../../utils/AddToCardWedget';



const doorTypeOptions = ['French', 'Sliding', 'Glass', 'Flush doors'];
const colorOptions = ['White', 'Black', 'Green', 'Brown'];

const Doors = () => {
    const [doors, setDoors] = useState([
        { id: Date.now(), height: '', width: '', type: '', frameColor: '', tintColor: '', qty: 0, isOpen: true }
    ]);

    const handleAddDoor = () => {
        setDoors(prev => [
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

    const handleRemoveDoor = (id) => {
        setDoors(prev => prev.filter(door => door.id !== id));
    };

    const handleChange = (id, key, value) => {
        setDoors(prev =>
            prev.map(door =>
                door.id === id ? { ...door, [key]: value } : door
            )
        );
    };

    const toggleAccordion = (id) => {
        setDoors(prev =>
            prev.map(door =>
                door.id === id ? { ...door, isOpen: !door.isOpen } : door
            )
        );
    };

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 hidden md:block">
                <Image className="w-[100%]" img={hvac} />
            </div>


            <div className="col-span-12 md:col-span-8 flex flex-col min-h-full mt-4">
                <div className='flex flex-col flex-grow'>
                    <div className='flex justify-between items-center'>
                        <IconHeading className='lg:text-[16px] text-[12px]' primaryIcon={orderSpec} headingText="Order Specifications" secondaryIcon={infoCircleIcon} />
                        <PrimaryBtn className='bg-transparent px-0 py-0' iconLeft={addmoreIcon} onClick={handleAddDoor}>
                            <span className='text-base-dark lg:text-[16px] text-[12px]'>Add Door</span>
                        </PrimaryBtn>
                    </div>

                    {doors.map((door, index) => (
                        <div key={door.id} className="border border-secondary rounded-large p-[15px] large mt-6">
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <IconHeading
                                    primaryIcon={doorIcon}
                                    headingText={`Door ${index + 1}`}
                                    secondaryIcon={infoCircleIcon}
                                />
                                <div className="flex gap-4 items-center">
                                    <button onClick={() => handleRemoveDoor(door.id)}>
                                        <Image img={deleteIcon} />
                                    </button>
                                    <VerticalSeparator className="h-10" />
                                    <PrimaryBtn
                                        className="bg-transparent px-2"
                                        onClick={() => toggleAccordion(door.id)}
                                    >
                                        <Image img={door.isOpen ? arrowUpIcon : arrowDownIcon} />
                                    </PrimaryBtn>
                                </div>
                            </div>

                            {/* Body */}
                            {door.isOpen && (
                                <div className="mt-5">
                                    <form>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div>
                                                <Input
                                                    label="Height"
                                                    unit="sqf"
                                                    value={door.height}
                                                    onChange={(e) => handleChange(door.id, 'height', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    label="Width"
                                                    unit="sqf"
                                                    value={door.width}
                                                    onChange={(e) => handleChange(door.id, 'width', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Dropdown
                                                    label="Type"
                                                    options={doorTypeOptions}
                                                    value={door.type}
                                                    onChange={(val) => handleChange(door.id, 'type', val)}
                                                />
                                            </div>
                                            <div>
                                                <Dropdown
                                                    label="Frame Color"
                                                    options={colorOptions}
                                                    value={door.frameColor}
                                                    onChange={(val) => handleChange(door.id, 'frameColor', val)}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    label="Tint Color"
                                                    value={door.tintColor}
                                                    onChange={(e) => handleChange(door.id, 'tintColor', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Counter
                                                    value={door.qty}
                                                    onChange={(val) => handleChange(door.id, 'qty', val)}
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
    );
};

export default Doors;
