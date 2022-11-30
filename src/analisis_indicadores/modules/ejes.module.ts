import { Router } from "express";
import EjesRoute from "./routes/ejes.route";

class EjesModule {
    public routes: Router;

    public constructor() {
        this.routes = Router();
        this.routes.use('/ejes', EjesRoute);
    }
}

export default new EjesModule;