import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from './Input';
import PrimaryBtn from './PrimaryBtn';
import { useChangePasswordMutation } from '../../features/api/apiSlice';

// Yup validation schema
const schema = yup.object().shape({
    current_password: yup.string().required('Current password is required'),
    new_password: yup.string().required('New password is required'),
    new_password_confirmation: yup
        .string()
        .oneOf([yup.ref('new_password'), null], 'Passwords do not match')
        .required('Please confirm your new password'),
});

const ChangePasswordForm = () => {
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await changePassword(data).unwrap();
            reset();
        } catch (err) {
            const msg = err?.data?.message || 'Something went wrong';

            // Set form-level error (could also use toast)
            setError('apiError', {
                type: 'manual',
                message: msg,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-1 gap-5 mt-10">
                <div className="md:columns-2">
                    <Input
                        type="password"
                        label="Current Password"
                        placeholder="********"
                        {...register('current_password')}
                        error={errors.current_password?.message}
                    />
                </div>

                <div className="md:columns-2">
                    <Input
                        type="password"
                        label="New Password"
                        placeholder="********"
                        {...register('new_password')}
                        error={errors.new_password?.message}
                    />
                </div>

                <div className="md:columns-2">
                    <Input
                        type="password"
                        label="Confirm New Password"
                        placeholder="********"
                        {...register('new_password_confirmation')}
                        error={errors.new_password_confirmation?.message}
                    />
                </div>

                <div>
                    <PrimaryBtn type="submit" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Save & Update'}
                    </PrimaryBtn>
                </div>

                {/* API error */}
                {errors.apiError && (
                    <p className="text-red-500 mt-2">{errors.apiError.message}</p>
                )}

                {/* Optional success message */}
                {isSubmitSuccessful && !errors.apiError && (
                    <p className="text-green-500 mt-2">Password updated successfully.</p>
                )}
            </div>
        </form>
    );
};

export default ChangePasswordForm;
