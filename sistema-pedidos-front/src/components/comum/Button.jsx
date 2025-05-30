import React from 'react';

const Button = ({children,type = 'button',onClick,disabled = false,isLoading = false,variant = 'primary', fullWidth = true,className = '' }) =>{
    const baseStyle = `flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''}`;

    let variantStyle = '';
    switch (variant) {
        case 'secondary':
            variantStyle = 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500';
            break;
        case 'danger':
            variantStyle = 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500';
            break;
        case 'primary': 
        default:
            variantStyle = 'text-white bg-orange-500 hover:bg-orange-600 focus:ring-indigo-500';
            break;
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyle} ${variantStyle} ${className}`}
        >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                children
            )}
        </button>
    );
}

export default Button;