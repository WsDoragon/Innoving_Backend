import { DataTypes, Model } from "sequelize";
import { Publicacion } from "../../entities/publicacion";
import persistence from "../../../config/persistence";

class PublicacionModel extends Model<Publicacion> {}

PublicacionModel.init({
    publicacion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    issn_doi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    autores: {
        type: DataTypes.STRING,
        allowNull: true
    },
    revista: {
        type: DataTypes.STRING,
        allowNull: true
    },
    autores_extranjeros: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    validado: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    indexacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    anio: {
        type: DataTypes.DATE,
        allowNull: true
    },
    citaciones: {
        type: DataTypes.STRING,
        allowNull: true
    },
    clasificacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    disciplina: {
        type: DataTypes.STRING,
        allowNull: true
    },
},{
    tableName: "publicacion",
    timestamps: false,
    sequelize: persistence
});

export default PublicacionModel