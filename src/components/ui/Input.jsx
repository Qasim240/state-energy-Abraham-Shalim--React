import React, { useState, forwardRef } from 'react';
import { eyeClose, eyeOpen } from '../../../imagesPath';
import { validaionBorder } from '../utils/ValidationBorder';
import VerticalSeparator from '../utils/VerticalSeparator';

const Input = (
    { type = 'text', label, placeholder, error, id, unit, className = '', ...props },
    ref
) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const isTextarea = type === 'textarea';
    const ischeckBox = type === 'checkbox';
    const isUnit = !!unit;
    const inputBorder = 'border font-Avenir font-normal border-solid w-full px-[24px] py-[15px] focus:outline-none rounded-md font-myfont pr-[50px]'

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const CheckBox = ischeckBox ? `${inputBorder}` : ''



    return (
        <div className={`relative ${type === 'checkbox' ? '' : 'lg:mb-10 mb-5'} ${CheckBox}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="absolute font-Avenir font-medium top-[-11px] left-[11px] bg-white px-2 text-[14px] text-base select-none"
                >
                    {label}
                </label>
            )}

            {/* Render input or textarea */}
            {isTextarea ? (
                <textarea
                    id={id}
                    ref={ref}
                    placeholder={placeholder}
                    className={` resize-none ${inputBorder} ${validaionBorder(error)} ${className}`}
                    {...props}
                />
            ) : (
                <input
                    id={id}
                    ref={ref}
                    type={inputType}
                    placeholder={placeholder}
                    className={`${inputBorder}  ${validaionBorder(error)} ${className}`}
                    {...props}
                />
            )}

            {/* Error message */}
            <p
                className={`text-red-500 text-sm overflow-hidden transition-all duration-300 ease-in-out ${error ? 'max-h-10 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'
                    }`}
            >
                {error || '\u00A0'}
            </p>

            {/* Show/hide password toggle */}
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-7 right-4 -translate-y-1/2 flex items-center justify-center h-[38px] w-[38px]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    <img src={showPassword ? eyeOpen : eyeClose} alt={showPassword ? 'Show password' : 'Hide password'} />
                </button>
            )}

            {/* Unit display (e.g., kg) */}
            {isUnit && !isTextarea && (
                <div className="absolute inset-y-7 right-4 -translate-y-1/2 flex items-center justify-center h-[38px] w-auto">
                    <div className="flex items-center gap-3">
                        <VerticalSeparator />
                        <span className="text-[#BBBBBB] font-Avenir font-normal uppercase">{unit}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default forwardRef(Input);
