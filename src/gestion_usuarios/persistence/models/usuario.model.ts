import { DataTypes, Model } from "sequelize";
import { Usuario } from "../../entities/usuario";
import persistence from "../../../config/persistence";

class UsuarioModel extends Model<Usuario> {

}

UsuarioModel.init({
    rut: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'usuario',
    timestamps: false,
    sequelize: persistence
  })
  
  export default UsuarioModel