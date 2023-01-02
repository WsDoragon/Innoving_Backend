import { Request, Response } from 'express';
import { VariablePublicacion } from '../../entities/variablePublicacion';
import indicadorRepository from '../../persistence/repositories/indicador.repository';
import publicacionRepository from '../../persistence/repositories/publicacion.repository';

import PublicacionRepository from '../../persistence/repositories/publicacion.repository';
import variablePublicacionRepository from '../../persistence/repositories/variablePublicacion.repository';

class PublicacionesController {
    public async getPublicaciones(req: Request, res: Response) {
        const { estado, idIndicador } = req.query;
        
        console.log(`[PUBLICACIONES CONTROLLER]: estado: ${estado} / idIndicador: ${idIndicador}`);
    
        if (estado != undefined && !(parseInt(<string> estado) in [0,1])) {
            return res.status(400).json({status: false, error: `Estado ${estado} no valido`});
        }
        try {
            if (idIndicador != undefined) {
                await indicadorRepository.findIndicadorById(<string> idIndicador)
            }
        } catch (e) {
            return res.status(400).json({status: false, error: `ID indicador ${idIndicador} no existe`});
        }


        (idIndicador==undefined)
            ? PublicacionRepository.findPublicacionesByEstado(estado==undefined ? undefined : +estado).then(publicaciones => {
                res.status(200).json({status: true, data: publicaciones});
            }, error => {
                res.status(404).json({status: false});
            })
            : PublicacionRepository.findPublicacionesByIdIndicador(<string> idIndicador).then(publicaciones => {
                console.log(`[PUBLICACOINES CONTROLLER] : publicaciones: ${publicaciones}`);
                res.status(200).json({status: true, data: publicaciones});
            }, error => {
                res.status(404).json({status: false});
            });
    }

    public async setVariables(req: Request, res: Response) {

        const {idPublicacion} = req.params; 
        try {
            await publicacionRepository.findPublicacionById(+idPublicacion);
        } catch (e) {
            return res.status(400).json({status: false, error: "La publicacion no existe"});
        }
        /**
         * body: {
         *  variables: [id_variables]
         * }
         * 
         * variables:
         * id: 1 descripcion: 'Publicacion con coautor extranjero'),
         * id: 2 descripcion: 'Publicacion'),
         * id: 3 descripcion: 'Publicacion ingenieria'),
         * id: 4 descripcion: 'Publicacion otra disciplina');
         */
        const { variables } = req.body;
        const ids = [1,2,3,4];

//        console.log(`[PUBLICACIONES CONTROLLER]: idPublicacion: ${idPublicacion}`);
//        console.log(`[PUBLICACIONES CONTROLLER]: variables: ${variables}`)

        const response = [...ids.filter( async (idVariable) => {
            if (variables.find((id: number) => idVariable==id) == undefined) {
 //               console.log(`'id ${idVariable} no encontrado'`)
                return false;
            };
            if (await variablePublicacionRepository.checkValue(+idPublicacion, idVariable)) {
//                console.log(`[PUBLICACION CONTROLLER]: variable ${idVariable} repetida`)
                return false;
            }

            await variablePublicacionRepository.insertValue(
                new VariablePublicacion(
                    idVariable,
                    +idPublicacion,
                    1
                )
            )

            console.log(`asignado id: ${idVariable}`);
            return true;

        })]

        return res.status(202).json({status: true});
    }


}

export default new PublicacionesController();