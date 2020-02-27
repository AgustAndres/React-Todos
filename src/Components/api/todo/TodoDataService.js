import axios from 'axios'
import {  USED_URL } from "../../../Constants"

class TodoDataService{
   

    retrieveAllTodos(name){
        return axios.get(`${USED_URL }/users/${name}/todos`)
     }

     deleteTodo(name, id){
        return axios.delete(`${USED_URL }/users/${name}/todos/${id}`)
     }

     retrieveTodo(name, id){
        return axios.get(`${USED_URL }/users/${name}/todos/${id}`)
     }

     updateTodo(name, id, todo){
      return axios.put(`${USED_URL }/users/${name}/todos/${id}`, todo)
     }
     createTodo(name, todo){
      return axios.post(`${USED_URL }/users/${name}/todos`, todo)
     }
}

export default new TodoDataService()