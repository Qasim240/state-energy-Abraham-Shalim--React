import React, { useEffect } from 'react';
import { fontMedium } from '../../utils/fontMedium';
import PrimaryBtn from '../PrimaryBtn';
import { editprofileIcon, infoCircleIcon, signature, supportIcon } from '../../../../imagesPath';
import Image from '../../utils/Image';
import { Tabs } from "flowbite-react";
import IconHeading from '../../utils/IconHeading';
import UserProfileForm from '../UserProfileForm';
import ForgetPasswordForm from '../ForgetPasswordForm';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';



const Userprofile = () => {
    const user = useSelector((state) => state.user.user);


    const {  setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (user) {
            setValue('firstName', user.avatar_url || '');
            setValue('firstName', user.full_name || '');
            setValue('firstName', user.email || '');
            setValue('firstName', user.country || '');

        }
    }, [user, setValue]);





    return (
        <div className="grid md:grid-cols-12 gap-12">
            {/* Left Profile Card */}
            <div className="md:col-span-4">
                <div className="bg-gray-flat border border-secondary rounded-large flex flex-col justify-center items-center p-[60px] gap-3 h-[100%]">
                    <div className="bg-base-dark p-4 rounded-full text-white w-[80px] h-[80px] flex justify-center items-center text-center relative text-[18px] font-bold">
                        <img
                            src={user.avatar_url}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <input
                            type="file"
                            className="absolute w-full h-full opacity-0 cursor-pointer rounded-full"
                            title="Edit Profile Picture"
                            id="chnageIcon"
                        />
                        <label htmlFor="chnageIcon" className="absolute cursor-pointer bottom-[-6px] right-[-6px] w-[34px] h-[34px] rounded-full flex items-center justify-center">
                            <Image className="w-[34px] h-[34px]" img={editprofileIcon} />
                        </label>
                    </div>
                    <span className={`${fontMedium} text-base-dark`}>{user.full_name}</span>
                    <p className="text-base-dark text-[14px] font-Avenir">{user.email}</p>
                    <p className="text-base-50 text-[14px] font-Avenir">{user.email}</p>
                </div>
            </div>

            {/* Right Tabs Section */}
            <div className="md:col-span-8">
                <Tabs
                    aria-label="User Profile Tabs"
                    variant="underline"
                    theme={{
                        tablist: {
                            base: "flex text-center border-b border-gray-200",
                            tabitem: {
                                base: "p-3 text-sm font-medium",
                                icon: "mr-2 h-5 w-5",
                                variant: {
                                    underline: {
                                        base: "rounded-none",
                                        active: {
                                            on: "border-b-2 border-[#001D6E] text-[#001D6E] font-medium",
                                            off: "border-b-2 border-transparent text-gray-500 hover:text-[#001D6E] hover:border-[#001D6E]"
                                        }
                                    }
                                }
                            }
                        },
                        tabpanel: "py-4"
                    }}
                >
                    <Tabs.Item active title="General Information">

                        <UserProfileForm />


                    </Tabs.Item>

                    <Tabs.Item title="Digital Signature">


                        <IconHeading className='lg:text-[16px] text-[12px] my-8' primaryIcon={supportIcon} headingText="Customer Signature" secondaryIcon={infoCircleIcon} />
                        <div className='border border-secondary p-4 rounded-large lg:mt-4 '>

                            <Image className="mx-auto m-10" img={signature} />

                            <div className='text-end'>
                                <PrimaryBtn className='bg-transparent px-6 py-[7px] border  border-primary'>
                                    <span className='text-base text-primary'>Clear</span>
                                </PrimaryBtn>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <PrimaryBtn className='px-5'>
                                Save & Update
                            </PrimaryBtn>
                        </div>




                    </Tabs.Item>



                    <Tabs.Item title="Security">

                        <ForgetPasswordForm />


                    </Tabs.Item>
                </Tabs>
            </div>
        </div>
    );
};

export default Userprofile;
