import React, { useEffect, useState, useRef } from 'react';
import axios from '@/lib/axios';
import AIOutput from "@/components/AIOutput";
import UserInput from "@/components/UserInput";
import ReactLoading from 'react-loading';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import Error from '@/components/Error'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useConversationHistory from '@/hooks/conversations'
import useMessages from '@/hooks/messages'
import { mutate } from 'swr'

const Form = ({ children }) => {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state
    const [error , setError] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const chatEndRef = useRef(null); // Create a ref for the end of the chat

    // Fetch History data
    const { messages, isLoading } = useMessages(sessionId, "ed5fd3f3-8319-4bdc-a49d-eeb1c3b872d1");


    useEffect(() => {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the bottom on mount and update
    }, [chatHistory, messages]);

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
            if (savedConversationId){
                setConversationId(savedConversationId);
            }
            else{
                const newConversationId = uuidv4();
                localStorage.setItem('conversationId', newConversationId);
                setConversationId(newConversationId);
            }
        }

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { type: "user", text: userInput },
        ]);

        setLoading(true); // Set loading state to true

        await axios.post('/query', {

            query: userInput,
            sessionId: sessionId,
            conversationId: conversationId

        })
        .then(res => {
            setChatHistory(prevChatHistory => [
                ...prevChatHistory,
                { type: "ai", text: res.data.ai }
            ]);
            setUserInput("");
            setLoading(false);
            setError(null)
            mutate(`/api/conversations/${sessionId}`)
        })
        .catch(error => {
            setError(error.message)
            setLoading(false)
        });

    };

    const handleKeyDown = async (e) => {
        // Check if Shift + Enter are pressed
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
        }
    };


    const type = "bubbles"; // Define the type of loading animation
    const color = "#1a5fb4"; // Define the color of the loading animation

    //console.log(history)

    return (
        <form onSubmit={handleSubmit} className={"w-full"}>
            <div className="flex flex-col p-4 rounded-xl shadow-xl h-full w-full shadow-denim-300 bg-white dark:bg-gray-700 dark:shadow-gray-700">
                <div className={(messages.length === 0 && chatHistory.length === 0) ? "p-4 overflow-x-auto h-full flex items-center justify-center" : "p-4 overflow-x-auto"}>
                    {
                        messages.length === 0 && chatHistory.length === 0 &&
                        <div className={'inset-0 flex items-center justify-center'}>
                            <div className={'flex flex-col items-center'}>
                                <div className={'rounded-full ring-2 ring-denim-600 flex items-center'}>
                                    <FontAwesomeIcon className={'p-2'} icon={faRobot}
                                                     style={{ fontSize: '2.2rem', color: '#1a5fb4' }} />
                                </div>
                                <div className={'mt-2 text-2xl font-bold'}>
                                    How can I help you today?
                                </div>
                            </div>
                        </div>
                    }
                    {
                        isLoading ? (
                            <ReactLoading type={type} color={color} height={60} width={60} />
                        ) : (
                            messages && messages.map((h, index) => (
                                h.role === 'user' ? (

                                    <UserInput key={index}>
                                        <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} className="prose prose-lg max-w-none text-white prose-headings:text-white prose-strong:text-white prose-table:table-fixed">
                                            {h.content}
                                        </Markdown>
                                    </UserInput>
                                ) : (
                                    <AIOutput key={index}>
                                        <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} className="prose prose-lg max-w-none text-white prose-headings:text-white prose-strong:text-white prose-table:table-fixed">
                                            {h.content}
                                        </Markdown>
                                    </AIOutput>
                                )
                            ))
                        )
                    }

                    <TransitionGroup>
                        {chatHistory.map((chat, index) => (
                            <CSSTransition key={index} classNames="fade">
                                {chat.type === "user" ? (
                                    <UserInput key={index}>
                                        <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} className="prose prose-lg max-w-none text-white prose-headings:text-white prose-strong:text-white prose-table:table-fixed">{chat.text}</Markdown>
                                    </UserInput>
                                ) : (
                                    <AIOutput key={index}>
                                        <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} className="prose prose-lg max-w-none text-white prose-headings:text-white prose-strong:text-white prose-table:table-fixed">{chat.text}</Markdown>
                                    </AIOutput>
                                )}
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                    {loading &&
                        <div className="flex flex-row">
                            <div>
                                <FontAwesomeIcon icon={faRobot} style={{ fontSize: '1.2rem', color: '#1a5fb4' }} />
                            </div>
                            <div className="pt-2 rounded-2xl text-white w-full whitespace-normal overflow-x-auto pb-2 mb-4 mt-4">
                                <ReactLoading type={type} color={color} height={60} width={60} />
                            </div>
                        </div>
                    }
                    {error && <Error>{error}</Error>}
                    <div ref={chatEndRef} /> {/* This div is used to scroll to the bottom */}
                </div>
                <div
                    className="flex items-center p-4 mt-auto rounded-xl border border-gray-200 dark:border-gray-600 w-full">
                    <textarea
                        onChange={e => setUserInput(e.target.value)}
                        value={userInput}
                        name={"userInput"}
                        onKeyDown={handleKeyDown}
                        placeholder={"Write your Question"}
                        className={`appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none resize-none overflow-auto bg-white dark:bg-gray-700`}
                        required
                    />
                    <button type="submit" disabled={loading} className="ml-2 px-4 py-2 rounded-md bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 disabled:bg-gray-500">
                        Send
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Form;

