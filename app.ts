import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'

//import usuariosModule from './src/modules/users/gestion_usuarios/usuarios.module';
import usuariosModule from './src/gestion_usuarios/modules/usuarios.module';
import rolUsuariosModule from './src/gestion_usuarios/modules/rol_usuario.module';
import IndicadorModel from './src/configuracion_proyecto/persistence/models/indicador/Indicador.model';
import MetasModel from './src/configuracion_proyecto/persistence/models/metas/Metas.model';
import EjesModule from './src/configuracion_proyecto/modules/ejes/ejes.module';
import HistorialPeticionesModel from './src/configuracion_proyecto/persistence/models/historialpeticiones/historialPeticiones.model';
class App {
  public server;
  private port;

  constructor() {
    dotenv.config(); 
    this.port = process.env.PORT;

    console.log('initializing');

    this.server = express();

    this.middlewares();
    this.routes();

    this.server.listen(this.port, () => {
      console.log(`Server is running at https://localhost:${this.port}`);
    });
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    //this.server.use(UserModule.routes);
    this.server.use(usuariosModule.routes);
    this.server.use(rolUsuariosModule.routes);
    this.server.use(IndicadorModel.routes);
    this.server.use(MetasModel.routes);
    this.server.use(EjesModule.router);
    this.server.use(HistorialPeticionesModel.routes);

    
  } 
}

export default new App();