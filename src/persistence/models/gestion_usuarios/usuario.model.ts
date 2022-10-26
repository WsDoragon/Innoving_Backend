import { DataTypes, Model } from "sequelize";
import { Usuario } from "../../../entities/gestion_usuarios/usuario";
import persistence from "../../config/persistence";

class UsuarioModel extends Model<Usuario> {

}

UsuarioModel.init({
    rut: {
      type: DataTypes.STRING,
      autoIncrement: true,
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
        allowNull: false
    },
  }, {
    tableName: 'usuario',
    timestamps: false,
    sequelize: persistence
  })
  
  export default UsuarioModel