import React, { useState } from 'react';
import PrimaryBtn from '../PrimaryBtn';
import { fontMedium } from '../../utils/fontMedium';
import CartCard from '../../utils/CartCard';
import { downloadIcon, roofSmallIcon, solarSmallIcon } from '../../../../imagesPath';
import PriceCard from '../PriceCard';
import { Link } from 'react-router-dom';
import BackBtn from '../../utils/BackBtn'
import { clearCart, removeCartItem } from '../../../features/slices/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const CartDetails = () => {


    const dispatch = useDispatch();
    const items = useSelector((state) => state.user.cart);


    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            dispatch(removeCartItem(id));

        }
    };


    const handleClearAll = () => {
        const confirmClear = window.confirm('Are you sure you want to clear all items?');
        if (confirmClear) {
            dispatch(clearCart());
        }
    };



    return (
        <div className="grid md:grid-cols-12 grid-cols-1 lg:gap-5 h-screen md:overflow-hidden">
            <div className='md:col-span-8  pr-2'>
                <BackBtn className='mb-3' link='/collection' />

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
