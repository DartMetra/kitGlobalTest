import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import ApiController from "../controller/ApiController";

const apiRouter = Router();

apiRouter.get("/clients", ApiController.getClients);
apiRouter.get("/services", ApiController.getServices);
apiRouter.get("/drycleans", ApiController.getDrycleans);
apiRouter.get("/orders", ApiController.getOrders);

export default apiRouter;
