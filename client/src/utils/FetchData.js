import axios from 'axios'
const BASE_URL = 'http://localhost:5000';

export const postDataAPI = async (url, post, token) => {

    const res = await axios.post(`${BASE_URL}/${url}`, post,
        {
            headers: { Authorization: token }
        })

    return res;
}

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`${BASE_URL}/${url}`,
        {
            headers: { Authorization: token }
        })

    return res;
}