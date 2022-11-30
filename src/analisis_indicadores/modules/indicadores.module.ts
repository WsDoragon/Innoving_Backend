import { Router } from "express";
import indicadoresRoute from "./routes/indicadores.route";


class IndicadoresModule {
    public routes: Router;

    public constructor() {
        this.routes = Router();
        this.routes.use('/indicadores', indicadoresRoute);
    }
}

export default new IndicadoresModule();