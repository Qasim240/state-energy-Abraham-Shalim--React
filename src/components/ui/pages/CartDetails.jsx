import React from 'react'
import PrimaryBtn from '../PrimaryBtn'
import Image from '../../utils/Image'
import { deleteIcon, editicon, roofSmallIcon, solarSmallIcon } from '../../../../imagesPath'
import { fontMedium } from '../../utils/fontMedium'
import VerticalSeparator from '../../utils/VerticalSeparator'
import CartCard from '../../utils/CartCard'

const CartDetails = () => {



    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className='col-span-8'>
                    <CartCard
                        item={{
                            id: '001234124',
                            title: 'Roof',
                            type: 'Shingle',
                            sqft: '2000 sqf',
                            color: { name: 'Red', code: '#C52F31' },
                            adders: 'Fascia',
                            price: 200,
                            icon: roofSmallIcon,
                        }}
                    />

                   

                </div>

                <div className='col-span-4'>
                    {/* Optional: Sidebar or Summary Section */}
                    2
                </div>
            </div>
        </>
    )
}

export default CartDetails
