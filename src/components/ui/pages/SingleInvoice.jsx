import React, { useState } from 'react'
import PrimaryBtn from '../PrimaryBtn'
import PriceCard from '../PriceCard'
import IconHeading from '../../utils/IconHeading'
import { downloadIcon, generalinfoIcon, infoCircleIcon, mosaicSmallLogo, roofSmallIcon, solarSmallIcon, supportIcon } from '../../../../imagesPath'
import { fontMedium } from '../../utils/fontMedium'
import Image from '../../utils/Image'
import CartCard from '../../utils/CartCard'

const SingleInvoice = () => {

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
    ]);




    const tableHeadingStyle = `text-base-50 text-[12px] mb-1 whitespace-nowrap ${fontMedium}`;
    const tableRowStyle = `text-base text-[14px] whitespace-nowrap ${fontMedium}`;
    return (
        <div className="grid md:grid-cols-12 grid-cols-1 lg:gap-5 h-screen md:overflow-hidden">
            <div className='md:col-span-8  pr-2'>
                <IconHeading primaryIcon={generalinfoIcon} headingText="General Information" secondaryIcon={infoCircleIcon} />
                <div className='mt-5'>
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full table-auto pt-3">
                            <thead>
                                <tr>
                                    <th className={`text-left px-2 py-2 ${tableHeadingStyle}`}>Order Date</th>
                                    <th className={`text-left px-2 py-2 ${tableHeadingStyle}`}>Customer Name</th>
                                    <th className={`text-left px-2 py-2 ${tableHeadingStyle}`}>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={`px-2 py-2 ${tableRowStyle}`}>12 Dec, 2023</td>
                                    <td className={`px-2 py-2 ${tableRowStyle}`}>Ben W.</td>
                                    <td className={`px-2 py-2 ${tableRowStyle}`}>superman@mystateenergy.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full table-auto pt-3">
                            <thead>
                                <tr>
                                    <th className={`text-left px-2 py-2 ${tableHeadingStyle}`}>Phone No.</th>
                                    <th className={`text-left px-2 py-2 ${tableHeadingStyle}`}>City, Zip-code</th>
                                    <th className={`text-left px-2 py-2 ${tableHeadingStyle}`}>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={`px-2 py-2 ${tableRowStyle}`}>(+1) 484 569 4456</td>
                                    <td className={`px-2 py-2 ${tableRowStyle}`}>New York, 10001</td>
                                    <td className={`px-2 py-2 ${tableRowStyle}`}>House 241, Street 9, NY.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr className='my-5' />

                    <IconHeading className='mb-5' primaryIcon={supportIcon} headingText="Loan Finance" secondaryIcon={infoCircleIcon} />
                    <div className='flex items-center gap-3'>
                        <Image img={mosaicSmallLogo} />
                        <div>
                            <span className={`${fontMedium} text-[13px] text-base-50`}>Monthly Payment</span>
                            <p className={`${fontMedium} text-[18px] text-base-dark`}>$130.00</p>
                        </div>
                    </div>


                    <div className='mt-10'>
                        {items.map(item => (
                            <CartCard key={item.id} item={item} showEdit={false} showDelete={false} />
                        ))}
                    </div>
                </div>

            </div>
            <div className="md:col-span-4 mt-6 md:mt-[55px]">
                <div className="sticky botto-0">
                    <PriceCard />

                    <div className='flex items-center justify-center gap-4 mt-4'>

                        <PrimaryBtn className='px-[0] py-[0] bg-transparent' iconLeft={downloadIcon}>
                            <span className='text-base-dark underline font-Avenir font-medium'>Download this order</span>
                        </PrimaryBtn>
                        <span className={`bg-[#C52F311A] text-base-red py-[5px] px-[10px] rounded-[5px] text-[14px] ${fontMedium}`}>PDF</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleInvoice