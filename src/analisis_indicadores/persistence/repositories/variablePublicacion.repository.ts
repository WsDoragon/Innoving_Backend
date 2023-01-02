
import { VariablePublicacion } from "../../entities/variablePublicacion";

import VariablePublicacionModel from "../models/variablePublicacion.model";

class VariablePublicacionRepository {
    
    public async insertValue(varPub: VariablePublicacion) {
        const res: any = await VariablePublicacionModel.create(varPub);
//        console.log(`[VARIABLE PUBLICACION REPOSITORY] ${res.id}`);
        if (res.id == undefined) {
            throw new Error();
        }
        return;
    }

    public async checkValue(idPublicacion: number, idVariable: number): Promise<boolean> {
        const res: any = await VariablePublicacionModel.findOne({
            where: {
                id_publicacion: idPublicacion,
                id_variable: idVariable
            }
        })

        if (res) {
            return true;
        }
        return false;
    }

}

export default new VariablePublicacionRepository();