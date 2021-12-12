import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import ApiController from "../controller/ApiController";
import { body } from "express-validator";
import upload from "../utils/DrycleanImages";

const apiRouter = Router();

apiRouter.get("/clients", authMiddleware.checkAuth, authMiddleware.isAdmin, ApiController.getClients);
apiRouter.get("/services", ApiController.getServices);
apiRouter.get("/drycleans", ApiController.getDrycleans);
apiRouter.get("/drycleans/:id", ApiController.getDryclean);
apiRouter.get("/orders", ApiController.getOrders);
apiRouter.get("/orders/:id", ApiController.getOrder);

apiRouter.post("/services", authMiddleware.checkAuth, authMiddleware.isAdmin, body("name").isLength({ min: 3 }), body("cost").isDecimal(), ApiController.createService);
apiRouter.post("/drycleans", authMiddleware.checkAuth, authMiddleware.isAdmin, upload, ApiController.createDryclean);
apiRouter.post("/orders", authMiddleware.checkAuth, ApiController.createOrder);

apiRouter.put("/services/:id", authMiddleware.checkAuth, authMiddleware.isAdmin, ApiController.updateService);

apiRouter.delete("/services/:id", authMiddleware.checkAuth, authMiddleware.isAdmin, ApiController.deleteService);
apiRouter.delete("/drycleans/:id", authMiddleware.checkAuth, authMiddleware.isAdmin, ApiController.deleteDryclean);
apiRouter.delete("/orders/:id", authMiddleware.checkAuth, authMiddleware.isAdmin, ApiController.deleteOrder);
apiRouter.delete("/user/:id", authMiddleware.checkAuth, authMiddleware.isAdmin, ApiController.deleteUser);

export default apiRouter;
