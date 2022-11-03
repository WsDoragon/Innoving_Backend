import { RolUsuario } from '../../entities/rol_usuario';
import { DataTypes, Model } from "sequelize";
import persistence from "../../../config/persistence";

class RolUsuarioModel extends Model<RolUsuario> {

}

RolUsuarioModel.init({
    id_rut: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    id_rol: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    }
  }, {
    tableName: 'rol_usuario',
    timestamps: false,
    sequelize: persistence
  })
  
  export default RolUsuarioModel