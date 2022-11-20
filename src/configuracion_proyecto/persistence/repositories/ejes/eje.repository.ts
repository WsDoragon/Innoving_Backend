import { Model } from "sequelize";
import { Eje } from "../../../entities/eje/eje";
import persistence from "../../../../config/persistence";

import EjeModel from "../../models/eje/eje.model";
class EjeRepository{ 

    public async getEjes() : Promise<Array<Eje>>  {

        let ejes : Array<any> = await EjeModel.findAll();
        if (ejes.length == 0 ){
            throw new Error(); 

        }else{ 
            return (<Array<Eje>> ejes)
        }

    }





}



export default new  EjeRepository();