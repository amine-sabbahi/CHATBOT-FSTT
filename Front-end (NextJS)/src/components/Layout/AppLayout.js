const AppLayout = ({ children ,title}) => {
    return (
        <div className={"p-4 overflow-x-auto h-screen"}>
            <div>{children}</div>
        </div>
    )
}

export default AppLayout