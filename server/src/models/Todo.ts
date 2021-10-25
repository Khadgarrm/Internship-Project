import { Document, PaginateModel, model, Schema } from "mongoose"
import { mongoosePagination } from "ts-mongoose-pagination";

export interface ITodo extends Document {
    title: string
    description: string
    date: number
    isPublic: boolean
    isCompleted: boolean
}

const todoSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date().getFullYear()
    },
    isPublic: {
        type: Boolean
    },
    isCompleted: {
        type: Boolean
    }
});

todoSchema.plugin(mongoosePagination);
const Todo: PaginateModel<ITodo> = model("Todo", todoSchema)

export default Todo;