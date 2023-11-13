import axios from "axios";

const host = "http://localhost:3003"
const baseUrl = "/api/users"

const getAll = async () => {
    const response = await axios.get(host + baseUrl);
    return response.data.sort((a, b) => b.likes - a.likes);
};

export default {getAll};
