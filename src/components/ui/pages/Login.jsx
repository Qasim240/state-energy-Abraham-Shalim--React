import React from 'react';
import { loginBanner, logo } from '../../../../imagesPath';
import Input from '../Input';
import PrimaryBtn from '../PrimaryBtn';
import PrimaryHeading from '../PrimaryHeading';

const Login = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-12">

            <div className=" hidden md:flex md:col-span-6  items-center justify-center">
                <div>
                    <img className='w-full' src={loginBanner} alt="Login Banner" />
                </div>
            </div>
            <div className="col-span-1 md:col-span-6 relative flex items-center justify-center p-8">

                <img
                    src={logo}
                    alt="Logo"
                    className="absolute top-8 left-8 w-32 md:w-36"
                />

                <form className="w-full max-w-md space-y-6 mt-20">
                    <PrimaryHeading HeadingText="Login!" />
                    <p className='text-gray-400 font-Avenir font-normal'>
                        Enter authorized email address & password.
                    </p>

                    <Input type="email" label="Email" placeholder="Enter Your Email" />
                    <Input type="password" label="New Password" placeholder="***********" />

                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-x-2'>
                            <input
                                className="w-4 h-4 text-primary accent-primary"
                                id='StaySigned'
                                type="checkbox"
                            />
                            <label className='select-none' htmlFor="StaySigned">
                                Stay Signed In
                            </label>
                        </div>
                        <PrimaryBtn>Login</PrimaryBtn>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
