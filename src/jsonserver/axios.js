import axios from 'axios'

const getTodos = async() => {
  try {
    const request = await axios.get('http://localhost:3000/todos')
    return request.data
  } catch (e){
    console.error('error : ',e.error)
  }
}

const addTodo = async(todo) =>{
  try {
    await axios.post('http://localhost:3000/todos',todo);
  }catch(e){
    console.error('error : ',e.error)
  }
}
const updateTodo = async(todo) =>{
  console.log('awefawefawefawef',todo)
  try {
    await axios.put(`http://localhost:3000/todos/${todo.id}`,todo);
  }catch(e){
    console.error('error : ',e.error)
  }
}
const deleteTodo = async(id) =>{
  try {
    await axios.delete(`http://localhost:3000/todos/${id}`);
  }catch(e){
    console.error('error : ',e.error)
  }
}

export default {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
}