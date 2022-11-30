import { Request, Response } from 'express';
import { Publicacion } from '../../entities/publicacion';
import { VariablePublicacion } from '../../entities/variablePublicacion';

import PublicacionRepository from '../../persistence/repositories/publicacion.repository';
import variablePublicacionRepository from '../../persistence/repositories/variablePublicacion.repository';

class PublicacionesController {
    public getPublicaciones(req: Request, res: Response) {
        const { estado, idIndicador } = req.query;
        
        console.log(`[PUBLICACIONES CONTROLLER]: estado: ${estado} / idIndicador: ${idIndicador}`);
    
        (idIndicador==undefined)
            ? PublicacionRepository.findPublicacionesByEstado(<string> estado).then(publicaciones => {
                res.status(200).json({status: true, data: publicaciones});
            }, error => {
                res.status(404).json({status: false});
            })
            : PublicacionRepository.findPublicacionesByIdIndicador(<string> idIndicador).then(publicaciones => {
                res.status(200).json({status: true, data: publicaciones});
            }, error => {
                res.status(404).json({status: false});
            });
    }

    public editEstadoPublicacion(req: Request, res: Response) {
        const { idPublicacion } = req.params;
        const content = req.body;

        console.log(`[idPublicacion]: ${idPublicacion}`);
        console.log(`[content]: ${content}`);
            
        // TODO: validar body
            
        /**
         * content: {
         *  estado,
         *  if(estado==='rechazado') comentario
         *      * eliminar variables
         * 
         *  if(estado==='Verificado') indicadores[]
         *      * borrar comentario
         * 
         *  if(estado==='En revision') undefined
         *      * eliminar variables
         * }
         */
            
        if (content['estado'] === 'Verificado') {
            PublicacionRepository.updatePublicacion(+idPublicacion, new Publicacion({...content}))
            
            content['indicadores'].map( async (idIndicador: string) => {
                const idVar: number = (idIndicador==='M25') ? 1 : (idIndicador==='M26') ? 2 : 3;                
        
                await variablePublicacionRepository.newValue(    
                    new VariablePublicacion(idVar, +idPublicacion, 1)
                );
        
        
            })
            res.status(202).json({status: true});
            return;

        } 

        PublicacionRepository.updatePublicacion(+idPublicacion, new Publicacion({...content})).then( response => {
            
            variablePublicacionRepository.deleteValuesByIdPub(+idPublicacion).then(response => {
                res.status(200).json({status: true});
            }, error => res.status(404).json({status:false}))
            
        }, error => {
            console.log(`error ${error}`);
            res.status(404).json({status:false})
        });

    }

}

export default new PublicacionesController();