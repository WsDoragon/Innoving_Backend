import { Router } from "express";
import variableControllers from "../controllers/variable.controllers";
class VariableRouter{

    public router : Router;
    constructor(){
        this.router = Router(); 
        this.router.post("/add",variableControllers.addVariables);
        this.router.post("/M26", variableControllers.smj);
        this.router.post("/M25", variableControllers.M25);
        this.router.post("/M49", variableControllers.M49);
        this.router.post("/prueba", variableControllers.prueba)
    }

}


export default new VariableRouter().router;

