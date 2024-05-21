const InputError = ({
    disabled = false,
    value,
    className,
    onChange,
    placeHolder = 'Error',
    error = '',
    ...props
}) => (
    <div>
        <input
            disabled={disabled}
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
            className={`${className} bg-red-50 border border-red-500 text-red-500 placeholder-red-500 text-sm rounded-lg block w-full p-2.5 focus:outline`}
            {...props}
            required
        />
        <p className="mt-1 ml-1 text-sm text-red-600">
            <span className="font-medium">{error}</span>
        </p>
    </div>
)

export default InputError
