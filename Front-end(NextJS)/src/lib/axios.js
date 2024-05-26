import Axios from "axios";
import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss'

const axios = Axios.create({
    baseURL: "http://127.0.0.1:5000",
    headers: {
        'Content-Type': "application/json",
        //'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: false,
})

export default axios

