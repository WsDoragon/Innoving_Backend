import { Router } from 'express';
import RolUsuarioController from '../controllers/rol_usuarios.controllers';
//AÑADIR RUTAS SEGUN LA CONSULTA QUE NECESITEN
class RolUsuariosRoute {

    public router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/all', RolUsuarioController.getRolUsuarios);
        this.router.post('/add', RolUsuarioController.addRolUsuarios);
        this.router.post('/change', RolUsuarioController.changeRolUsuarios);
        this.router.get('/', RolUsuarioController.findRolUsuarios);
    }
}

export default new RolUsuariosRoute().router;