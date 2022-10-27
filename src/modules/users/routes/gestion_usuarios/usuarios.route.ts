import { Router } from 'express';
import UsuarioController from '../../controllers/gestion_usuarios/usuarios.controllers';

class UsuariosRoute {

    public router: Router;

    constructor() {
        this.router = Router();
        this.router.post('/', UsuarioController.addUsuario);
        this.router.get('/', UsuarioController.getUsuarios);
        this.router.get('/search', UsuarioController.searchUsuarios);
        this.router.get('/:id', UsuarioController.getUsuario);
        this.router.post('/login',UsuarioController.loginUsuario);
    }
}

export default new UsuariosRoute().router;