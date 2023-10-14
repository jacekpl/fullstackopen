import axios from "axios";

const baseUrl = '/api'

const getAll = () => {
    const request = axios.get(baseUrl + '/persons')
    return request.then(response => response.data)
}

const create = (newPerson) => {
    return axios.post(baseUrl + '/persons', newPerson).then(response => response.data)
}

const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/persons/${id}`, newPerson).then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/persons/${id}`).then(response => response.data)
}

export default {getAll, create, update, deletePerson}