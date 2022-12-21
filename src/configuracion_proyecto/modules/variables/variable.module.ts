import { Router } from "express";
import variableRouter from "./router/variable.router";


class VariableModule {
    public router: Router;

    public constructor(){
        this.router = Router();
        this.router.use("/variables", variableRouter )
    }
}

export default new VariableModule();
