import { Usuario } from "../../entities/usuario";
import persistence from "../../../config/persistence";
import UsuarioModel from "../models/usuario.model";

class UsuarioRepository {

    public async findUsuario(id: string): Promise<Usuario> {
        let Usuario: any = await UsuarioModel.findByPk(id);
        if (Usuario == null) {
            throw new Error();
        } else {
            return (<Usuario> Usuario);
        }

    }

    public async findUsuarios(): Promise<Array<Usuario>> {
        let Usuarios: Array<any> = await UsuarioModel.findAll();
        if (Usuarios.length == 0) {
            throw new Error();
        } else {
            return (<Array<Usuario>> Usuarios);
        }

    }

    public async newUsuario(Usuario: Usuario): Promise<Usuario> {
        let newUsuario: any = await UsuarioModel.create(Usuario);

        return <Usuario> newUsuario;

    }

    public async editUsuario(Usuario: Usuario): Promise<Usuario> {
        let editUsuario: any = await persistence.query(`UPDATE usuario SET rut="${Usuario.rut}", nombre='${Usuario.nombre}', apellido='${Usuario.apellido}', correo="${Usuario.correo}", contraseña="${Usuario.contraseña}" WHERE rut = "${Usuario.rut}"`
        , {type: persistence.QueryTypes.UPDATE});
        return <Usuario> editUsuario;

    }
    
    public async searchUsuarios(text: string): Promise<Array<Usuario>> {
        console.log(text)
        let Usuarios: Array<any> = await persistence.query('SELECT * FROM usuario WHERE nombre LIKE "%' + text + '%" OR apellido LIKE "%' + text + '%" GROUP BY rut', {
            model: UsuarioModel,
            mapToModel: true // pass true here if you have any mapped fields
          });
          
        if (Usuarios.length == 0) {
            throw new Error();
        } else {
            return (<Array<Usuario>> Usuarios);
        }

    }

    public async loginUsuarios(creds: any) : Promise<any>{
        //console.log(creds)
        let hehe:any = {
            "rut": "",
            "status": Number,
            "roles": []
        }
        const usuario = await persistence.query(`SELECT * FROM usuario WHERE rut = "${creds.username}" AND contraseña = "${creds.password}"`, {type: persistence.QueryTypes.SELECT})
        if(usuario[0].status == 0){
            console.log("Usuario no habilitado");
            return({message: "Usuario no habilitado"})
        }
        if (usuario.length > 0){
            const roles = await persistence.query(`SELECT name from rol JOIN rol_usuario ON id = id_rol WHERE id_rut = "${creds.username}"`, {type: persistence.QueryTypes.SELECT})
            hehe.rut = `${creds.username}`;
            hehe.status = usuario[0].status;
            //console.log(roles)
            for (let i = 0; i<roles.length; i++){   
                hehe.roles[i] =roles[i]["name"];
            }
            //console.log(hehe)
            return hehe
        }
        else{
            return ({message: "Rut/Contraseña no validos"})
        }
        
    }
}

export default new UsuarioRepository();