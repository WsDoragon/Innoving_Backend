import { DataTypes } from "sequelize";
import sequelize from "../../config/persistence";
// create table archivo(
//     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     id_fk_pub int(6),
//     id_fk_pro int(6),
//     nombre varchar(255),
//     ruta varchar(255),
//     foreign key(id_fk_pub) references publicacion(`publicacion_id`)
// )

const File = sequelize.define(
  "File",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idFkPub: {
      type: DataTypes.INTEGER,
      field: "id_fk_pub",
    },
    nombre: {
      type: DataTypes.STRING,
    },
    ruta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "archivo",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    // Other model options go here
  }
);

export default File;
