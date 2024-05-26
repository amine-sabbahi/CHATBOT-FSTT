const Button = ({
    type = 'submit',
    disabled = false,
    className,
    children,
    ...props
}) => {
    return (
        <button
            type={type}
            className={`font-bold py-2 px-4 rounded-full ${disabled ? 'bg-denim-100 text-denim-500' : 'text-denim-50 bg-denim-500 hover:bg-denim-600 active:bg-denim-700'} ${className}`}
            disabled={disabled}
            {...props}>
            {children}
        </button>
    )
}

export default Button
