import React, { useEffect, useState, Suspense } from 'react';
import axios from '@/lib/axios';
import AIOutput from "@/components/AIOutput";
import UserInput from "@/components/UserInput";
import useSWR from "swr";

const Form = ({ children }) => {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSubmit = async (e) => {
        e.preventDefault();

        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { type: "user", text: userInput },
        ]);

        setLoading(true); // Set loading state to true

        const response = await axios.post('/query', {
            query: userInput,
        });

        if (response) {
            setChatHistory(prevChatHistory => [
                ...prevChatHistory,
                { type: "ai", text: response.data.ai }
            ]);
            setUserInput(""); // Clear input field after submitting
        }

        setLoading(false); // Set loading state back to false after data fetching
    };

    const handleKeyDown = async (e) => {
        // Check if Shift + Enter are pressed
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
        }
    };

    useEffect(() => {
        console.log(chatHistory);
    }, [chatHistory]);

    return (
        <form onSubmit={handleSubmit} className={"w-full"}>
            <div className="flex flex-col p-4 rounded-xl shadow-xl h-full w-full shadow-denim-300 bg-white dark:bg-gray-700 dark:shadow-gray-700">
                <div className="p-4 overflow-x-auto">
                    {chatHistory.map((chat, index) => (
                        chat.type === "user" ? (
                            <UserInput key={index}>{chat.text}</UserInput>
                        ) : (
                            <AIOutput key={index}>{chat.text}</AIOutput>
                        )
                    ))}
                    <Suspense fallback={<div>Loading...</div>}> {/* Wrap the component in Suspense */}
                        {loading && <div>Loading...</div>}
                    </Suspense>
                </div>
                <div className="flex items-center p-4 mt-auto rounded-xl border border-gray-200 dark:border-gray-600 w-full">
                    <textarea
                        onChange={e => setUserInput(e.target.value)}
                        value={userInput} // Bind input value to state
                        name={"userInput"}
                        onKeyDown={handleKeyDown}
                        placeholder={"Write your Question"}
                        className={`appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none resize-none overflow-auto bg-white dark:bg-gray-700`}
                        required
                    />
                    <button type="submit"
                            className="ml-2 px-4 py-2 rounded-md bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600">
                        Send
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Form;
