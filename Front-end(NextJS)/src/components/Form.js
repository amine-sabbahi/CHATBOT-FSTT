import Input from '@/components/Input';
import { useState } from 'react';
import axios from '@/lib/axios'

const Form = ({ children }) => {
    const [userInput, setUserInput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios
            .post('/query', {
                query: userInput,
            })

        if (response) {
            console.log(response)
        }

    };

    const handleKeyDown = async (e) => {
        // Check if Shift + Enter are pressed
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col p-4 rounded-xl overflow-x-auto shadow-xl h-full shadow-denim-300">
                <div className="p-4">
                    {children}
                </div>
                <div className="flex items-center p-4 mt-auto rounded-xl border border-gray-200">
                    <textarea
                        onChange={e => setUserInput(e.target.value)}
                        name={"userInput"}
                        onKeyDown={handleKeyDown}
                        placeholder={"Write your Question"}// Use the custom handler for input change
                        className={`appearance-none rounded  w-full py-2 px-3 text-gray-700 leading-tight outline-none resize-none overflow-auto`}
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
