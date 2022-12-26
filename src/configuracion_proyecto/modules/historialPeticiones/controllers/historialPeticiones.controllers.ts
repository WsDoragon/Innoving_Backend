import { Request, Response } from 'express';


import { HistorialPeticiones } from '../../../entities/historialpeticiones/historialPeticiones';

import historialPeticionRepository from '../../../persistence/repositories/historialPeticion/historialPeticion.repository';
import persistence from '../../../../config/persistence';

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
        const DELETE_QUERY = `SELECT id_imm FROM historialpeticiones WHERE id_imm = '${request.body.id}' AND tipo = ${request.body.tipo}`
        persistence.query(DELETE_QUERY, (err : any, response : any) =>{
            if(err) console.log(err)
            else{
                var idIndicadores = response.map(function(x : any) {
                    return x.id;
                 });
                 for(let i=0; i < idIndicadores.length ; i++){ 
                    const ADD_QUERY = `UPDATE historialpeticiones SET id_imm = '${request.body.D}' WHERE id_imm = "${request.body.id}" AND tipo = ${request.body.tipo};`
                    persistence.query(ADD_QUERY, (err : any) =>{
                        if(err) console.log(err)
                    })   
                }
            }
        })

    }
}


export default new HistorialPeticionesController();
