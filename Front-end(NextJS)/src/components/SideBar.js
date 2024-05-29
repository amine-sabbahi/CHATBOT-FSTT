import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useConversations from '@/hooks/conversations';

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

    //console.log(conversations.conversation_ids.map((ids) => {console.log(ids)}));

    return (
        <div className="relative flex mr-5 w-full max-w-[20rem] flex-col rounded-xl bg-white dark:bg-gray-700 bg-clip-border p-4 text-gray-700 shadow-xl shadow-denim-300 dark:shadow-gray-700">
            <div className="p-4 mb-2">
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 dark:text-white">
                    FSTT- Chatbot
                </h5>
            </div>
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 dark:text-white">
                {
                    conversations && conversations.conversation_ids && conversations.conversation_ids.length > 0 ? (
                        conversations.conversation_ids.map((convId) => (
                            <div role="button"
                                 key={convId} // Add a unique key for each conversation ID
                                 className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:bg-denim-200 dark:hover:bg-gray-600 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:bg-denim-500 dark:active:bg-gray-800">
                                <div className="grid mr-4 place-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                                        <path fillRule="evenodd"
                                              d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                {convId} {/* Display the conversation ID */}
                            </div>
                        ))
                    ) : (
                        <div>No conversations found</div>
                    )
                }
            </nav>
        </div>
    );
}

export default SideBar;
