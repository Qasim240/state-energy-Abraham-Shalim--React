import React from 'react';
import { calcicon } from '../../../imagesPath';
import PrimaryBtn from '../ui/PrimaryBtn';
import Image from './Image';

const AddToCardWedget = ({ totalPrice, className = '', onAddToCart, isLoading = false }) => {
    return (
        <div className={`mt-auto border mb-4 bg-[#F1F6FF] rounded-large border-primary large p-4 flex lg:justify-between justify-center items-center flex-wrap gap-4 ${className}`}>
            <div className='flex items-center gap-4'>
                <Image img={calcicon} />
                <div>
                    <p className='text-primary font-Avenir font-medium'>Estimated Price</p>
                    <p className='font-Avenir font-normal text-base-dark text-[14px]'>
                        The price may vary based on the current rate.
                    </p>
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <span className='font-Avenir font-extrabold text-[32px] flex items-baseline gap-2'>
                    <span className='font-Avenir font-medium text-gray-500 text-[20px]'>$</span>{totalPrice}
                </span>

                <PrimaryBtn
                    className='md:px-10 px-8'
                    onClick={onAddToCart}
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add to Cart'}
                </PrimaryBtn>
            </div>
        </div>
    );
};

export default AddToCardWedget;