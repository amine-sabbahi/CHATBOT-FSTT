import { useState, useEffect } from 'react';
import axios from '@/lib/axios';

const useMessages = (sessionId, conversationId) => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/history/${sessionId}/${conversationId}`);
                setMessages(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (sessionId && conversationId) {
            fetchMessages();
        }
    }, [sessionId, conversationId]);



    return { messages, isLoading, error };
};

export default useMessages;
