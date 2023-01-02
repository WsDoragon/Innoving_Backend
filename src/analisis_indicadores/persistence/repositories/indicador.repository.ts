import { Indicador } from "../../entities/indicador";
import IndicadorModel from "../models/indicador.model";

class IndicadorRepository {
    
    public async findIndicadores(eje: string | undefined): Promise<Indicador[]> {
        let indicadores: any[] = await IndicadorModel.findAll({
            attributes: ["id", "nombre"],
            where: (eje!=undefined) ? {
                eje
            } : undefined
        })

        if (indicadores.length == 0) {
            throw new Error();
        }
        return (<Indicador[]> indicadores);
    }

    public async findIndicadorById(id: string): Promise<Indicador> {
        let indicador: any = await IndicadorModel.findOne({
            where: {
                id
            }
        })

        if (indicador) {
            return <Indicador> indicador;
        }
        throw new Error();
    }

}

export default new IndicadorRepository();