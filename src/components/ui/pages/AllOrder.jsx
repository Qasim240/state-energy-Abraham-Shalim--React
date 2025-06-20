import React from 'react';
import { useGetOrdersQuery } from '../../../features/api/apiSlice';
import OrderCardItem from '../../OrderCardItem';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFetchedOrders } from '../../../features/slices/userSlice.js';

const AllOrder = () => {
    const { data, isLoading, isError } = useGetOrdersQuery();
    const dispatch = useDispatch();

    if (isLoading) return <p className='text-center mt-10'>Loading orders...</p>;
    if (isError) return <p className='text-center mt-10 text-red-500'>Failed to fetch orders.</p>;

    const orders = data?.data?.order || [];

    // Store in Redux
    dispatch(setFetchedOrders(orders));

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {orders.map((order) => (
                <Link to={`/invoice/${order.id}`} key={order.id}>
                    <OrderCardItem
                        orderNo={order.id}
                        orderDate={new Date(order.created_at).toLocaleDateString()}
                        customerName={`${order.first_name} ${order.last_name}`}
                        utilityBill={order.monthly_utility_bill}
                        insuranceBill={order.monthly_insurance_bill}
                        itemCount={order.order_items?.length || 0}
                        amount={parseFloat(order.total_amount || 0)}
                        completed={order.status === 'completed'}
                        showIcon={true}
                    />
                </Link>
            ))}
        </div>
    );
};

export default AllOrder;
