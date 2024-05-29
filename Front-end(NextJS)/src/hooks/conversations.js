import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from '@/lib/axios';

const useConversations = (sessionId) => {
    const [conversations, setConversations] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const response = await axios.post(`/api/conversations/${sessionId}`);
                //console.log(response.data);
                setConversations(response.data);
                setIsLoading(false);
            } catch (error) {
                //console.log(error);
                setIsLoading(false);
            }
        };

        if (sessionId) {
            fetchConversation();
        }
    }, [sessionId]);

    return { conversations, isLoading , error};
};

export default useConversations;
