import { Router } from 'express';
import RolsRoute from './../routes/gestion_usuarios/rols.route';

class RolModule {

    public routes: Router;

    public constructor() {
        this.routes = Router();
        this.routes.use('/rol', RolsRoute);
    }
}

export default new RolModule();