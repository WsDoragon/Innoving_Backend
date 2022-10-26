import { Rol } from "../../../entities/gestion_usuarios/rol";
import persistence from "../../config/persistence";
import RolModel from "../../models/gestion_usuarios/rol.model";
//AQUI VAN LAS CONSULTAS "DIRECTAS"
class RolRepository {

    public async findRol(id: number): Promise<Rol> {
        let Rol: any = await RolModel.findByPk(id);
        if (Rol == null) {
            throw new Error();
        } else {
            return (<Rol> Rol);
        }

    }

    public async findRols(): Promise<Array<Rol>> {
        let Rols: Array<any> = await RolModel.findAll();
        if (Rols.length == 0) {
            throw new Error();
        } else {
            return (<Array<Rol>> Rols);
        }

    }

    public async newRol(Rol: Rol): Promise<Rol> {
        let newRol: any = await RolModel.create(Rol);

        return <Rol> newRol;

    }

    public async searchRol(name: string): Promise<Array<Rol>> {
        console.log(name)
        let Rols: Array<any> = await persistence.query('SELECT * FROM Rol WHERE name LIKE "%' + name, {
            model: RolModel,
            mapToModel: true // pass true here if you have any mapped fields
          });
          
        if (Rols.length == 0) {
            throw new Error();
        } else {
            return (<Array<Rol>> Rols);
        }

    }
}

export default new RolRepository();