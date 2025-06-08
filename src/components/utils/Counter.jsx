import React, { forwardRef } from "react";

const Counter = forwardRef(
    (
        {
            id,
            label = "Quantity",
            value = 1,
            onChange = () => { },
            min = 0,
            max = Infinity,
            step = 1,
            className = "",
        },
        ref
    ) => {
        const clamp = (v) => Math.max(min, Math.min(max, v));
        const set = (v) => onChange(clamp(v));

        return (

            <div className={`relative mb-6 border border-solid rounded-md border-gray ${className}`}>
                {label && (
                    <label
                        htmlFor={id}
                        className="absolute font-Avenir font-medium top-[-11px] left-[11px] bg-white px-2 text-[14px] text-base select-none"
                    >
                        {label}
                    </label>
                )}

                <div className="flex items-center justify-between  px-4 w-fit font-Avenir font-normal  py-[15px] focus:outline-none  pr-[50px]">


                    <input
                        ref={ref}
                        id={id}
                        type="number"
                        inputMode="numeric"
                        value={value}
                        onChange={(e) => set(Number(e.target.value))}
                        className=" font-Avenir font-normal focus:outline-none font-myfont pr-[50px]"
                    />
                    <button
                        type="button"
                        onClick={() => set(value - step)}
                        disabled={value <= min}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-30"
                    >
                        &minus;
                    </button>

                    <button
                        type="button"
                        onClick={() => set(value + step)}
                        disabled={value >= max}
                        className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-30"
                    >
                        +
                    </button>

                </div>
            </div>
        );
    }
);

export default Counter;
