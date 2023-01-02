import { DataTypes, Model } from "sequelize";

import { Indicador } from '../../../entities/indicador/indicador';
import persistence from "../../../../config/persistence";
class  IndicadorModel extends Model<Indicador> {
    
}



IndicadorModel.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    
    CalificacionCORFO: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    NumeroIndicador: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
    Peticion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_editado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Descripcion : { 
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, {
    tableName : "indicadores",
    timestamps: false,
    sequelize : persistence

})



export default IndicadorModel