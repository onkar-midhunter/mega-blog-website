import React, { useId } from "react";

function Select({ options, label, className = "", error, ...props }, ref) {
  const id = useId()
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-300'
        } ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

export default React.forwardRef(Select);