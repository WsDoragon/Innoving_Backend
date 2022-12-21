import { Request, Response } from 'express';
import { Variable } from '../../../entities/variables/variable';

import variableRepository from '../../../persistence/repositories/variable/variable.repository';
import { col } from 'sequelize';
class VariableControlle{

    public addVariables (request : Request ,response : Response){

        variableRepository.addVariables(request).then(msg => {
            response.status(201).json({status : true, data : msg});
        }, error => {
            response.status(400).json({status : false});
        })

    }

    public prueba (request : Request ,response : Response){

        console.log("hola");

    }


    public smj (request : Request ,response : Response){
        console.log("hola")
        variableRepository.M26(request).then(data => {
            response.status(201).json({status : true, data : data});
        }, error => {
            response.status(400).json({status : false});
        })
        
    }


    public M25 (request : Request ,response : Response){
        variableRepository.M25(request).then(data => {
            response.status(201).json({status : true, data : data});
        }, error => {
            response.status(400).json({status : false});
        })
        
    }

    public M49 (request : Request ,response : Response){
        console.log("holaaaaa")
        variableRepository.M49(request).then(data => {
            response.status(201).json({status : true, data : data});
        }, error => {
            response.status(400).json({status : false});
        })
        
    }

    



}


export default new VariableControlle();