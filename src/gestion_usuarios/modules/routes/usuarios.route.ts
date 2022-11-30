import { Router } from 'express';
import UsuarioController from '../controllers/usuarios.controllers';

class UsuariosRoute {

    public router: Router;

    constructor() {
        this.router = Router();
        this.router.put('/edit', UsuarioController.editUsuario);
        this.router.post('/create', UsuarioController.addUsuario);
        this.router.get('/all',UsuarioController.getAllUsers);
        this.router.get('/allEnabled',UsuarioController.getEnabledUsers);
        this.router.get('/allDisabled',UsuarioController.getDisabledUsers);
        this.router.get('/search', UsuarioController.searchUsuarios);
        this.router.get('/', UsuarioController.getUsuario);
        this.router.post('/login',UsuarioController.loginUsuario);
        this.router.put('/disable',UsuarioController.disableUser);
        this.router.put('/enable',UsuarioController.enableUser);
        this.router.get('/allProv',UsuarioController.getAllProv);
        this.router.get('/allInnov',UsuarioController.getAllInnov);

        this.router.post('/passwordReset', UsuarioController.resetPassword1);
    }
}

export default new UsuariosRoute().router;