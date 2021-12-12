import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import ServiceService from "../services/ServiceService";
import OrderService from "../services/OrderService";
import { IFiles } from "../../@types/modules";
import ApiError from "../exceptions/ApiError";
import DrycleanService from "../services/DrycleanService";

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
            const drycleans = await DrycleanService.getDrycleans();
            res.json(drycleans);
        } catch (e) {
            next(e);
        }
    }
    public async getDryclean(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as string;
        try {
            const dryclean = await DrycleanService.getDryclean(id);
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
            await DrycleanService.createDryclean({ name, description, services, gallery, avatar });
            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
    public async createOrder(req: Request, res: Response, next: NextFunction) {
        //@ts-ignore
        const userId = req.user.userId;
        const serviceId = req.body.serviceId;
        const service = await ServiceService.getCost(serviceId);
        const user = await UserService.getMoney(userId);
        if (!service) {
            return next(ApiError.BadRequest("Такого сервиса не существует"));
        }
        if (!user) {
            return next(ApiError.BadRequest("Такого пользователя не существует"));
        }
        if (user.money < service.cost) {
            return res.json("Недостаточно денег");
        }

        try {
            await OrderService.createOrder(userId, serviceId);
            await UserService.setMoney(userId, user.money - service.cost);
            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
    public async updateService(req: Request, res: Response, next: NextFunction) {
        const serviceId = req.params.id;
        const name = req.body.name;
        const cost = req.body.cost as number;
        if (!serviceId) {
            next(ApiError.BadRequest("Отсутствует id сервиса"));
        }
        try {
            await ServiceService.updateService(serviceId, { name, cost });
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    public async deleteDryclean(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        if (!id) {
            next(ApiError.BadRequest("Отсутствует id химчистки"));
        }
        try {
            await DrycleanService.deleteById(id);
        } catch (e) {
            next(e);
        }
    }

    public async deleteService(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        if (!id) {
            next(ApiError.BadRequest("Отсутствует id сервиса"));
        }
        try {
            await ServiceService.deleteById(id);
        } catch (e) {
            next(e);
        }
    }
    public async deleteOrder(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        if (!id) {
            next(ApiError.BadRequest("Отсутствует id заказа"));
        }
        try {
            await OrderService.deleteById(id);
        } catch (e) {
            next(e);
        }
    }
    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        if (!id) {
            next(ApiError.BadRequest("Отсутствует id пользователя"));
        }
        try {
            await UserService.deleteById(id);
        } catch (e) {
            next(e);
        }
    }
}
export default new ApiController();
