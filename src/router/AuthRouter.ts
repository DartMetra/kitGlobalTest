import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import AuthController from "../controller/AuthController";
import { body, param } from "express-validator";
import validationResultMiddleware from "../middleware/validationResult.middleware";

const authRouter = Router();
//register
authRouter.post("/register", body("email").isEmail(), body("password").isLength({ min: 4, max: 32 }), validationResultMiddleware, AuthController.registerUser);
//auth
authRouter.post("/login", body("email").isEmail(), body("password").isLength({ min: 4, max: 32 }), validationResultMiddleware, AuthController.login);
//refresh session
authRouter.post("/refresh", AuthController.refreshSession);
//logout
authRouter.post("/logout", AuthController.logout);
// send pass update email
authRouter.post("/passwordrecovery", body("email").isEmail(), validationResultMiddleware, AuthController.sendPasswordRecoveryEmail); //body: email

//update password
authRouter.post("/updatepassword/:updatePassId", param("updatePassId").isUUID(4), body("email").isEmail(), body("password").isLength({ min: 4, max: 32 }), validationResultMiddleware, AuthController.updatePassword); // body: email, new password

export default authRouter;
