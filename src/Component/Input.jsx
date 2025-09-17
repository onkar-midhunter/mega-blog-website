import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  error,
  ...props
}, ref) {
  const id = useId()
  
  return (
    <div className='w-full'>
      {label && (
        <label
          className='block text-sm font-medium text-slate-700 mb-2'
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-300'
        } ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
})

export default Input