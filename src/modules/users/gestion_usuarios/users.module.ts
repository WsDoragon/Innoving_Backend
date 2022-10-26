import { Router } from 'express';
import UsersRoute from './../routes/gestion_usuarios/users.route';

class UserModule {

    public routes: Router;

    public constructor() {
        this.routes = Router();
        this.routes.use('/test', UsersRoute);
    }
}

export default new UserModule();