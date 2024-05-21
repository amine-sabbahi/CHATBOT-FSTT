const InputValid = ({
    disabled = false,
    value,
    className,
    onChange,
    placeHolder = 'Success',
    valide_message = '',
    ...props
}) => (
    <div>
        <input
            disabled={disabled}
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
            className={`${className} bg-green-50 border border-green-500 text-green-500 placeholder-green-700 text-sm rounded-lg block w-full p-2.5 focus:outline`}
            {...props}
            required
        />
        <p className="mt-1 ml-1 text-sm text-green-600">
            <span className="font-medium">{valide_message}</span>
        </p>
    </div>
)

export default InputValid
