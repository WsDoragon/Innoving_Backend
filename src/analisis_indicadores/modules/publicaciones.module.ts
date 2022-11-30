import { Router } from "express";
import PublicacionesRoute from "./routes/publicaciones.route";

class PublicacionesModule {
    public routes: Router;

    public constructor() {
        this.routes = Router();
        this.routes.use('/publicaciones', PublicacionesRoute)
    }
}

export default new PublicacionesModule();