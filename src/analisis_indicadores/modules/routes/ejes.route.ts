import { Router } from "express";
import EjesController from "../controllers/ejes.controller";


class EjesRoute {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/',EjesController.getEjes) 
    }
}

export default new EjesRoute().router;