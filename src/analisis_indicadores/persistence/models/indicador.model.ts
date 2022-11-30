import { DataTypes, Model } from "sequelize";
import { Indicador } from "../../entities/indicador";
import persistence from "../../../config/persistence";

class IndicadorModel extends Model<Indicador> {

}

IndicadorModel.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nombre_eje: {
        type: DataTypes.STRING,
        allowNull: false,
        
    }
},{
    tableName: 'Indicadores',
    timestamps: false,
    sequelize: persistence
})

export default IndicadorModel