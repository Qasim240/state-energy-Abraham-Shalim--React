import React from 'react'

import OrderCardItem from '../../OrderCardItem'
import { allOrders } from '../../../../appdata'
import { Link } from 'react-router-dom'


const AllOrder = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {allOrders.map((order, index) => (
                <Link to="/single-invoice"><OrderCardItem key={index} {...order} /></Link>
            ))}
        </div>
    )
}

export default AllOrder
