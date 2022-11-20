import { Router } from "express";
import IndicadoresRoute from "./router/Indicadores.router"


class IndicadoresModule {
    public routes : Router;
    public constructor(){
        this.routes = Router();
        this.routes.use("/indicadores", IndicadoresRoute);
    }
    
}



export default new IndicadoresModule();