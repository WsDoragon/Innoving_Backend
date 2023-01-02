import { DataTypes, Model } from "sequelize";
import { Metas } from "../../../entities/metas/metas";
import persistence from "../../../../config/persistence";

class MetasModel extends Model<Metas>{
    static routes(routes: any) {
      throw new Error('Method not implemented.');
    }
    Aprobado: number;


}


MetasModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: false,
        primaryKey: true
    },
    idindicador: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    Peticion: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Aprobado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    antiguaid: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
}, {
    tableName: "metas", 
    timestamps : false,
    sequelize : persistence
})


export default MetasModel;