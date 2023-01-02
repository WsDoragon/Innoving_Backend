 import { Request, Response } from 'express';

import { text } from 'stream/consumers';

import { Indicador } from '../../../entities/indicador/indicador';
import indicadorRepository from '../../../persistence/repositories/indicador/indicador.repository';


class IndicadorController {

    public getIndicadores (request : Request ,response : Response) {
        indicadorRepository.getIndicadores().then(indicadores => {
            response.status(200).json({status : true , data : indicadores})
        }, error => {
            response.status(404).json({status : false});
        });
    }

    public createIndicador (request : Request ,response : Response) {
        let sid : string = request.body.NumeroIndicador;
        
        let indicador = new Indicador(
            request.body.id,
            request.body.CalificacionCORFO, 
            parseInt(sid,10), 
            request.body.MisionUniversitaria,
            request.body.nombre,
            request.body.TipoIndicador, 
            request.body.eje,
            request.body.Unidad,
            request.body.FuenteInformacion,
            request.body.Responsable,
            request.body.Frecuencia,
            0, 
            "Añadir", 
            "",
            request.body.Descripcion
        );
        console.log(indicador.Aprobado);
        indicadorRepository.createIndicador(indicador).then(indicadores => {
            response.status(201).json({status: true , data : indicadores });

        }, error => {
            response.status(400).json({status : false});
        });

    }



    public setAprobado (request : Request ,response : Response){
        console.log("holax")
        const data : any = request.params;
        console.log(data)
        
        indicadorRepository.setAprobado(data).then(msg => {
            response.status(201).json({status : true, data : msg});
        },error => {
            response.status(400).json({status : false});
        })

    }

    public setPeticion  (request : Request ,response : Response){
        console.log(request.params.id)
        
        indicadorRepository.setPeticion(request.params.id).then(peticion => {
            response.status(200).json({status : true , data : peticion })
        }, error => { 
            response.status(404).json({status :  false})
        })

    }

    public editarIndicador(request : Request ,response : Response){
        console.log("hola");
        const id : string = request.body.id;
        console.log(id);
        let sid : string = request.body.NumeroIndicador;
        let numeroIndicador : number = parseInt(sid,10); 
        let indicador = new Indicador(
            request.body.id,
            request.body.CalificacionCORFO, 
            numeroIndicador, 
            request.body.MisionUniversitaria,
            request.body.nombre,
            request.body.TipoIndicador, 
            request.body.eje,
            request.body.Unidad,
            request.body.FuenteInformacion,
            request.body.Responsable,
            request.body.Frecuencia,
            0, 
            "Editar", 
            request.body.id_editado,
            request.body.Descripcion
        );
        indicadorRepository.editarIndicador(id, indicador).then(msg  => {
            response.status(200).json({status : true , data : msg })
        }, error => {
            response.status(404).json({status :  false})
        })
    }

    public eliminarIndicadorEditado(request : Request ,response : Response){
        const data : any  = request.params.id;
        indicadorRepository.eliminarIndicadorEditado(data).then(msg  => {
            response.status(200).json({status : true , data : msg })
        }, error => {
            response.status(404).json({status :  false})
        })

    }

    public eliminarIndicador(request : Request ,response : Response){
        const data : any = request.params.id;
        indicadorRepository.eliminarIndicador(data).then(msg  => {
            response.status(200).json({status : true , data : msg })
        }, error => {
            response.status(404).json({status :  false})
        })    
    }


    public  deleteIndicador(request : Request ,response : Response){
        console.log(request.params.id)
        const data : any = request.params.id
        indicadorRepository.deleteIndicador(data).then(msg  => {
            response.status(200).json({status : true , data : msg })
        }, error => {
            response.status(404).json({status :  false})
        })
    }
    




}

export default new IndicadorController();
