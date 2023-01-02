import { Router } from "express";
import historialPeticionesController from "./../controllers/historialPeticiones.controllers";
class HistorialPeticionesRouter {
    public router : Router;

    constructor(){
        this.router = Router();
        this.router.get("/lista", historialPeticionesController.getHistorialPeticiones);
    }
}

export default new HistorialPeticionesRouter().router;