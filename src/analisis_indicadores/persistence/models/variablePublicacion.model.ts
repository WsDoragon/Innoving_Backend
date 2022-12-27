import { DataTypes, Model } from "sequelize";
import { VariablePublicacion } from "../../entities/variablePublicacion";

import persistence from "../../../config/persistence";


class VariablePublicacionModel extends Model<VariablePublicacion> {}

VariablePublicacionModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_publicacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_variable: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'Variable_Publicaciones',
    timestamps: false,
    sequelize: persistence
})

export default VariablePublicacionModel;