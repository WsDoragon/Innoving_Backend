import { DataTypes, Model } from "sequelize";
import { Eje } from "../../../entities/eje/eje";
import persistence from "../../../../config/persistence";

class EjeModel extends Model<Eje> {

}

EjeModel.init({
    id : {
        type : DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    }, 
    nombre :{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName :"ejes", 
    timestamps : false,
    sequelize : persistence
})



export default EjeModel