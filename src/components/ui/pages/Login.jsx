import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginBanner, logo } from '../../../../imagesPath';
import Input from '../Input';
import PrimaryBtn from '../PrimaryBtn';
import PrimaryHeading from '../PrimaryHeading';
import { emialPasswordSchema } from '../../utils/loginSchema';
import { validaionBorder } from '../../utils/ValidationBorder';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../features/api/authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../features/slices/userSlice.js';
import { toast } from 'react-toastify';

const Login = () => {
    const [login, { data, error, isLoading }] = useLoginMutation()
    console.log("data", data)
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const navigate = useNavigate();
    console.log("isLoggedIn", isLoggedIn)
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setError } = useForm({ resolver: yupResolver(emialPasswordSchema), });

    const onSubmit = async (formData) => {
        try {
            const response = await login(formData).unwrap();
            const userData = response.data;

            dispatch(setUser({
                id: userData.user.id,
                name: userData.user.first_name,
                lastName: userData.user.last_name,
                email: userData.user.email,
                token: userData.token,
            }));
            toast.success('Login successful');
            navigate('/home');

        } catch (err) {
            console.error('Login failed:', err);

            setError('password', {
                type: 'manual',
                message: err?.data?.message || 'Login failed',
            });
            toast.error(err?.data?.message || 'Login failed');
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }
    }, [isLoggedIn, navigate]);





    return (

        <>
            {/* <p>{user?.name}</p> */}

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
                            <PrimaryBtn className='px-[40px]' type="submit" disabled={isLoading}>

                                {isLoading ?
                                    <div> Loading...  <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    </div> : 'Login'}

                            </PrimaryBtn>
                        </div>
                    </form>




                </div>
            </div>

        </>
    );
};

export default Login;
