import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const Error = ({ children }) => {
    return (
        <div className={'flex flex-row'}>
            <div className="w-8 h-8 my-6 mr-3 p-1 rounded-full ring-2 ring-denim-600 dark:ring-gray-600">
                <FontAwesomeIcon
                    icon={faRobot}
                    style={{ fontSize: '1.2rem', color: '#1a5fb4' }}
                />
            </div>
            <div
                className={
                    ' bg-red-600 p-4 rounded-2xl text-white w-full border border-gray-600 border-2 border-spacing-24 mb-4 mt-4 font-bold'
                }>
                {children}
            </div>
        </div>
    )
}

export default Error
