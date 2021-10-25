import { Response, Request } from "express";
import TodoService from "../services/todo.service";
import validator from "../helpers/validator";

export class TodoController {
    constructor(private todoService: TodoService) { }

    async getAllTodo(req: Request, res: Response) {

        await validator.reqValidator(res, () => this.todoService.findAll(req.query));
    }

    async createTodo(_: Request, res: Response) {

        await validator.reqValidator(res, () => this.todoService.createOne(_, res));
    }

    async updateTodo(_: Request, res: Response) {

        await validator.reqValidator(res, () => this.todoService.updateOne(_));
    }

    async removeTodo(_: Request, res: Response) {

        await validator.reqValidator(res, () => this.todoService!.removeOne(_.params.id));
    }

}

const todoController = new TodoController(new TodoService());
export default todoController;