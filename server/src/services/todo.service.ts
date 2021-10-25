import { Response, Request } from "express";
import Todo from "../models/Todo"
import paginetedResult from "../helpers/paginetedResult";


export default class TodoService {

    async findAll(query: unknown) {
        const { skip, options, page } = paginetedResult(query);
        const allTodos = await Todo.find(options)
        const todos = await Todo.find(options).limit(5).skip(skip);
        const totalPages = Math.ceil(allTodos.length / 5);
        const data = {
            data: todos,
            totalPages,
            page,
        };
        return data;
    }

    async createOne(req: Request, res: Response) {
        const { title, description, date, isPublic, isCompleted } = req.body

        const todo = await new Todo({
            title,
            description,
            date,
            isPublic,
            isCompleted
        })

        await todo.save()
        return todo
    }

    async updateOne(req: Request) {
        const { title, description, date, isPublic, isCompleted } = req.body

        const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, {
            title: title,
            description: description,
            date: date,
            isPublic: isPublic,
            iscompleted: isCompleted
        })

        await todo!.save()
        return todo
    }

    async removeOne(id: String) {
        const todo = await Todo.findOneAndDelete({ _id: id })
        return todo
    }
}