const Error = ({ children, ...props }) => {
    return (
        <div className={"flex flex-row"}>
            <div>
                <img className="w-8 h-8 my-6 mr-3 p-1 rounded-full ring-2 ring-denim-600 dark:ring-gray-600"
                     src="https://fstt.ac.ma/Portail2023/wp-content/uploads/2023/03/fst-1024x383.png"
                     alt="Rounded avatar" />
            </div>
            <div
                className={' bg-red-600 p-4 rounded-2xl text-white w-full border border-gray-600 border-2 border-spacing-24 mb-4 mt-4'}>
                {children}
            </div>
        </div>
    )
}

export default Error
