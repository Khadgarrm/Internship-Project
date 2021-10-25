import { Router, Request, Response } from "express";
import userController from "../../controllers/user.controller";
import validator from "../../helpers/validator";
import { userMiddleware } from "../../middlewares/auth.middleware";

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
  "/register", validator.userValidator,
  userController.register.bind(userController)
 );

router.post(
  "/login", userController.login.bind(userController)
);

router.get("/", userMiddleware, userController.getAllUsers.bind(userController));

export default router;
