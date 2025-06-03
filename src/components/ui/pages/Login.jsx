import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


import { loginBanner, logo } from '../../../../imagesPath';
import Input from '../Input';
import PrimaryBtn from '../PrimaryBtn';
import PrimaryHeading from '../PrimaryHeading';
import { emialPasswordSchema } from '../../utils/loginSchema';

import { validaionBorder } from '../../utils/ValidationBorder';

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(emialPasswordSchema),
    });

    const onSubmit = (data) => {
        console.log("Login Data", data);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-8 gap-10">
            <div className="hidden md:flex md:col-span-4 items-center justify-end">
                <img src={loginBanner} alt="Login Banner" />
            </div>

            <div className="col-span-1 md:col-span-4 relative flex items-center  md:p-8">
                <img src={logo} alt="Logo" className="absolute top-12 left-8 w-32 md:w-36" />

                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6 mt-20 lg:m-0 mx-auto lg:p-0 p-5">
                    <PrimaryHeading HeadingText="Login!" />

                    <p className="text-gray-400 font-Avenir font-normal">
                        Enter authorized email address & password.
                    </p>

                    <Input
                        type="email"
                        label="Email"
                        placeholder="Enter Your Email"
                        {...register('email')}
                        error={errors.email?.message}
                    />

                    <Input
                        type="password"
                        label="Password"
                        placeholder="***********"
                        {...register('password')}
                        error={errors.password?.message}
                    />

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-x-2">
                            
                            <input
                                className="w-4 h-4 text-primary accent-primary"
                                id="StaySigned"
                                type="checkbox"
                            />
                            <label className="select-none font-Avenir font-normal" htmlFor="StaySigned">
                                Stay Signed In
                            </label>
                        </div>
                        <PrimaryBtn type="submit">Login</PrimaryBtn>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
