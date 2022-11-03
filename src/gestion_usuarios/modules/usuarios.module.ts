import { Router } from 'express';
import UsuariosRoute from './routes/usuarios.route';
//MODULO USUARIO, LAS RUTAS DEL USUARIO ESTAN EN LA CARPETA routes
class UsuarioModule {

    public routes: Router;

    public constructor() {
        this.routes = Router();
        this.routes.use('/users', UsuariosRoute);
    }
}

export default new UsuarioModule();