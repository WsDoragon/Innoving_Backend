import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import cors from "cors";

//import usuariosModule from './src/modules/users/gestion_usuarios/usuarios.module';
import usuariosModule from "./src/gestion_usuarios/modules/usuarios.module";

import rolUsuariosModule from "./src/gestion_usuarios/modules/rol_usuario.module";
import fileRoutes from "./src/gestion_evidencias/routes/file-router";
import pubRoutes from "./src/gestion_evidencias/routes/pub-router";

import analisisIndicadoresEjesModule from './src/analisis_indicadores/modules/ejes.module';
import analisisIndicadoresIndicadoresModule from './src/analisis_indicadores/modules/indicadores.module';
import analisisIndicadoresPublicacionesModule from './src/analisis_indicadores/modules/publicaciones.module';



//import IndicadorModel from './src/configuracion_proyecto/persistence/models/indicador/Indicador.model';
import indicadoresModule from './src/configuracion_proyecto/modules/Indicadores/indicadores.module';
//import MetasModel from './src/configuracion_proyecto/persistence/models/metas/Metas.model';
import metasModule from './src/configuracion_proyecto/modules/metas/metas.module';
import ejesModule from './src/configuracion_proyecto/modules/ejes/ejes.module';
import historialPeticionModule from './src/configuracion_proyecto/modules/historialPeticiones/historialPeticion.module';
import variableModule from './src/configuracion_proyecto/modules/variables/variable.module';

class App {
  public server;
  private port;

  

  constructor() {
    dotenv.config();
    console.log("soy yo en app:",process.env.DB_HOST, process.env.PORT , process.env.DB_PASSWORD)
    this.port = process.env.PORT;

    console.log("initializing");

    

    this.server = express();
    console.log("soy yo en app:",process.env.DB_HOST, process.env.PORT , process.env.DB_PASSWORD)
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
    
    // analisis de indicadores
    this.server.use('/api/ai',analisisIndicadoresEjesModule.routes);
    this.server.use('/api/ai', analisisIndicadoresIndicadoresModule.routes);
    this.server.use('/api/ai', analisisIndicadoresPublicacionesModule.routes);

    // evidencias
    this.server.use("/api", pubRoutes);
    this.server.use("/api", fileRoutes);
    // end evidencias
  

    this.server.use(indicadoresModule.routes);
    this.server.use(metasModule.routes);
    this.server.use(ejesModule.router);
    this.server.use(historialPeticionModule.router);
    this.server.use(variableModule.router);

    
  } 


}
export default new App();
