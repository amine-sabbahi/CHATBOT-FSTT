import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useConversations from '@/hooks/conversations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import axios from '@/lib/axios'
import { mutate } from 'swr'
import error from '@/components/Error'

const SideBar = () => {

    const [sessionId, setSessionId] = useState(null);
    const [conversationId, setConversationId] = useState(null);

    const { conversations, isLoading } = useConversations(sessionId);

    useEffect(() => {
        if (typeof window !== 'undefined') { // Check if window is defined
            // SessionId
            const savedSessionId = localStorage.getItem('sessionId');
            if (savedSessionId) {
                setSessionId(savedSessionId);
            } else {
                const newSessionId = uuidv4();
                localStorage.setItem('sessionId', newSessionId);
                setSessionId(newSessionId);
            }

            // ConversationId
            const savedConversationId = localStorage.getItem('conversationId');
            if (savedConversationId) {
                setConversationId(savedConversationId);
            } else {
                const newConversationId = uuidv4();
                localStorage.setItem('conversationId', newConversationId);
                setConversationId(newConversationId);
            }
        }
    }, []);

    const handleDelete = (conversationId) => {
        console.log(conversationId);

        axios.delete(`/api/deleteConversation/${sessionId}/${conversationId}`).then(() => {
            mutate(`/api/conversations/${sessionId}`)

        }).catch(error => {
            throw error;
        })

    }



    //console.log(conversations.conversation_ids.map((ids) => {console.log(ids)}));

    return (
        <div className="relative flex mr-5 w-full max-w-[20rem] flex-col rounded-xl bg-white dark:bg-gray-700 bg-clip-border p-4 text-gray-700 shadow-xl shadow-denim-300 dark:shadow-gray-700">
            <div className="p-4 mb-2">
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 dark:text-white">
                    FSTT - Chatbot
                </h5>
            </div>
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 dark:text-white">
                {
                    conversations && conversations.conversation_ids && conversations.conversation_ids.length > 0 ? (
                        conversations.conversation_ids.map((convId) => (
                            <div
                                 key={convId} // Add a unique key for each conversation ID
                                 className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:bg-denim-200 dark:hover:bg-gray-600 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:bg-denim-500 dark:active:bg-gray-800">
                                {convId}

                                <div className="grid mr-4 place-items-center">
                                    <button className={"absolute"} onClick={() => handleDelete(convId)}>
                                        <FontAwesomeIcon icon={faTrash} style={{ fontSize: '1.2rem', color: '#1a5fb4' }} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center w-full h-full absolute top-0 left-0">
                            No conversations found
                        </div>
                    )
                }
            </nav>
        </div>
    );
}

export default SideBar;
