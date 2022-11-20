import { Request, Response } from 'express';


import { HistorialPeticiones } from '../../../entities/historialpeticiones/historialPeticiones';

import historialPeticionRepository from '../../../persistence/repositories/historialPeticion/historialPeticion.repository';


class HistorialPeticionesController {

    public getHistorialPeticiones(request : Request, response : Response){
        historialPeticionRepository.getHistorialPeticiones().then(historial => {
            response.json({data : historial})
        }, error => {
            response.status(404).json({status : false});
        })
    }

    public createHistorial(request : Request, response : Response) {

        const idNum : number = Math.floor(Math.random() * 999999);
        let historial = new HistorialPeticiones(
            idNum, 
            request.body.id_imm,
            request.body.tipo, 
            request.body.solicitud,
            request.body.estado,
            request.body.fecha
        )
        historialPeticionRepository.createHistorial(historial)

    }

    public setHistorial(request : Request, response : Response){

    }
}


export default new HistorialPeticionesController();
