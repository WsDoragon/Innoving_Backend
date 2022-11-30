import { Router } from "express";

import IndicadoresController from "../controllers/indicadores.controller";

class IndicadoresRoute {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/', IndicadoresController.getIndicador);
    }
}

export default new IndicadoresRoute().router;