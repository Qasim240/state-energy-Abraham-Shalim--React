import React from 'react';
import { Select } from 'flowbite-react';
import { validaionBorder } from '../utils/ValidationBorder';

const ThemedSelect = ({ id, label, error, className = '', children, ...props }) => {
    const baseClasses =
        'font-Avenir font-normal w-full px-[24px] py-[15px] text-base text-gray-900 bg-white border border-solid rounded-md focus:outline-none focus:ring-0 focus:border-gray-500 appearance-none';

    return (
        <div className="relative lg:mb-10 mb-5">
            {label && (
                <label
                    htmlFor={id}
                    className="absolute font-Avenir font-medium top-[-11px] left-[11px] bg-white px-2 text-[14px] text-base select-none"
                >
                    {label}
                </label>
            )}

            <Select
                id={id}
                className={`${baseClasses} ${validaionBorder(error)} ${className}`}
                theme={{
                    field: {
                        select: {
                            base: '!border-none !ring-0 !shadow-none !outline-none !bg-transparent',
                        },
                    },
                }}
                {...props}
            >
                {children}
            </Select>

            <p
                className={`text-red-500 text-sm overflow-hidden transition-all duration-300 ease-in-out ${error ? 'max-h-10 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'
                    }`}
            >
                {error || '\u00A0'}
            </p>
        </div>
    );
};

export default ThemedSelect;
