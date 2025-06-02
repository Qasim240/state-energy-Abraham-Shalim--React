import React from 'react';
import { loginBanner } from '../../../../imagesPath';
import Input from '../Input';
import PrimaryBtn from '../PrimaryBtn';
import PrimaryHeading from '../PrimaryHeading';

const Login = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-12">
            <div className=" md:col-span-6  text-white flex items-center justify-center">
                <div>
                    <img className='w-full' src={loginBanner} alt="" />
                </div>
            </div>
            <div className="col-span-1 md:col-span-6 flex items-center justify-center p-8">
                <form className="w-full max-w-md space-y-6">

                    <PrimaryHeading HeadingText="Login!" />

                    <p className='"text-base'>Enter authorized email address & password.</p>

                    <form action="">
                        <Input type="email" label="Email" placeholder="Enter Your Email" />

                        <Input type="password" label="New Password" placeholder="***********" />

                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-x-2'>
                                <input className="w-4 h-4 text-primary accent-primary" id='StaySigned' type="checkbox" />
                                <label className='select-none' htmlFor="StaySigned">Stay Signed In</label>
                            </div>
                            <PrimaryBtn>Login</PrimaryBtn>
                        </div>
                    </form>



                </form>
            </div>
        </div>
    );
};

export default Login;
