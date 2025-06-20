import React from 'react';
import PrimaryBtn from '../PrimaryBtn';
import Input from '../Input';
import PriceCard from '../PriceCard';
import IconHeading from '../../utils/IconHeading';
import { downloadIcon, generalinfoIcon, infoCircleIcon } from '../../../../imagesPath';
import { Link } from 'react-router-dom';
import { fontMedium } from '../../utils/fontMedium';
import { useSelector } from 'react-redux';
import { useGetCrmContactQuery } from '../../../features/api/apiSlice';

const AddUSerInfo = () => {



    const contactId = useSelector(state => state.user.selectedAppointment.contactId);

    const { data, isLoading, isError } = useGetCrmContactQuery(contactId, {
        skip: !contactId,
    });
    const contact = data?.data?.contact;
    // console.log(contact.firstName)


    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-5 h-full">
                {/* Main form section */}
                <div className="col-span-12 lg:col-span-8 pr-0 lg:pr-2">

                    <div className="flex justify-between items-center">
                        <nav className="flex py-3 text-gray-700" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <a href="#" className="font-medium font-Avenir text-sm text-base-50">
                                        Cart Items
                                    </a>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="4" cy="4" r="4" fill="#D9D9D9" />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium font-Avenir md:ms-2 text-base">
                                            Customer Information
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        <Link to="/loan-finance">
                            <PrimaryBtn className="bg-transparent px-[0] py-[0]">
                                <span className="font-Avenir font-medium underline text-base-red text-[14px]">
                                    Skip & Continue Anonymously
                                </span>
                            </PrimaryBtn>
                        </Link>
                    </div>

                    <hr className="my-4" />

                    <IconHeading
                        className="lg:text-[16px] text-[12px]"
                        primaryIcon={generalinfoIcon}
                        headingText="Order Specifications"
                        secondaryIcon={infoCircleIcon}
                    />

                    <form>
                        <div className="grid md:grid-cols-2 gap-5 mt-10">
                            <Input type="text" label="First Name" placeholder="Ben" value={contact?.firstName} />
                            <Input type="text" label="Last Name" placeholder="Weisblatt" value={contact?.firstNameLowerCase} />
                            <Input type="email" label="Email" placeholder="johnwick@mystateenergy.com" value={contact?.email} />
                            <Input type="phone" label="Phone Number" placeholder="(+1) 484 569 |" value={contact?.phone} />
                            <div className="md:col-span-2">
                                <Input type="Address" label="Address" placeholder="Enter Address" value={contact?.address1} />
                            </div>
                            <Input type="number" label="Zip-code" placeholder="Enter Zip-code" value={contact?.postalCode} />
                            <Input type="text" label="City" placeholder="e.g New York" value={contact?.city} />
                        </div>
                    </form>
                </div>

                {/* Sidebar section (PriceCard) - only appears on large screens */}
                <div className="col-span-12 lg:col-span-4 mt-6 lg:mt-[40px]">
                    <PriceCard />

                    <Link to='/loan-finance'>
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
        </>
    );
};

export default AddUSerInfo;
