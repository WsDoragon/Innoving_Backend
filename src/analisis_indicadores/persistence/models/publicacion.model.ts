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
        allowNull: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    autores: {
        type: DataTypes.STRING,
    },
    revista: {
        type: DataTypes.STRING,
    },
    autores_extranjeros: {
        type: DataTypes.TINYINT,
    },
    indexacion: {
        type: DataTypes.STRING,
    },
    anio: {
        type: DataTypes.STRING,
    },
    citaciones: {
        type: DataTypes.STRING,
    },
    clasificacion: {
        type: DataTypes.STRING,
    },
    disciplina: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comentario: {
        type: DataTypes.STRING,
    }
},{
    tableName: "publicacion",
    timestamps: false,
    sequelize: persistence
});

export default PublicacionModel