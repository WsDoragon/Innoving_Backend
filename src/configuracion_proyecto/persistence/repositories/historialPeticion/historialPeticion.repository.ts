import { Model } from "sequelize";
import { HistorialPeticiones } from "../../../entities/historialpeticiones/historialPeticiones";
import persistence from "../../../../config/persistence";
import HistorialPeticionesModel from "../../models/historialpeticiones/historialPeticiones.model";

class HistorialPeticionesRepository{
    public async  getHistorialPeticiones() : Promise<Array<HistorialPeticiones>>{
        let historial : Array<any> = await HistorialPeticionesModel.findAll();
        
        if(historial.length == 0 ){
            throw new Error();
         }else{
           return (<Array<HistorialPeticiones>> historial)
         }
    }

    public async createHistorial(historial : HistorialPeticiones)  {
            let nuevoHistoriaal : any  = await HistorialPeticionesModel.create(historial);
            return "ok"
        }

}




    




export default new HistorialPeticionesRepository();