import React, { useState } from 'react';

const Input = ({ disabled = false, value, className, onChange, ...props }) => {
    // Calculate the number of lines in the text
    const numLines = value ? value.split('\n').length : 1;

    // Set the rows attribute dynamically based on the number of lines
    const rows = 8;
    const [rows_max, setRows] = useState(2);
    const rowsLimit = 5; // Maximum number of rows allowed

    // Handle input change
    const handleInputChange = (e) => {
        const textarea = e.target;
        const numLines = textarea.value.split('\n').length;

        // Limit the number of rows to the specified limit
        if (numLines <= rowsLimit) {
            textarea.style.height = 'auto'; // Reset height to auto to recalculate the scroll height
            textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scroll height
            setRows(numLines);
        }
    };

    return (
        <textarea
            disabled={disabled}
            value={value}
            onChange={e => console.log(e.target.value)}
            placeholder={"Write your Question"}// Use the custom handler for input change
            className={`${className}  appearance-none rounded  w-full py-2 px-3 text-gray-700 leading-tight outline-none resize-none overflow-auto`}
            rows={rows_max} // Set the rows attribute dynamically
            {...props}
            required
        />
    );
};

export default Input;
