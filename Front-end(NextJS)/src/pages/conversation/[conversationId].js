import { useRouter } from 'next/router'
import AppLayout from '@/components/Layout/AppLayout'
import SideBar from '@/components/SideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import ReactLoading from 'react-loading'
import UserInput from '@/components/UserInput'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import AIOutput from '@/components/AIOutput'
import { CSSTransition } from 'react-transition-group'
import Error from '@/components/Error'
import React, { useEffect, useRef, useState } from 'react'
import axios from '@/lib/axios'
import { mutate } from 'swr'
import useMessages from '@/hooks/messages'
import { v4 as uuidv4 } from 'uuid'

export default function ConversationPage() {
    const [userInput1, setUserInput1] = useState('')
    const router = useRouter()
    const conv_router = router.query['conversationId']

    const [sessionId, setSessionId] = useState(null)
    const { messages, isLoading } = useMessages(
        sessionId,
        router.query['conversationId'],
    )
    const type = 'bubbles' // Define the type of loading animation
    const color = '#1a5fb4' // Define the color of the loading animation
    const [chatHistory1, setChatHistory1] = useState([])
    const [loading1, setLoading1] = useState(false) // Add loading state
    const [error, setError] = useState(null)
    const chatEndRef = useRef(null) // Create a ref for the end of the chat

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

    useEffect(() => {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' }) // Scroll to the bottom on mount and update
    }, [chatHistory1, messages])

    const handleSubmit1 = async e => {
        e.preventDefault()
        const id1 = uuidv4()
        setChatHistory1(prevChatHistory1 => [
            ...prevChatHistory1,
            { type: 'user', text: userInput1, id: id1 },
        ])

        setLoading1(true) // Set loading state to true
        await axios
            .post('/query', {
                query: userInput1,
                sessionId: sessionId,
                conversationId: conv_router,
                id: id1,
                model_name: localStorage.getItem('model_name'),
            })
            .then(res => {
                setChatHistory1(prevChatHistory1 => [
                    ...prevChatHistory1,
                    { type: 'ai', text: res.data.ai, id: res.data.messageId },
                ])
                setUserInput1('')
                setLoading1(false)
                setError(null)
                mutate(`/api/conversations/${sessionId}`)
            })
            .catch(error => {
                setError(error.message)
                setUserInput1('')
                setLoading1(false)
            })
    }
    const handleKeyDown1 = async e => {
        // Check if Shift + Enter are pressed
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit1(e)
            setUserInput1('')
        }
    }

    useEffect(() => {
        // Function to set the theme based on the value stored in localStorage
        const setThemeOnLoad = () => {
            const currentTheme = localStorage.getItem('theme')
            if (currentTheme) {
                document.documentElement.classList.add(currentTheme)
            } else {
                // If no theme is stored in localStorage, set default theme to 'light'
                document.documentElement.classList.add('light')
            }
        }

        // Call the function to set the theme when the component mounts
        setThemeOnLoad()

        // Clean up function to remove event listener when component unmounts
        return () => {
            // Remove the theme class to avoid duplication when the component remounts
            document.documentElement.classList.remove('dark', 'light')
        }
    }, [])

    const handleDarkLightMode = () => {
        const currentTheme = localStorage.getItem('theme')
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme', newTheme)

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    const combinedMessagesMap1 = new Map()

    // Add messages from the 'messages' array to the map
    ;(messages || []).forEach(message => {
        combinedMessagesMap1.set(message.id, message)
    })

    // Add messages from the 'chatHistory' array to the map
    chatHistory1.forEach(chat => {
        combinedMessagesMap1.set(chat.id, chat)
    })

    // Get the values from the map to get unique messages by id
    const combinedMessages1 = Array.from(combinedMessagesMap1.values())

    return (
        <AppLayout>
            <SideBar></SideBar>

            <form onSubmit={handleSubmit1} className={'w-full'}>
                <div className="flex flex-col p-4 rounded-xl shadow-xl h-full w-full shadow-denim-300 bg-white dark:bg-gray-700 dark:shadow-gray-700">
                    <div className="flex flex-col justify-center items-end ml-3">
                        <input
                            type="checkbox"
                            name="light-switch"
                            className="w-4 light-switch sr-only"
                        />
                        <label
                            className="relative cursor-pointer p-2"
                            htmlFor="light-switch"
                            onClick={() => handleDarkLightMode()}>
                            <svg
                                className="dark:hidden"
                                viewBox={'0 0 25 25'}
                                width="30"
                                height="30"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    className="fill-slate-300"
                                    d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
                                />
                                <path
                                    className="fill-slate-400"
                                    d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
                                />
                            </svg>
                            <svg
                                className="hidden dark:block"
                                viewBox={'0 0 25 25'}
                                width="30"
                                height="30"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    className="fill-slate-400"
                                    d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
                                />
                                <path
                                    className="fill-slate-500"
                                    d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
                                />
                            </svg>
                            <span className="sr-only">
                                Switch to light / dark version
                            </span>
                        </label>
                    </div>
                    <div
                        className={
                            combinedMessages1.length === 0
                                ? 'p-4 overflow-x-auto h-full flex items-center justify-center'
                                : 'p-4 overflow-x-auto'
                        }>
                        {combinedMessages1.length === 0 && (
                            <div
                                className={
                                    'inset-0 flex items-center justify-center'
                                }>
                                <div className={'flex flex-col items-center'}>
                                    <div
                                        className={
                                            'rounded-full ring-2 ring-denim-600 flex items-center'
                                        }>
                                        <FontAwesomeIcon
                                            className={'p-2'}
                                            icon={faRobot}
                                            style={{
                                                fontSize: '2.2rem',
                                                color: '#1a5fb4',
                                            }}
                                        />
                                    </div>
                                    <div className={'mt-2 text-2xl font-bold'}>
                                        How can I help you today?
                                    </div>
                                </div>
                            </div>
                        )}
                        {isLoading ? (
                            <ReactLoading
                                type={type}
                                color={color}
                                height={60}
                                width={60}
                            />
                        ) : (
                            combinedMessages1.map(chat => (
                                <CSSTransition key={chat.id} classNames="fade">
                                    {chat.role === 'user' ||
                                    chat.type === 'user' ? (
                                        <UserInput key={chat.id}>
                                            <Markdown
                                                remarkPlugins={[
                                                    remarkGfm,
                                                    remarkBreaks,
                                                ]}
                                                className="prose prose-lg max-w-none text-white prose-headings:text-white prose-strong:text-white prose-table:table-fixed">
                                                {chat.content || chat.text}
                                            </Markdown>
                                        </UserInput>
                                    ) : (
                                        <AIOutput key={chat.id}>
                                            <Markdown
                                                remarkPlugins={[
                                                    remarkGfm,
                                                    remarkBreaks,
                                                ]}
                                                className="prose prose-lg max-w-none text-white prose-headings:text-white prose-strong:text-white prose-table:table-fixed">
                                                {chat.content || chat.text}
                                            </Markdown>
                                        </AIOutput>
                                    )}
                                </CSSTransition>
                            ))
                        )}
                        {loading1 && (
                            <div className="flex flex-row">
                                <div
                                    className={
                                        'flex justify-center items-center w-8 h-8 my-6 mr-3 p-1 rounded-full ring-2 ring-denim-600 dark:ring-gray-600'
                                    }>
                                    <FontAwesomeIcon
                                        icon={faRobot}
                                        style={{
                                            fontSize: '1.2rem',
                                            color: '#1a5fb4',
                                        }}
                                    />
                                </div>
                                <div className="pt-2 rounded-2xl text-white w-full whitespace-normal overflow-x-auto pb-2 mb-4 mt-4">
                                    <ReactLoading
                                        type={type}
                                        color={color}
                                        height={60}
                                        width={60}
                                    />
                                </div>
                            </div>
                        )}
                        {error && <Error>{error}</Error>}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="flex items-center p-4 mt-auto rounded-xl border border-gray-200 dark:border-gray-600 w-full">
                        <textarea
                            onChange={e => setUserInput1(e.target.value)}
                            value={userInput1}
                            name={'userInput'}
                            onKeyDown={handleKeyDown1}
                            placeholder={'Write your Question'}
                            className={`appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none resize-none overflow-auto bg-white dark:bg-gray-700 dark:text-white`}
                            required
                            disabled={loading1}
                        />
                        <button
                            type="submit"
                            disabled={loading1}
                            className="ml-2 px-4 py-2 rounded-md bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 disabled:bg-gray-500">
                            Send
                        </button>
                    </div>
                </div>
            </form>
        </AppLayout>
    )
}
