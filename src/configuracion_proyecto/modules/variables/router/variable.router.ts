import { Router } from "express";
import variableControllers from "../controllers/variable.controllers";
class VariableRouter{

    public router : Router;
    constructor(){
        this.router = Router(); 
        this.router.post("/add",variableControllers.addVariables);
        this.router.get("/M26", variableControllers.smj);
        this.router.get("/M25", variableControllers.M25);
        this.router.get("/M49", variableControllers.M49);
        this.router.get("/prueba", variableControllers.prueba)
    }

}


export default new VariableRouter().router;

