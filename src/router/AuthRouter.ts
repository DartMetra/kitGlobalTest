import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import AuthController from "../controller/AuthController";
import { body } from "express-validator";

const authRouter = Router();
//register
authRouter.post("/register", body("email").isEmail(), body("password").isLength({ min: 4, max: 32 }), AuthController.registerUser);
//auth
authRouter.post("/login");
//refresh session
authRouter.post("/refresh");
//logout
authRouter.post("/logout");
// send pass update email
authRouter.post("/passwordrecovery"); //body: email

//update password
authRouter.post("/updatepassword"); // body: email, new password

export default authRouter;
