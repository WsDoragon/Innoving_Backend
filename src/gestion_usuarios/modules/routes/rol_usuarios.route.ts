import { Router } from 'express';
import RolUsuarioController from '../controllers/rol_usuarios.controllers';
//AÑADIR RUTAS SEGUN LA CONSULTA QUE NECESITEN
class RolUsuariosRoute {

    public router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/', RolUsuarioController.getRolUsuarios);
    }
}

export default new RolUsuariosRoute().router;