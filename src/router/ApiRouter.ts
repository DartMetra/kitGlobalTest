import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import ApiController from "../controller/ApiController";
import { body } from "express-validator";
import upload from "../utils/DrycleanImages";

const apiRouter = Router();

apiRouter.get("/clients", ApiController.getClients);
apiRouter.get("/services", ApiController.getServices);
apiRouter.get("/drycleans", ApiController.getDrycleans);
apiRouter.get("/drycleans/:id", ApiController.getDryclean);
apiRouter.get("/orders", ApiController.getOrders);
apiRouter.get("/orders/:id", ApiController.getOrder);

apiRouter.post("/services", body("name").isLength({ min: 3 }), body("cost").isDecimal(), ApiController.createService);
apiRouter.post("/drycleans", upload, ApiController.createDryclean);
apiRouter.post("/orders", ApiController.createOrder);

export default apiRouter;
