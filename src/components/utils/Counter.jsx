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

        const btnSimilarStyle = "w-8 h-8 flex items-center justify-center rounded-md bg-[#F1F6FF] text-primary font-extrabold hover:bg-blue-100 disabled:opacity-30"
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

                <div className="flex items-center justify-between gap-4 w-full px-4 font-Avenir font-normal  py-[15px] focus:outline-none">


                    <input
                        ref={ref}
                        id={id}
                        type="number"
                        inputMode="numeric"
                        value={value}
                        onChange={(e) => set(Number(e.target.value))}
                        className="font-Avenir font-normal focus:outline-none font-myfont"
                    />
                    <div className="flex items-center gap-3 absolute right-4">
                        <button
                            type="button"
                            onClick={() => set(value - step)}
                            disabled={value <= min}
                            className={` ${btnSimilarStyle} `}
                        >
                            &minus;
                        </button>

                        <button
                            type="button"
                            onClick={() => set(value + step)}
                            disabled={value >= max}
                            className={` ${btnSimilarStyle}`}
                        >
                            +
                        </button>
                    </div>

                </div>
            </div>
        );
    }
);

export default Counter;
