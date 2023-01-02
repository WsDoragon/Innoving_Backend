import { Request, Response } from 'express';
import ejeRepository from '../../persistence/repositories/eje.repository';

import indicadorRepository from "../../persistence/repositories/indicador.repository";

class IndicadoresController {
    public async getIndicador(req: Request, res: Response) {
        const { eje } = req.query;

        if (eje!=undefined) {
            try {
                console.log(`[INDICADORES CONTROLLER] ${await ejeRepository.findEje(<string> (eje ?? ''))}`);
            } catch (e) {
                return res.status(400).json({status: false, error: `Eje ${eje} no encontrado`})
            }
        }


        console.log(`[INDICADORES_CONTROLLER]: get indicadores eje: ${eje}`);
        indicadorRepository.findIndicadores( <string> eje ).then( indicadores => {
            return res.status(200).json({status: true, data: indicadores})
        }, error => {
            return res.status(404).json({status: false});
        })
    }
}

export default new IndicadoresController();