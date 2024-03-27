import axios from 'axios'
import react from 'react'

const baseUrl = "http://localhost:3002/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const post = (newObj) => {
    const request = axios.post(baseUrl,newObj)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const personUrl = `${baseUrl}/${id}`
    return axios.delete(personUrl).then(response => response.data)
}

const update = (id,updatedObj) => {
    const personUrl = `${baseUrl}/${id}`
    return axios.put(personUrl,updatedObj).then(response => response.data)
}
export default {getAll, post,deletePerson,update}