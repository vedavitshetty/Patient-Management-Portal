import axios from 'axios'

// Create a custom Axios instance with a default base URL
const customAxios = axios.create({
  baseURL: 'http://localhost:8000',
})

export default customAxios
