import { Router } from "express";
import { container } from "@example-api/config/inversify";
import {
  UserSignupController,
  UserSigninController,
} from "@example-api/controllers";

const signup = container.get(UserSignupController);
const signin = container.get(UserSigninController);

const userRouter = Router();

userRouter.post("/signin", (req, res) => signin.execute(req, res));

userRouter.post("/signup", (req, res) => signup.execute(req, res));


export { userRouter };
