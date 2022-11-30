import { Request, Response } from 'express';
import ejeRepository from '../../persistence/repositories/eje.repository';

import indicadorRepository from "../../persistence/repositories/indicador.repository";

class IndicadoresController {
    public getIndicador(req: Request, res: Response) {
        const { eje } = req.query;

        console.log(`[INDICADORES_CONTROLLER]: get indicadores eje: ${eje}`);
        indicadorRepository.findIndicadores( <string> eje ).then( indicadores => {
            res.status(200).json({status: true, data: indicadores})
        }, error => {
            res.status(404).json({status: false});
        })
    }
}

export default new IndicadoresController();