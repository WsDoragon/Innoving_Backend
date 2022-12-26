import { Router } from "express";
import ejesRouter from "./router/ejes.router";

class EjesModule {

    public router : Router
    public constructor(){
        this.router = Router();
        this.router.use("/ejes", ejesRouter);
    }


}


export default new EjesModule();