import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Input from './Input';
import ThemedSelect from './ThemedSelect';
import PrimaryBtn from './PrimaryBtn';
import { useUpdateUserProfileMutation } from '../../features/api/apiSlice';
import { toast } from 'react-toastify';
import { setUser } from '../../features/slices/userSlice.js';

const UserProfileForm = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (user) {
            setValue('first_name', user.first_name || '');
            setValue('last_name', user.last_name || '');
            setValue('email', user.email || '');
            setValue('phone', user.phone || '');
            setValue('city', user.city || '');
            setValue('zip_code', user.zip_code || '');
            setValue('country', user.country || '');
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        try {
            const res = await updateUserProfile({
                userId: user.id,
                body: data
            }).unwrap();

            toast.success('Profile updated successfully');
            dispatch(setUser({ token: user.token, user: res.data }));
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update profile');
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                <Input
                    label="First Name"
                    placeholder="First Name"
                    {...register('first_name')}
                />
                <Input
                    label="Last Name"
                    placeholder="Last Name"
                    {...register('last_name')}
                />
            </div>

            <Input
                label="Email"
                type="email"
                placeholder="Email"
                {...register('email')}
            />

            <Input
                label="Phone Number"
                type="text"
                placeholder="Phone"
                {...register('phone')}
            />

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
                <Input
                    label="City"
                    placeholder="City"
                    {...register('city')}
                />
                <Input
                    label="Zip Code"
                    placeholder="Zip Code"
                    {...register('zip_code')}
                />
            </div>

            <ThemedSelect label="Country" {...register('country')}>
                <option value="">Select Country</option>
                <option value="pakistan">Pakistan</option>
                <option value="united states">United States</option>
                <option value="canada">Canada</option>
            </ThemedSelect>

            <div className="pt-4">
                <PrimaryBtn className="px-5" type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save & Update'}
                </PrimaryBtn>
            </div>
        </form>
    );
};

export default UserProfileForm;
