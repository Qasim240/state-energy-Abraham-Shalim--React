import React from "react";

const PrimaryBtn = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-primary px-14 py-3 text-white rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
