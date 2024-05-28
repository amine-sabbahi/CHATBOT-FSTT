import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import AIOutput from "@/components/AIOutput";
import UserInput from "@/components/UserInput";
import ReactLoading from 'react-loading';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

import Error from '@/components/Error'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Form = ({ children }) => {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state
    const [error , setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();

        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { type: "user", text: userInput },
        ]);

        setLoading(true); // Set loading state to true

        await axios.post('/query', {
            query: userInput,
        })
        .then(res => {
            setChatHistory(prevChatHistory => [
                ...prevChatHistory,
                { type: "ai", text: res.data.ai }
            ]);
            setUserInput("");
            setLoading(false);
            setError(null)
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

    useEffect(() => {
        console.log(chatHistory);
    }, [chatHistory]);

    const type = "bubbles"; // Define the type of loading animation
    const color = "#1a5fb4"; // Define the color of the loading animation
    const markdown = `
\`\`\`python
# This Python code calculates the sum of two numbers.

# Get the two numbers from the user.
num1 = int(input("Enter the first number: "))
num2 = int(input("Enter the second number: "))

# Calculate the sum of the two numbers.
sum = num1 + num2

# Print the sum of the two numbers.
print("The sum of", num1, "and", num2, "is", sum)
\`\`\`


`;

    return (
        <form onSubmit={handleSubmit} className={"w-full"}>
            <div className="flex flex-col p-4 rounded-xl shadow-xl h-full w-full shadow-denim-300 bg-white dark:bg-gray-700 dark:shadow-gray-700">
                <div className="p-4 overflow-x-auto">
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
                </div>
                <div
                    className="flex items-center p-4 mt-auto rounded-xl border border-gray-200 dark:border-gray-600 w-full">
                    <textarea
                        onChange={e => setUserInput(e.target.value)}
                        value={userInput} // Bind input value to state
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
