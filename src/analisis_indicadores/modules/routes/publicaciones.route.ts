import { Router } from "express";
import publicacionesController from "../controllers/publicaciones.controller";

class PublicacionesRoute {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/', publicacionesController.getPublicaciones);
        this.router.post('/:idPublicacion/asignar-variables', publicacionesController.setVariables);
    }
}

export default new PublicacionesRoute().router;