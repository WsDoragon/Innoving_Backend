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
    eje: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    NumeroIndicador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    }
},{
    tableName: 'indicadores',
    timestamps: false,
    sequelize: persistence
})

export default IndicadorModel