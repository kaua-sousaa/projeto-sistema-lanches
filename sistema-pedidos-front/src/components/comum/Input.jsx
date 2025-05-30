import React from 'react';

const Input = ({id, name, label, type='text',value,onChange, placeholder, required=false, disabled = false, error=null,autoComplete = ''}) => {
    const labelClasses = "block text-sm font-medium text-white mb-1";

     const inputClasses = `appearance-none block w-full px-3 py-2 border ${
        error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
              : 'border-slate-600 focus:ring-orange-500 focus:border-orange-500'
    } rounded-md shadow-sm bg-white text-black placeholder-slate-400 focus:outline-none sm:text-sm disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed`;
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