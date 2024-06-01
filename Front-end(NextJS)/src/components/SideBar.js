import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useConversations from '@/hooks/conversations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import axios from '@/lib/axios'
import { mutate } from 'swr'
import { useRouter } from 'next/router'

const SideBar = () => {
    const [sessionId, setSessionId] = useState(null)
    const { conversations } = useConversations(sessionId)
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Check if window is defined
            // SessionId
            const savedSessionId = localStorage.getItem('sessionId')
            if (savedSessionId) {
                setSessionId(savedSessionId)
            } else {
                const newSessionId = uuidv4()
                localStorage.setItem('sessionId', newSessionId)
                setSessionId(newSessionId)
            }
        }
    }, [])

    const handleDelete = conversationId => {
        axios
            .delete(`/api/deleteConversation/${sessionId}/${conversationId}`)
            .then(() => {
                mutate(`/api/conversations/${sessionId}`)
                mutate(`/api/history/${sessionId}/${conversationId}`)

                if (router.asPath === `/conversation/${conversationId}`) {
                    router.push('/')
                }
            })
            .catch(error => {
                throw error
            })
    }

    const newConversation = () => {
        //localStorage.setItem('conversationId', newConversation);

        router.push('/')
    }

    //console.log(conversations.conversation_ids.map((ids) => {console.log(ids)}));

    return (
        <div className="relative flex mr-5 w-full max-w-[20rem] flex-col rounded-xl bg-white dark:bg-gray-700 bg-clip-border p-4 text-gray-700 shadow-xl shadow-denim-300 dark:shadow-gray-700">
            <div className="p-4 mb-2 flex flex-row">
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 dark:text-white">
                    FSTT - Chatbot
                </h5>
                <div className={'flex justify-between ml-auto'}>
                    <button onClick={() => newConversation()}>
                        <FontAwesomeIcon
                            icon={faEdit}
                            style={{ fontSize: '1.2rem', color: '#1a5fb4' }}
                        />
                    </button>
                </div>
            </div>
            <nav className="flex min-w-[240px] overflow-x-auto flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 dark:text-white">
                {conversations &&
                conversations.conversation_ids &&
                conversations.conversation_ids.length > 0 ? (
                    conversations.conversation_ids.map(convId => (
                        <div
                            key={convId} // Add a unique key for each conversation ID
                            className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
                                router.asPath === `/conversation/${convId}`
                                    ? 'bg-denim-200'
                                    : ''
                            } hover:bg-blue-gray-50 hover:bg-opacity-80 hover:bg-denim-200 dark:hover:bg-gray-600 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:bg-denim-500 dark:active:bg-gray-800`}
                            onClick={() =>
                                router.push(`/conversation/${convId}`)
                            }>
                            <span className="truncate">{convId}</span>
                            <button
                                className="ml-4 relative"
                                onClick={e => {
                                    e.stopPropagation()
                                    handleDelete(convId)
                                }}>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    style={{
                                        fontSize: '1.2rem',
                                        color: '#1a5fb4',
                                    }}
                                />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center w-full h-full">
                        No conversations found
                    </div>
                )}
            </nav>
        </div>
    )
}

export default SideBar
