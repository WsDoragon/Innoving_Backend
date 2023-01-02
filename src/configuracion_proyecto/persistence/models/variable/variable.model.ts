import { DataTypes, Model } from "sequelize";
import { Variable  } from "../../../entities/variables/variable";
import persistence from "../../../../config/persistence";

class VariableModel extends Model<Variable> {

}


VariableModel.init({
    id : {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    valor : {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_publicacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_variable : {
        type: DataTypes.INTEGER,
        allowNull: false
    }



}, {
    tableName : "Variable_publicaciones",
    timestamps: false,
    sequelize : persistence
})

export default VariableModel;