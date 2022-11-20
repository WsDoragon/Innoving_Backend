import { Router } from "express";
import historialPeticionesRouter from "./router/historialPeticiones.router";


class HistorialPeticionesModule {
    public router: Router;

    public constructor(){
        this.router = Router();
        this.router.use("/historial", historialPeticionesRouter )
    }
}

export default new HistorialPeticionesModule();
