import axios from 'axios'

export const fetchPosts = async () => {
    try {
        const response = await axios.get('http://localhost:3001/posts')
        return response.data
    } catch (err) {
        // eslint-disable-next-line
        throw { error: true, message: 'Something went wrong', code: err.code }
    }
}