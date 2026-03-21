import axios from 'axios'

const api = axios.create({
	baseURL: "http://localhost:3000", // TODO : hange this to your backend URL if different
})

export default api
