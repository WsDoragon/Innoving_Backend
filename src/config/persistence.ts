import { Dialect, Sequelize } from 'sequelize'
import dotenv from 'dotenv'

class Persistence {

    public persistence: any;
    public production: boolean = false;

    constructor() {
        dotenv.config();
        console.log("soy yo en persistence:",process.env.DB_HOST, process.env.PORT , process.env.DB_PASSWORD)
        
        this.production = process.env.NODE_ENV === 'production'
        console.log(process.env.DB_USER)
        this.persistence = new Sequelize(
            <string> process.env.DB_NAME,
            <string> process.env.DB_USER,
            <string> process.env.DB_PASSWORD,
            {
                host: <string> process.env.DB_HOST,
                dialect: <Dialect> process.env.DB_DRIVER,

                dialectOptions: {
                    socketPath: "/var/run/mysqld/mysqld.sock"
                }
                
            }
        );

        this.persistence.sync({alter: true}).then((result: any) => {
            console.log('synced');
        });


    }

}

export default new Persistence().persistence