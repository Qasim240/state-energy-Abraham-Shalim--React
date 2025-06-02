import React, { useState } from 'react';
import { eyeOpen } from '../../../imagesPath';

const Input = ({ type = 'text', label, placeholder, id, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="relative mb-10">
            {label && (
                <label
                    htmlFor={id}
                    className="absolute top-[-11px] left-[11px] bg-white px-2 text-[14px] text-base select-none"
                >
                    {label}
                </label>
            )}

            <input
                id={id}
                type={isPassword ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                className="border border-solid border-secondary w-full px-[24px] py-[15px] focus:outline-none rounded-md font-myfont pr-[50px]"
                {...props}
            />

            {isPassword && (
             <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-primary focus:outline-none"
                >
                   {showPassword ? "hide"  : <img src={eyeOpen} alt="" />}
                </button>
            )}
        </div>
    );
};

export default Input;
