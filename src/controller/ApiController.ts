import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import ServiceService from "../services/ServiceService";
import DrycleanerService from "../services/DrycleanService";
import OrderService from "../services/OrderService";
import { IFiles } from "../../@types/modules";

class ApiController {
    public async getClients(req: Request, res: Response, next: NextFunction) {
        try {
            const clients = await UserService.getClients();
            res.json(clients);
        } catch (e) {
            next(e);
        }
    }
    public async getServices(req: Request, res: Response, next: NextFunction) {
        try {
            const services = await ServiceService.getServices();
            res.json(services);
        } catch (e) {
            next(e);
        }
    }
    public async getDrycleans(req: Request, res: Response, next: NextFunction) {
        try {
            const drycleans = await DrycleanerService.getDrycleans();
            res.json(drycleans);
        } catch (e) {
            next(e);
        }
    }
    public async getDryclean(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as string;
        try {
            const dryclean = await DrycleanerService.getDryclean(id);
            res.json(dryclean);
        } catch (e) {
            next(e);
        }
    }
    public async getOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await OrderService.getOrders();
            res.json(orders);
        } catch (e) {
            next(e);
        }
    }
    public async getOrder(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as string;
        try {
            const order = await OrderService.getOrder(id);
            res.json(order);
        } catch (e) {
            next(e);
        }
    }

    public async createService(req: Request, res: Response, next: NextFunction) {
        const name = req.body.name;
        const cost = req.body.cost as number;

        try {
            await ServiceService.createService(name, cost);
            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
    public async createDryclean(req: Request, res: Response, next: NextFunction) {
        const name = req.body.name;
        const description = req.body.description;
        const services = req.body.services.split(",");
        //@ts-ignore
        const filesdata = req.files as IFiles;
        if (!filesdata) {
            return next(new Error("Ошибка загрузки файлов"));
        }
        let gallery: Array<string> = [];

        filesdata.gallery.forEach((el) => {
            gallery.push(el.filename);
        });
        const avatar = filesdata.avatar[0].filename;

        try {
            await DrycleanerService.createDryclean({ name, description, services, gallery, avatar });
            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
    public async createOrder(req: Request, res: Response, next: NextFunction) {}
}
export default new ApiController();
