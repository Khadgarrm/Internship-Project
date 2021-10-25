import { Response, Request } from "express";
import UserService from "../services/user.service";
import validator from "../helpers/validator";
import { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import HttpStatusCodes from "http-status-codes";

export class UserController {
    constructor(private userService: UserService) { }

    async getAllUsers(_: Request, res: Response) {

        await validator.userValidator(res, () => this.userService.findAll());
    }

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user: IUser = await this.userService.findOne(username);
            if (!user) {
                return res.status(400).json({ message: `User ${username} is not found` });
            }
            const passwordValidator = bcrypt.compareSync(password, user.password);
            if (!passwordValidator) {
                return res.status(400).json({ message: "Password is not valid" });
            }
            const token = this.userService.createToken(user.id, user.email, user.username);
            return res.send(token);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Login Error");
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { email, username, password } = req.body;
            const candidate: IUser = await this.userService.findOne(username);
            if (candidate) {
                return res.status(400).json({ message: "This user already exists" });
            }

            const hashPassword = bcrypt.hashSync(password, 10);
            const user: IUser = await this.userService.createUser(email, username, hashPassword);

            await user.save();
            return res.send(user);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Registration Error");
        }
    }
}

const userController = new UserController(new UserService());
export default userController;
