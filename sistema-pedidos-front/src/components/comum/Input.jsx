import React from 'react';

const Input = ({id, name, label, type='text',value,onChange, placeholder, required=false, disabled = false, error=null,autoComplete = ''}) => {
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

    const inputClasses = `appearance-none block w-full px-3 py-2 border ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`;
    const errorClasses = "mt-1 text-xs text-red-600";

    return (
        <div>
            <label htmlFor={id} className={labelClasses}>
                {label}{ required && <span className="text-red-500">*</span> }
            </label>
            <input 
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={inputClasses}
                autoComplete={autoComplete}
            />
            {error && <div className={errorClasses}>{error}</div>}
        </div>
    )
}

export default Input;