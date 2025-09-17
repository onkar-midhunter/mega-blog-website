import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-gradient-to-r from-blue-500 to-purple-500",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-6 py-3 font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;