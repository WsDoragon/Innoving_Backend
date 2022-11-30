import { Usuario } from "../../entities/usuario";
import persistence from "../../../config/persistence";
import UsuarioModel from "../models/usuario.model";

import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

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

    public async editUsuario(currentID: string, Usuario: Usuario): Promise<Usuario> {
        let editUsuario: any = await persistence.query(`UPDATE usuario SET rut="${Usuario.rut}", nombre='${Usuario.nombre}', apellido='${Usuario.apellido}', correo="${Usuario.correo}", contraseña="${Usuario.contraseña}" WHERE rut = "${currentID}"`
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
        let hehe:any = {
            "rut": "",
            "status": Number,
            "roles": []
        }
        const usuario = await persistence.query(`SELECT * FROM usuario WHERE rut = "${creds.username}" AND contraseña = "${creds.password}"`, {type: persistence.QueryTypes.SELECT})
        
        if(usuario.length == 0){
            console.log("rut o contraseña erroneos")
            return ({message: "Rut/Contraseña no validos"})
        }
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

    public async getAll(){
        let json:any[] = [];
        const result = await persistence.query(`SELECT * FROM usuario`, {type: persistence.QueryTypes.SELECT});

        for (let i of result){
        let rol:any = []
        const roles = await persistence.query(`SELECT name FROM rol_usuario
                                                JOIN rol ON id=id_rol
                                                WHERE id_rut ="${i.rut}"`,
                                                {type: persistence.QueryTypes.SELECT});
        for(let j of roles){
            rol.push(j.name);
        }
        let a = {"rut": i.rut, "nombre": i.nombre, "apellido":i.apellido, "correo": i.correo, "roles": rol, "status":i.status};
            
            json.push(a);
        }
        return json;
    }

    public async getAllP(){
        console.log("xd")
        let json:any[] = [];

        const result = await persistence.query(`select * FROM usuario JOIN rol_usuario ON rut=id_rut WHERE id_rol = 4`, {type: persistence.QueryTypes.SELECT});

        for (let i of result){
            let rol:any = []

        let a = {"rut": i.rut, "nombre": i.nombre, "apellido":i.apellido, "correo": i.correo, "roles": rol, "status":i.status};
            
            json.push(a);
        }
        console.log(result)
        return json;
    }

    public async getAllInnoving(){
        let json:any[] = [];
        //ARREGLAR
        const result = await persistence.query(`select DISTINCT 
                                                rut,nombre, apellido, correo, contraseña, status 
                                                FROM usuario 
                                                JOIN rol_usuario 
                                                ON rut=id_rut 
                                                WHERE id_rol != 4;`, {type: persistence.QueryTypes.SELECT});

        for (let i of result){
            let rol:any = []
        const roles = await persistence.query(`SELECT name FROM rol_usuario
                                                JOIN rol ON id=id_rol
                                                WHERE id_rut ="${i.rut}" `,
                                                {type: persistence.QueryTypes.SELECT});
        for(let j of roles){
            rol.push(j.name);
        }
        let a = {"rut": i.rut, "nombre": i.nombre, "apellido":i.apellido, "correo": i.correo, "roles": rol, "status":i.status};
            
            json.push(a);
        }
        return json;
    }



    public async getAllEnabled(){
        let json:any[] = [];
        const result = await persistence.query(`SELECT * FROM usuario WHERE status=1`, {type: persistence.QueryTypes.SELECT});

        for (let i of result){
            let rol:any = []
        const roles = await persistence.query(`SELECT name FROM rol_usuario
                                                JOIN rol ON id=id_rol
                                                WHERE id_rut ="${i.rut}" `,
                                                {type: persistence.QueryTypes.SELECT});
        for(let j of roles){
            rol.push(j.name);
        }
        let a = {"rut": i.rut, "nombre": i.nombre, "apellido":i.apellido, "correo": i.correo, "roles": rol, "status":i.status};
            
            json.push(a);
        }
        return json;
    }

    public async getAllDisabled(){
        let json:any[] = [];
        const result = await persistence.query(`SELECT * FROM usuario WHERE status=0`, {type: persistence.QueryTypes.SELECT});

        for (let i of result){
        let rol = "-"
        const roles = await persistence.query(`SELECT name FROM rol_usuario
                                                JOIN rol ON id=id_rol
                                                WHERE id_rut ="${i.rut}" `,
                                                {type: persistence.QueryTypes.SELECT});
        for(let j of roles){
            rol = rol+j.name+"-";
        }
        let a = {"rut": i.rut, "nombre": i.nombre, "apellido":i.apellido, "correo": i.correo, "roles": rol, "status":i.status};
            
            json.push(a);
        }
        return json;
    }

    public async desactivarUser(id: string){
        let editUsuario: any = await persistence.query(`UPDATE usuario SET status = "0" WHERE rut = "${id}"`
            , {type: persistence.QueryTypes.UPDATE});
        console.log(`Usuario deshabilitado: ${id}`)
        return editUsuario;

    }

    public async activarUser(id: string){
        let editUsuario: any = await persistence.query(`UPDATE usuario SET status = "1" WHERE rut = "${id}"`
            , {type: persistence.QueryTypes.UPDATE});
        console.log(`Usuario deshabilitado: ${id}`)
        return editUsuario;

    }

    public async resetPassword(email: string){
        console.log(email)

        const user = await UsuarioModel.findOne({
            where: {
                correo: email
            }
        })

        if (!user){
            throw new Error()
        }
        let test = user.toJSON()
        
        
        const token = jwt.sign({id: test.rut}, 'innovame1234', {expiresIn:"1h"});
        user.update({
            token: token
        });

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: `${process.env.EMAIL_ADDRESS}`,
                pass: `${process.env.EMAIL_PASSWORD}`,
            }
        });

        const emailPort = process.env.EMAIL_PORT || 3000;

        const mailOptions={
            from: `${process.env.EMAIL_FROM}`,
            to: `${test.correo}`,
            subject: 'Enlace para recuperar tu cuenta de Innoving',
            text:
            `su enlace para recuperar la contraseña es \n
            url: localhost:3000/resePass/${test.rut}/${token}`
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err){
                console.error ("Ha ocurrido un error: ", err);
            } else {
                console.log("respuesta:", response);
                return("email para la recuperacion de contraseña ha sido enviado")
            }
        })


    }


}

export default new UsuarioRepository();