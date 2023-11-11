import axios from "axios";

const host = "http://localhost:3003";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const response = await axios.get(host + baseUrl);
    return response.data.sort((a, b) => b.likes - a.likes);
};

const create = async (blog) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(host + baseUrl, blog, config);
    return response.data;
};

const update = async (id, blog) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.put(`${host}${baseUrl}/${id}`, blog, config);
    return response.data;
};

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.delete(`${host}${baseUrl}/${id}`, config);
    return response.data;
};

export default { getAll, create, setToken, update, remove };
