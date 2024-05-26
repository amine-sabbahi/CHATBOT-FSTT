const AppLayout = ({ children ,title}) => {
    return (
        <div className={"flex p-4 overflow-x-auto h-screen bg-white"}>
            {children}
        </div>
    )
}

export default AppLayout