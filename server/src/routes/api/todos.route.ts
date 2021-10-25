import { Router } from "express";
import validator from "../../helpers/validator";

import todoController, { TodoController } from "../../controllers/todo.controller";

const todoRouter: Router = Router();

todoRouter.get("/", todoController.getAllTodo.bind(todoController));

todoRouter.post("/",
    validator.toDoValidator(),
    todoController.createTodo.bind(todoController));

todoRouter.put("/:id", todoController.updateTodo.bind(todoController));

todoRouter.delete("/:id", todoController.removeTodo.bind(todoController));

export default todoRouter;
