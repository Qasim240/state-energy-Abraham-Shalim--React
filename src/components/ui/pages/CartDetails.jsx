import React, { useEffect } from 'react';
import PrimaryBtn from '../PrimaryBtn';
import CartCard from '../../utils/CartCard';
import { downloadIcon } from '../../../../imagesPath';
import PriceCard from '../PriceCard';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { transformCartItem } from '../../utils/transformCartItem';
import CartLoader from '../../utils/CartLoader.jsx';

import {
    useGetCartQuery,
    useDeleteCartItemMutation,
    useClearCartApiMutation,
} from '../../../features/api/apiSlice';

import {
    setCart,
    removeCartItem,
    clearCart,
} from '../../../features/slices/userSlice.js';

import { fontMedium } from '../../utils/fontMedium';
import LongBarSkeltion from '../../utils/longBarSkeltion.jsx';

const CartDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { data, isLoading, isError, refetch } = useGetCartQuery();

    const [deleteCartItem] = useDeleteCartItemMutation();
    const [clearCartApi] = useClearCartApiMutation();

    const items = useSelector((state) => state.user.cart);

    useEffect(() => {
        if (data?.data?.cart) {
            dispatch(setCart(data.data.cart));
        }
    }, [data, dispatch]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        dispatch(removeCartItem(id));
        try {
            await deleteCartItem(id).unwrap();
            toast.success('Item removed.');
        } catch {
            toast.error('Failed to delete. Syncing back.');
            refetch();
        }
    };

    const handleClearAll = async () => {
        if (!window.confirm('Clear all items?')) return;
        dispatch(clearCart());
        try {
            const res = await clearCartApi().unwrap();
            if (res?.success === false) return toast.warn(res.message);
            toast.success('Cart cleared.');
        } catch {
            toast.error('Clear failed. Refetching.');
            refetch();
        }
    };

    const transformedItems = items.map((item) =>
        transformCartItem(item)
    );

    const isEditPage = location.pathname.includes('/collection/') && location.pathname.split('/').length === 4;

    return (
        <div className="grid md:grid-cols-12 grid-cols-1 lg:gap-5 h-screen md:overflow-hidden">
            <div className="md:col-span-8 pr-2">
                <div className="px-0 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">




                            {
                                isLoading ?
                                    <div role="status" class="max-w-sm animate-pulse">
                                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4"></div>
                                    </div> :
                                    <>
                                        <span className={`text-[14px] text-base-50  ${fontMedium}`}>All Items</span>
                                        <span className="bg-base rounded-md h-[20px] w-[24px] flex justify-center items-center text-[12px] bg-base-dark text-white font-Avenir font-extrabold">
                                            {transformedItems.length}
                                        </span>
                                    </>
                            }










                        </div>
                        <PrimaryBtn onClick={handleClearAll} className="bg-transparent px-[0] py-[0]">
                            <span className="text-base-red underline text-[14px]">Clear all</span>
                        </PrimaryBtn>
                    </div>

                    {isEditPage && (
                        <div className="bg-yellow-100 text-yellow-800 rounded-md px-3 py-2 mt-4 text-sm font-semibold">
                            ✏️ You are editing an existing cart item.
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <CartLoader count={items?.length || 3} />
                ) : isError ? (
                    <p className="text-center text-red-500 mt-8">Failed to load cart.</p>
                ) : transformedItems.length === 0 ? (
                    <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
                ) : (
                    transformedItems.map((item) => (
                        <CartCard
                            key={item.id}
                            item={item}
                            onDelete={() => handleDelete(item.id)}
                            onEdit={() =>
                                navigate(`/collection/${item.title.toLowerCase()}/${item.id}`)
                            }
                        />

                    ))
                )}
            </div>

            <div className="md:col-span-4 mt-6 md:mt-[55px]">
                <div className="sticky bottom-0">
                    <PriceCard />
                    <Link to="/user-info">
                        <PrimaryBtn className="w-full mt-4">
                            <span className="mx-auto">Continue</span>
                        </PrimaryBtn>
                    </Link>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <PrimaryBtn className="px-[0] py-[0] bg-transparent" iconLeft={downloadIcon}>
                            <span className="text-base-dark underline font-Avenir font-medium">Download this order</span>
                        </PrimaryBtn>
                        <span className={`bg-[#C52F311A] text-base-red py-[5px] px-[10px] rounded-[5px] text-[14px] ${fontMedium}`}>
                            PDF
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetails;
