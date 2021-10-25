import { check, validationResult } from "express-validator/check";
import { Response } from "express";

class Validator {
    toDoValidator = () => {
        return [
            check("title, description", " Fill in the required field").not().isEmpty(),
            check("description", " Fill in the required field").not().isEmpty(),
            check("date", " Fill in the required field").not().isEmpty().isNumeric(),
            check("isPublic").toBoolean(),
            check("isCompleted").toBoolean(),
        ]
    }

    reqValidator = async (res: Response, callback: Function) => {
        try {
            const result = await callback()
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    userValidator = () => {
        return [
            check("email", "Incorrect email").isEmail(),
            check("username").not().isEmpty(),
            check("password", "Аt least 4 letters but not more than 8 please)").isLength({min: 4, max: 8})
        ]
    }
}

const validator = new Validator();
export default validator;


