import React, { useEffect, useState, useRef } from 'react'
import axios from '@/lib/axios'
import AIOutput from '@/components/AIOutput'
import UserInput from '@/components/UserInput'
import ReactLoading from 'react-loading'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid' // Import UUID library
import Error from '@/components/Error'
import { CSSTransition } from 'react-transition-group'
import useMessages from '@/hooks/messages'
import { mutate } from 'swr'
import { useRouter } from 'next/router'

const Form = () => {
    const [userInput, setUserInput] = useState('')
    const [chatHistory, setChatHistory] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [sessionId, setSessionId] = useState(null)
    const [conversationId, setConversationId] = useState(null)
    const chatEndRef = useRef(null)

    // Fetch History data
    const { messages, isLoading } = useMessages(sessionId, conversationId)
    const router = useRouter()

    useEffect(() => {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [chatHistory, messages])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedSessionId = localStorage.getItem('sessionId')
            if (savedSessionId) {
                setSessionId(savedSessionId)
            } else {
                const newSessionId = uuidv4()
                localStorage.setItem('sessionId', newSessionId)
                setSessionId(newSessionId)
            }

            const newConversationId = uuidv4()
            //localStorage.setItem('conversationId', newConversationId);
            setConversationId(newConversationId)
        }
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        const id = uuidv4()

        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { type: 'user', text: userInput, id: id },
        ])

        setLoading(true)
        try {
            const res = await axios.post('/query', {
                query: userInput,
                sessionId: sessionId,
                conversationId: conversationId,
                id: id,
            })

            setChatHistory(prevChatHistory => [
                ...prevChatHistory,
                { type: 'ai', text: res.data.ai, id: res.data.messageId },
            ])
            setUserInput('')
            setLoading(false)
            setError(null)
            mutate(`/api/conversations/${sessionId}`)
            router.push(`/conversation/${conversationId}`)
        } catch (error) {
            setError(error.message)
            setUserInput('')
            setLoading(false)
        }
    }

    const handleKeyDown = async e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            await handleSubmit(e)
            setUserInput('')
        }
    }

    const type = 'bubbles'
    const color = '#1a5fb4'

    const combinedMessagesMap = new Map()

    // Add messages from the 'messages' array to the map
    ;(messages || []).forEach(message => {
        combinedMessagesMap.set(message.id, message)
    })

    // Add messages from the 'chatHistory' array to the map
    chatHistory.forEach(chat => {
        combinedMessagesMap.set(chat.id, chat)
    })

    // Get the values from the map to get unique messages by id
    const combinedMessages = Array.from(combinedMessagesMap.values())

    return (
        <form onSubmit={handleSubmit} className={'w-full'}>
            <div className="flex flex-col p-4 rounded-xl shadow-xl h-full w-full shadow-denim-300 bg-white dark:bg-gray-700 dark:shadow-gray-700">
                <div
                    className={
                        combinedMessages.length === 0
                            ? 'p-4 overflow-x-auto h-full flex items-center justify-center'
                            : 'p-4 overflow-x-auto'
                    }>
                    {combinedMessages.length === 0 && (
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
                        combinedMessages.map(chat => (
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
                    {loading && (
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
                        onChange={e => setUserInput(e.target.value)}
                        value={userInput}
                        name={'userInput'}
                        onKeyDown={handleKeyDown}
                        placeholder={'Write your Question'}
                        className={`appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none resize-none overflow-auto bg-white dark:bg-gray-700`}
                        required
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="ml-2 px-4 py-2 rounded-md bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 disabled:bg-gray-500">
                        Send
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Form
