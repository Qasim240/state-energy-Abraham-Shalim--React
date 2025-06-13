import React, { useState } from 'react';
import PrimaryBtn from '../PrimaryBtn';
import { fontMedium } from '../../utils/fontMedium';
import CartCard from '../../utils/CartCard';
import { downloadIcon, roofSmallIcon, solarSmallIcon } from '../../../../imagesPath';
import PriceCard from '../PriceCard';
import { Link } from 'react-router-dom';

const CartDetails = () => {
    const [items, setItems] = useState([
        {
            id: '001234124',
            title: 'Roof',
            type: 'Shingle',
            sqft: '2000 sqf',
            color: { name: 'Red', code: '#C52F31' },
            adders: 'Fascia',
            price: 200,
            icon: roofSmallIcon,
        },
        {
            id: '001234125',
            title: 'Solar',
            Panl: "5",
            systemKW: '6.5 KW',
            battery: 'Tesla Powerwall',
            adders: 'Smart Meter, EV Charger',
            price: 25000,
            icon: solarSmallIcon,
        },
    ]);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            setItems(prev => prev.filter(item => item.id !== id));
        }
    };


    const handleClearAll = () => {
        const confirmClear = window.confirm('Are you sure you want to clear all items?');
        if (confirmClear) {
            setItems([]);
        }
    };



    return (
        <div className="grid md:grid-cols-12 grid-cols-1 lg:gap-5 h-screen md:overflow-hidden">
            <div className='md:col-span-8  pr-2'>
                <div className='px-0 py-4'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-3'>
                            <span className={`text-[14px] text-base-50 ${fontMedium}`}>All Items</span>
                            <span className='bg-base rounded-full h-[24px] w-[24px] flex justify-center items-center text-[12px] bg-base-dark text-white font-Avenir font-extrabold'>
                                {items.length}
                            </span>
                        </div>
                        <PrimaryBtn onClick={handleClearAll} className='bg-transparent px-[0] py-[0]'>
                            <span className='text-base-red underline text-[14px]'>Clear all</span>
                        </PrimaryBtn>
                    </div>
                </div>

                {items.map(item => (
                    <CartCard key={item.id} item={item} onDelete={() => handleDelete(item.id)} />
                ))}
            </div>
            <div className="md:col-span-4 mt-6 md:mt-[55px]">
                <div className="sticky botto-0">

                    <PriceCard />

                    <Link to='/user-info'>
                        <PrimaryBtn className='w-full mt-4 '>
                            <span className='mx-auto'>Continue</span>
                        </PrimaryBtn>
                    </Link>
                    <div className='flex items-center justify-center gap-4 mt-4'>

                        <PrimaryBtn className='px-[0] py-[0] bg-transparent' iconLeft={downloadIcon}>
                            <span className='text-base-dark underline font-Avenir font-medium'>Download this order</span>
                        </PrimaryBtn>
                        <span className={`bg-[#C52F311A] text-base-red py-[5px] px-[10px] rounded-[5px] text-[14px] ${fontMedium}`}>PDF</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetails;
