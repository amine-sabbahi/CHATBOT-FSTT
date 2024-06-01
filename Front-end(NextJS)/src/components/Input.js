import React from 'react'

const Input = ({ disabled = false, value, className, ...props }) => {
    // Calculate the number of lines in the text

    return (
        <textarea
            disabled={disabled}
            value={value}
            placeholder={'Write your Question'} // Use the custom handler for input change
            className={`${className}  appearance-none rounded  w-full py-2 px-3 text-gray-700 leading-tight outline-none resize-none overflow-auto`}
            {...props}
            required
        />
    )
}

export default Input
