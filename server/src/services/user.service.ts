import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "config";

export default class UserService {
    async findAll() {
        return await User.find();
    }
    async findOne(username: string) {
        return await User.findOne({ username });
    }
    async createUser(email: string, password: string, username: string) {
        return await new User({ email, username, password });
    }
    createToken = (id: string, username: string, password: string) => {
        const payload = {
            id,
            username,
            password,
        };
        return jwt.sign(payload, config.get("jwtSecret"), { expiresIn: "24h" });
    };
}
