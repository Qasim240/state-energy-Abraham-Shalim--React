import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Input from './Input';
import ThemedSelect from './ThemedSelect';
import PrimaryBtn from './PrimaryBtn';

const UserProfileForm = () => {
    const user = useSelector((state) => state.user.user);

    const {
        register,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (user) {
            setValue('firstName', user.first_name || '');
            setValue('lastName', user.last_name || '');
            setValue('email', user.email || '');
            setValue('phone', user.phone || '');
            setValue('city', user.city || '');
            setValue('zipCode', user.zip_code || '');
            setValue('country', user.country || '');
        }
    }, [user, setValue]);

    return (
        <form className="space-y-4">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                <Input
                    label="First Name"
                    placeholder="First Name"
                    {...register('firstName')}
                />
                <Input
                    label="Last Name"
                    placeholder="Last Name"
                    {...register('lastName')}
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

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                <Input
                    label="City"
                    placeholder="City"
                    {...register('city')}
                />
                <Input
                    label="Zip Code"
                    placeholder="Zip Code"
                    {...register('zipCode')}
                />
            </div>

            <ThemedSelect
                label="Country"
                {...register('country')}
            >
                <option value="">Select Country</option>
                <option value="pakistan">Pakistan</option>
                <option value="united states">United States</option>
                <option value="canada">Canada</option>
            </ThemedSelect>

            <div className="pt-4">
                <PrimaryBtn className="px-5">
                    Save & Update
                </PrimaryBtn>
            </div>
        </form>
    );
};

export default UserProfileForm;
