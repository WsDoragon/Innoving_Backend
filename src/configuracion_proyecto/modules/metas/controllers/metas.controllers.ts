import { Request, Response } from 'express';
import { text } from 'stream/consumers';
import { Metas } from '../../../entities/metas/metas';
import metasRepository from '../../../persistence/repositories/metas/metas.repository';
class MetasController {
    public getMetas( request : Request, response : Response){
        metasRepository.getMetas().then(metas =>{
            response.status(200).json({status : true, data : metas})
        }, error =>{
            response.status(404).json({status : false});
        })
    }


    public createMetas( request : Request, response : Response){
       //const generadorid : string =  Math.random().toString(36).substr(2,18);
       console.log(request.body.id) 
       let meta = new Metas(
            request.body.id, 
            request.body.idindicador,
            request.body.fecha,
            request.body.cantidad, 
            "Añadir", 
            0,
            "0"
        );
        metasRepository.createMetas(meta).then(metas => {
            response.status(201).json({status : true, data : metas});
        }, error => {
            response.status(400).json({status : false})
        });
    }

    public setAprobado (request : Request, response : Response){
        const data : any =  request.params.id;

        metasRepository.setAprobado(data).then(metaset => {
            response.status(200).json({status : true ,  info : "Ok"})
        }, error =>{
            response.status(404).json({status : false});
        })
    }

    public setPeticion( request : Request, response : Response){
        const data : any =  request.params.id
        metasRepository.setPeticion(data).then(msg => {
            response.status(200).json({status : true , info : "OK"})
        },error => {
            response.status(404).json({status : false});
        })

    }

    public deleteMetas( request : Request, response : Response){
        const id : number = parseInt(request.params.id,10);
        metasRepository.deleteMetas(id).then(delateM => {
            response.status(200).json({status : true ,  info : "Meta Eliminada"})
        }, error =>{
            response.status(404).json({status : false});
        })


    }

    public deleteMetasIndicador (request : Request, response : Response){
        const data : any = {
            idindicador : request.body.id,
            antiguaid :  request.body.id,
            antiguaidN : request.body.D,
            Aprobado : 2, 
        }
        metasRepository.deleteMetasIndicador(data).then(msg => {
            response.status(200).json({status : true ,  info :msg});
        }, error =>{
            response.status(404).json({status : false});
        })
    }
}



export default  new MetasController();
