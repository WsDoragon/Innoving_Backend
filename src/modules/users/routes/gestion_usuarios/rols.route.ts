import { Router } from 'express';
import RolController from '../../controllers/gestion_usuarios/rols.controllers';
//AÑADIR RUTAS SEGUN LA CONSULTA QUE NECESITEN
class RolsRoute {

    public router: Router;

    constructor() {
        this.router = Router();
    }
}

export default new RolsRoute().router;