import axios from "axios";

const host = "http://localhost:3003"
const baseUrl = "/api/users"

const getAll = async () => {
    const response = await axios.get(host + baseUrl)
    return response.data
}

const getOne = async (id) => {
    const all = await getAll()
    return all.find(u => u.id === id)
}

export default {getAll, getOne};
