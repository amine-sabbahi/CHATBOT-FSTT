const UserInput = ({ children }) => (
    <div className={'flex flex-row'}>
        <div className="relative inline-flex p-1 items-center justify-center w-8 h-8 overflow-hidden bg-denim-100 bg-transparent rounded-full ring-2 ring-denim-600 dark:ring-gray-600 dark:text-white my-6 mr-3">
            <span className="text-white-600">ME</span>
        </div>

        <div
            className={
                ' bg-denim-400 dark:bg-indigo-400 p-2 rounded-2xl text-white whitespace-normal overflow-x-auto p-4 mb-4 mt-4'
            }>
            <p className={'mb-2 bol font-bold'}>ME</p>
            {children}
        </div>
    </div>
)

export default UserInput
