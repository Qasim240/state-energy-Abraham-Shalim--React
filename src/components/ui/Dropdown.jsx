/* src/components/Dropdown.jsx */
import React, { useState, useRef, useEffect, forwardRef } from "react";
import { validaionBorder } from "../utils/ValidationBorder";
import Image from "../utils/Image";
import { dropIcon } from "../../../imagesPath";
import VerticalSeparator from "../utils/VerticalSeparator";


const Dropdown = forwardRef(
    (
        {
            label,
            id,
            options = [],               // ["Option 1", "Option 2"]
            value = null,               // the currently-selected value
            onChange = () => { },
            placeholder = "Select…",
            error,
            className = "",
            ...props
        },
        ref
    ) => {
        const [open, setOpen] = useState(false);
        const containerRef = useRef(null);

        /* --- close on outside click ----------------------------------------- */
        useEffect(() => {
            const handleClick = (e) => {
                if (!containerRef.current?.contains(e.target)) setOpen(false);
            };
            window.addEventListener("click", handleClick);
            return () => window.removeEventListener("click", handleClick);
        }, []);

        /* --- helpers --------------------------------------------------------- */
        const selectedLabel =
            options.find((o) => (typeof o === "object" ? o.value === value : o === value))?.label ??
            (typeof value === "string" ? value : "");

        const display = selectedLabel || placeholder;

        /* --- render ---------------------------------------------------------- */
        return (
            <div ref={containerRef} className={`relative mb-10 ${className}`} {...props}>
                {label && (
                    <label
                        htmlFor={id}
                        className="absolute font-Avenir font-medium top-[-11px] left-[11px] bg-white px-2 text-[14px] select-none"
                    >
                        {label}
                    </label>
                )}

                {/* button */}
                <button
                    id={id}
                    ref={ref}
                    type="button"
                    onClick={() => setOpen((p) => !p)}
                    className={`border w-full px-[24px] py-[15px] rounded-md flex items-center focus:outline-none   justify-between font-Avenir font-normal text-left
            ${validaionBorder(error)} ${open ? "ring-1 ring-base" : ""}
          `}
                >
                    <span className={selectedLabel ? "text-base-dark" : "text-gray-400"}>
                        {display}
                    </span>
                    <div className="flex items-center gap-4">
                        <VerticalSeparator className="h-[20px]" />  <Image img={dropIcon} />
                    </div>
                </button>

                {/* error */}
                <p
                    className={`text-red-500 text-sm overflow-hidden transition-all duration-300 ${error ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"
                        }`}
                >
                    {error || "\u00A0"}
                </p>

                {/* dropdown panel */}
                <div
                    className={`absolute z-20 left-0 w-full bg-white border shadow-lg rounded-md overflow-hidden origin-top
            transition-transform transition-opacity duration-300 ease-out
            ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}
          `}
                    style={{ transformOrigin: "top" }}
                >
                    {options.map((opt) => {
                        const val = typeof opt === "object" ? opt.value : opt;
                        const label = typeof opt === "object" ? opt.label : opt;

                        return (
                            <button
                                key={val}
                                type="button"
                                onClick={() => {
                                    onChange(val);
                                    setOpen(false);
                                }}
                                className={`w-full text-left px-6 py-3 font-Avenir font-normal hover:bg-gray-100 transition
                  ${val === value ? "bg-base/10 text-base" : "text-base-dark"}
                `}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }
);

export default Dropdown;
