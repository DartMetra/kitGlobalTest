import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import ServiceService from "../services/ServiceService";
import DrycleanerService from "../services/DrycleanService";
import OrderService from "../services/OrderService";

class ApiController {
    public async getClients(req: Request, res: Response, next: NextFunction) {
        const clients = await UserService.getClients();
        res.json(clients);
    }
    public async getServices(req: Request, res: Response, next: NextFunction) {
        const services = await ServiceService.getServices();
        res.json(services);
    }
    public async getDrycleans(req: Request, res: Response, next: NextFunction) {
        const drycleans = await DrycleanerService.getDrycleans();
        res.json(drycleans);
    }
    public async getOrders(req: Request, res: Response, next: NextFunction) {
        const orders = await OrderService.getOrders();
        res.json(orders);
    }
}
export default new ApiController();
