import axios from 'axios';

export interface ITodo {
    _id: string;
    title?: string;
    description?: string;
    date?: number;
    isPublic: boolean;
    isCompleted: boolean;
};

export const fetchService = axios.create({
  baseURL: 'http://localhost:5000/api',
});

class ToDoService {
  constructor() { }

  async getAllTodos() {
    const response = await fetchService.get<Array<ITodo>>('todos/');
    return response;
  }

  async getTodoById(_id: string) {
    const response = await fetchService.get<ITodo>(`todos/${_id}`);
    return response;
  }

  async createTodo(todo: ITodo) {
    const response = await fetchService.post('todos/', todo);
    return response;
  }

  async updateTodo(todo: ITodo) {
    const response = await fetchService.put(`todos/${todo._id}`, todo);
    return response;
  }

  async removeTodo(_id: string) {
    const response = await fetchService.delete(`todos/${_id}`);
    return response;
  }
}

const toDoService = new ToDoService();

export default toDoService;
