import { Indicador } from "../../entities/indicador";
import IndicadorModel from "../models/indicador.model";

class IndicadorRepository {
    
    public async findIndicadores(eje: string | undefined): Promise<Indicador[]> {
        let indicadores: any[] = await IndicadorModel.findAll({
            attributes: ["id", "nombre", "descripcion"],
            where: (eje!=undefined) ? {
                nombre_eje: eje
            } : undefined
        })

        if (indicadores.length == 0) {
            throw new Error();
        }
        return (<Indicador[]> indicadores);
    }

}

export default new IndicadorRepository();