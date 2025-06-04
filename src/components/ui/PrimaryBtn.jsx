import React from "react";

const PrimaryBtn = ({ children, icon, className = "", ...props }) => {

  const varientIcon = icon ? <img src={icon} alt="" /> : undefined
  return (
    <button
      className={`bg-primary px-14 py-3 text-white rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed font-Avenir font-medium  ${className}`}
      {...props}
    >
      <span className="flex items-center gap-2">{children} {varientIcon && varientIcon}</span>
    </button>
  );
};

export default PrimaryBtn;
