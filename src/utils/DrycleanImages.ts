import { Router, Request } from "express";
import multer, { FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, cb: DestinationCallback) => {
        if (file.fieldname === "avatar") {
            cb(null, "./public/images/avatars");
        } else {
            cb(null, "./public/images/gallery");
        }
    },
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
        cb(null, file.originalname);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
export default multer({ storage, fileFilter }).fields([{ name: "avatar", maxCount: 1 }, { name: "gallery" }]);
