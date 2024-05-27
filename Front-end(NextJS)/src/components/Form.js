import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import AIOutput from "@/components/AIOutput";
import UserInput from "@/components/UserInput";
import ReactLoading from 'react-loading';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

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
            setUserInput("");
        }

        setLoading(false);
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
# Markdown Table Test

This is a table with some data:

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   |  Cell 2  |
| Cell 3   | Cell 4   |
| Cell 5   | Cell 6   |

End of table.
    `;
    return (
        <form onSubmit={handleSubmit} className={"w-full"}>
            <div className="flex flex-col p-4 rounded-xl shadow-xl h-full w-full shadow-denim-300 bg-white dark:bg-gray-700 dark:shadow-gray-700">

                <div className="p-4 overflow-x-auto">
                    {chatHistory.map((chat, index) => (
                        chat.type === "user" ? (
                            <UserInput key={index}><Markdown remarkPlugins={[remarkGfm, remarkBreaks]} className="prose prose-lg max-w-none text-white prose-headings:text-white">{chat.text}</Markdown></UserInput>
                        ) : (
                            <AIOutput key={index}><Markdown remarkPlugins={[remarkGfm, remarkBreaks]} className="prose prose-lg max-w-none text-white prose-headings:text-white prose-strong:text-white prose-table:table-fixed">{chat.text}</Markdown></AIOutput>
                        )
                    ))}
                    {loading &&
                        <div className={"flex flex-row"}>
                            <div>
                                <img
                                    className="w-8 h-8 my-6 mr-3 p-1 rounded-full ring-2 ring-denim-600 dark:ring-gray-600"
                                    src="https://fstt.ac.ma/Portail2023/wp-content/uploads/2023/03/fst-1024x383.png"
                                    alt="Rounded avatar"/>
                            </div>
                            <div className={'pt-2rounded-2xl text-white w-full whitespace-normal overflow-x-auto pb-2 mb-4 mt-4'}>
                                <ReactLoading type={type} color={color} height={60} width={60} />
                            </div>
                        </div>
                    }
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
