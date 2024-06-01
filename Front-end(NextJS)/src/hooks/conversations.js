import useSWR from 'swr'
import axios from '@/lib/axios'

const fetcher = async url => {
    const response = await axios.post(url)
    return response.data
}

const useConversations = sessionId => {
    const { data: conversations, error } = useSWR(
        sessionId ? `/api/conversations/${sessionId}` : null,
        fetcher,
    )

    return {
        conversations: conversations || [],
        isLoading: !error && !conversations,
        error: error,
    }
}

export default useConversations
