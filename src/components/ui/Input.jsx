import React, { useState } from 'react';
import { eyeClose, eyeOpen } from '../../../imagesPath';
import { validaionBorder } from '../utils/ValidationBorder';

const Input = ({ type = 'text', label, placeholder, error, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className={`relative ${type === 'checkbox' ? '' : 'mb-10'}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="absolute font-Avenir font-medium top-[-11px] left-[11px] bg-white px-2 text-[14px] text-base select-none"
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type={isPassword ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                className={`border font-Avenir font-normal border-solid w-full px-[24px] py-[15px] focus:outline-none rounded-md font-myfont pr-[50px] ${validaionBorder(error)}`}
                {...props}
            />
            {/* Error message with smooth animation */}
            <p
                className={`text-red-500 text-sm overflow-hidden transition-all duration-300 ease-in-out ${
                    error ? 'max-h-10 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'
                }`}
            >
                {error || '\u00A0'}
            </p>
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute inset-y-7 right-4 -translate-y-1/2 flex items-center justify-center h-[38px] w-[38px]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <img src={eyeOpen} alt="Show password" /> : <img src={eyeClose} alt="Hide password" />}
                </button>
            )}
        </div>
    );
};

export default Input;
