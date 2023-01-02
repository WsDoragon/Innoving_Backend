import { Router } from "express";
import ejesControllers from "../controllers/ejes.controllers";

class EjeRouter {
    public router : Router;

    constructor(){
        this.router = Router();
        this.router.get("/lista",ejesControllers.getEjes);
    }
}

export default new EjeRouter().router;

