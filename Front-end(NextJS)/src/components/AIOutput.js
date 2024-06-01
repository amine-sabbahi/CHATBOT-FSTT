import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'

const AIOutput = ({ children }) => (
    <div className={'flex flex-row'}>
        <div className="flex justify-center items-center w-8 h-8 my-6 mr-3 p-1 rounded-full ring-2 ring-denim-600 dark:ring-gray-600">
            <FontAwesomeIcon
                icon={faRobot}
                style={{ fontSize: '1.2rem', color: '#1a5fb4' }}
            />
        </div>
        <div
            className={
                ' bg-denim-800 dark:bg-indigo-700 p-4 rounded-2xl text-white w-full  overflow-x-auto mb-4 mt-4'
            }>
            {children}
        </div>
    </div>
)

export default AIOutput
