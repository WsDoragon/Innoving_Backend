import { RolUsuario } from './../../../entities/gestion_usuarios/rol_usuario';
import { DataTypes, Model } from "sequelize";
import persistence from "../../config/persistence";

class RolModel extends Model<RolUsuario> {

}

RolModel.init({
    id_rut: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_rol: {
      type: DataTypes.INTEGER.UNSIGNED,
    }
  }, {
    tableName: 'rol_usuario',
    timestamps: false,
    sequelize: persistence
  })
  
  export default RolModel