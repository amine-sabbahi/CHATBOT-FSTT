import useSWR from 'swr'
import axios from '@/lib/axios'

const fetcher = url => axios.get(url).then(res => res.data)

const useMessages = (sessionId, conversationId) => {
    const { data, error } = useSWR(
        sessionId && conversationId
            ? `/api/history/${sessionId}/${conversationId}`
            : null,
        fetcher,
    )

    return {
        messages: data,
        isLoading: !error && !data,
        error: error,
    }
}

export default useMessages
