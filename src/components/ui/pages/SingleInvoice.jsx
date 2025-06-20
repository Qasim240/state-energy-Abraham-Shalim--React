import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PriceCard from '../PriceCard';
import IconHeading from '../../utils/IconHeading';
import Image from '../../utils/Image';
import PrimaryBtn from '../PrimaryBtn';
import CartCard from '../../utils/CartCard';
import {
    downloadIcon, generalinfoIcon, infoCircleIcon,
    mosaicSmallLogo, solarSmallIcon, supportIcon
} from '../../../../imagesPath';
import { fontMedium } from '../../utils/fontMedium';

const SingleInvoice = () => {
    const { orderId } = useParams();
    const orders = useSelector(state => state.user.fetchedOrders || []);
    const order = orders.find(o => o.id === Number(orderId));

    if (!order) {
        return <p className="text-center mt-10 text-gray-500">Order not found.</p>;
    }

    const tableHeadingStyle = `text-base-50 text-[12px] mb-1 whitespace-nowrap ${fontMedium}`;
    const tableRowStyle = `text-base text-[14px] whitespace-nowrap ${fontMedium}`;

    return (
        <div className="grid md:grid-cols-12 grid-cols-1 lg:gap-5 h-screen md:overflow-hidden">
            <div className='md:col-span-8 pr-2'>
                <IconHeading primaryIcon={generalinfoIcon} headingText="General Information" secondaryIcon={infoCircleIcon} />

                <div className='mt-5'>
                    <div className="overflow-x-auto">
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
                                    <td className={`px-2 py-2 ${tableRowStyle}`}>-</td>
                                    <td className={`px-2 py-2 ${tableRowStyle}`}>{`${order.first_name} ${order.last_name}`}</td>
                                    <td className={`px-2 py-2 ${tableRowStyle}`}>N/A</td>
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
                                    <td className={`px-2 py-2 ${tableRowStyle}`}>{order.phone_number}</td>
                                    <td className={`px-2 py-2 ${tableRowStyle}`}>{order.city}, {order.zip_code}</td>
                                    <td className={`px-2 py-2 ${tableRowStyle}`}>{order.address}</td>
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
                            <p className={`${fontMedium} text-[18px] text-base-dark`}>${order.loan_financed_amount}</p>
                        </div>
                    </div>

                    <div className='mt-10'>
                        {order.order_items?.map((item, i) => (
                            <CartCard
                                key={i}
                                item={{
                                    id: item.id,
                                    title: item.category_name || 'Item',
                                    sqft: `${item.configuration?.square_footage || 'N/A'} sqf`,
                                    color: { name: item.configuration?.color, code: item.configuration?.color || '#C52F31' },
                                    adders: item.adders?.map(a => a.name).join(', '),
                                    price: parseFloat(item.total_price || 0),
                                    icon: solarSmallIcon
                                }}
                                showEdit={false}
                                showDelete={false}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="md:col-span-4 mt-6 md:mt-[55px]">
                <div className="sticky bottom-0">
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
    );
};

export default SingleInvoice;
