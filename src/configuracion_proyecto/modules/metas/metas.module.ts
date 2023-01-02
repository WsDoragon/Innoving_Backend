import { Router } from "express";
import metasRouter from "./router/metas.router";

class MetasModule { 
    public routes : Router;
    public constructor(){
        this.routes = Router();
        this.routes.use("/metas", metasRouter);

    }
}

export default new MetasModule();
