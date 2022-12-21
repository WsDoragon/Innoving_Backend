import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

// create table publicacion(
//     publicacion_id int not null AUTO_INCREMENT primary key,
// 	issn_doi varchar(100) not null,
//     titulo varchar(100),
//     autores varchar(100),
//     revista varchar(100),
//     autores_extranjeros TINYINT(1),
//     indexacion varchar(100),
//     anio varchar(100),
//     citaciones varchar(300),
//     clasificacion varchar(100),
//     disciplina varchar(100)
// );

const Publication = sequelize.define(
  "Publication",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      field: "publicacion_id",
      autoIncrement: true,
      primaryKey: true,
    },
    issnDoi: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "issn_doi",
    },
    titulo: {
      type: DataTypes.STRING,
    },
    autores: {
      type: DataTypes.STRING,
    },
    revista: {
      type: DataTypes.STRING,
    },
    autoresExtranjeros: {
      type: DataTypes.BOOLEAN,
      field: "autores_extranjeros",
    },
    indexacion: {
      type: DataTypes.STRING,
    },
    anio: {
      type: DataTypes.DATE,
    },
    clasificacion: {
      type: DataTypes.STRING,
    },
    disciplina: {
      type: DataTypes.STRING,
    },
    validado: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "publicacion",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    // Other model options go here
  }
);

export default Publication;
// `sequelize.define` also returns the model
// console.log(Publication === sequelize.models.Publication); // true
