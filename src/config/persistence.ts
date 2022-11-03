import { Dialect, Sequelize } from 'sequelize'
import UsuarioModel from '../gestion_usuarios/persistence/models/usuario.model'
import RolModel from '../gestion_usuarios/persistence/models/rol.model'
import RolUsuarioModel from '../gestion_usuarios/persistence/models/rol_usuario.model'
import dotenv from 'dotenv'

class Persistence {

    public persistence: any;
    public production: boolean = false;

    constructor() {
        dotenv.config();
        
        this.production = process.env.NODE_ENV === 'production'
        console.log(process.env.DB_USER)
        this.persistence = new Sequelize(
            <string> process.env.DB_NAME,
            <string> process.env.DB_USER,
            <string> process.env.DB_PASSWORD,
            {
                host: <string> process.env.DB_HOST,
                dialect: <Dialect> process.env.DB_DRIVER
            }
        );

        this.persistence.sync({alter: true}).then((result: any) => {
            console.log('synced');
        });


    }

}

export default new Persistence().persistence