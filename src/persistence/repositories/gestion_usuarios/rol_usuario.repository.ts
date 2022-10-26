import { RolUsuario } from "../../../entities/gestion_usuarios/rol_usuario";
import persistence from "../../config/persistence";
import RolUsuarioModel from "../../models/gestion_usuarios/rol_usuario.model";

class RolUsuarioRepository {

    public async findRolUsuario(id: string): Promise<RolUsuario> {
        let RolUsuario: any = await RolUsuarioModel.findByPk(id);
        if (RolUsuario == null) {
            throw new Error();
        } else {
            return (<RolUsuario> RolUsuario);
        }

    }

    public async findRolUsuarios(): Promise<Array<RolUsuario>> {
        let RolUsuarios: Array<any> = await RolUsuarioModel.findAll();
        if (RolUsuarios.length == 0) {
            throw new Error();
        } else {
            return (<Array<RolUsuario>> RolUsuarios);
        }

    }
}

export default new RolUsuarioRepository();