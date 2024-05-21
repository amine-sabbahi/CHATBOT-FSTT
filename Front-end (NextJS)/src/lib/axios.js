  import Axios from "axios";
import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss'

const axios = Axios.create({
    baseURL: process.env.LLM_BASE_URL,

})

export default axios