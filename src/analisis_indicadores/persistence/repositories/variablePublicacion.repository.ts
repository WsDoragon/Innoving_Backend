
import { VariablePublicacion } from "../../entities/variablePublicacion";

import VariablePublicacionModel from "../models/variablePublicacion.model";

class VariablePublicacionRepository {
    
    public async newValue(varPub: VariablePublicacion) {
        const res = await VariablePublicacionModel.create(varPub);
        console.log('valor asignado')
        console.log(res.toJSON());
    }

    public async deleteValuesByIdPub(idPublicacion: number) {
        const res: number = await VariablePublicacionModel.destroy({
            where: {
                id_publicacion: idPublicacion
            }
        })

        console.log(`[DELETE_VALUE_BY_ID_PUB] res: ${res}`);
    }
}

export default new VariablePublicacionRepository();