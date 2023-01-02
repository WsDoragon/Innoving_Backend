import { Request, Response } from 'express'
import { text } from 'stream/consumers';
import { Eje } from '../../../entities/eje/eje';
import ejeRepository from '../../../persistence/repositories/ejes/eje.repository';

class EjesController { 

    public getEjes( request : Request, response : Response){
        ejeRepository.getEjes().then(ejes => {
            response.status(200).json({status : true , data : ejes})
        }, error => {
            response.status(404).json({status : false});
        });
    }
    
}


export default new EjesController();