import axios from 'axios'
const host = 'http://localhost:3003'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(host + baseUrl)
  return response.data
}

export default { getAll }