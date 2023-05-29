import axios from "axios";

const BASE_URL = "https://645e38b68d08100293f9eb86.mockapi.io/todos/todoapp";

export const todoServers ={
    get: (value)=> axios.get(BASE_URL+`?value=${value || ""}`),
    post: (newTodo)=> axios.post(BASE_URL, newTodo),
    delete:(id)=> axios.delete(BASE_URL + '/' + id),
    update: (id, value)=> axios.put(`${BASE_URL}/${id}`, value ),
}