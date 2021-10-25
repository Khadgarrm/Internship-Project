import { Document, Model, model, Schema } from "mongoose";
// TODO: Use it as an example
/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param username:string
 * @param date:string
 */
export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User: Model<IUser> = model("User", userSchema);

export default User;
