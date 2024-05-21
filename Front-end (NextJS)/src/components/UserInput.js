const UserInput = ({ children }) => (

    <div className={"flex flex-row"}>

        <div
            className="relative inline-flex p-1 items-center justify-center w-8 h-8 overflow-hidden bg-denim-100 rounded-full ring-2 ring-denim-600 my-6 mr-3">
            <span className="font-lightpm run dev
             text-white-600">YOU</span>
        </div>

        <div
            className={' bg-denim-400 p-2 rounded-2xl text-white w-full whitespace-normal overflow-x-auto p-4 mb-4 mt-4'}>
            <p className={'mb-2 bol font-bold'}>YOU</p>
            {children}
        </div>
    </div>

)

export default UserInput
