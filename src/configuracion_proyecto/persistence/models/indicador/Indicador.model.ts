import { DataTypes, Model } from "sequelize";
import { Indicador } from "../../../entities/indicador/indicador";
import persistence from "../../../../config/persistence";

class  IndicadorModel extends Model<Indicador> {
  static routes(routes: any) {
    throw new Error('Method not implemented.');
  }
    
}



IndicadorModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    CalificacionCORFO: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    NumeroIndicador: {
        type: DataTypes.STRING,
        allowNull: false
    },

    MisionUniversitaria: {
        type: DataTypes.STRING,
        allowNull: false
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TipoIndicador: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eje: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Unidad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FuenteInformacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Responsable: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Frecuencia: {
        type: DataTypes.STRING,
        allowNull: false

    },
    Aprobado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    peticion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    antiguaid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
}, {
    tableName : "indicadores",
    timestamps: false,
    sequelize : persistence

})



export default IndicadorModel