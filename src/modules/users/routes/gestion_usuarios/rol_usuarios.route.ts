import { Router } from 'express';
import RolUsuarioController from '../../controllers/gestion_usuarios/rol_usuarios.controllers';
//AÑADIR RUTAS SEGUN LA CONSULTA QUE NECESITEN
class RolUsuariosRoute {

    public router: Router;

    constructor() {
        this.router = Router();
    }
}

export default new RolUsuariosRoute().router;