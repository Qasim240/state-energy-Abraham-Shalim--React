import React from "react";

const PrimaryBtn = ({ children, icon, iconLeft, className = "", ...props }) => {

  const varientIcon = icon ? <img src={icon} alt={icon} /> : undefined
  const varientIconLeft = iconLeft ? <img src={iconLeft} alt={iconLeft} /> : undefined
  return (
    <button className={` ${className} bg-primary  text-white rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed font-Avenir font-medium px-14 py-3  `}
      {...props}
    >
      <span className={`flex items-center gap-2`}> {varientIconLeft && varientIconLeft} {children} {varientIcon && varientIcon}</span>

    </button>
  );
};

export default PrimaryBtn;
