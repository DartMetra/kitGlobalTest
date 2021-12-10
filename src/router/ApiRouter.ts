import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import ApiController from "../controller/ApiController";

const apiRouter = Router();

//get clients list
apiRouter.get("/users");
//get client
apiRouter.get("/users/:id");
//get orders list
apiRouter.get("/orders");

//get drycleans list
apiRouter.get("/drycleans");
//get dryclean
apiRouter.get("/drycleans/:id");
//get services
apiRouter.get("/services");
//add order
apiRouter.post("/orders");
//add service
apiRouter.post("/service");
//add dryclean
apiRouter.post("/drycleans");
//upd service
apiRouter.patch("/services/:id");
//upd dryclean
apiRouter.patch("/drycleans/:id");

apiRouter.patch("/orders/:id");

export default apiRouter;
