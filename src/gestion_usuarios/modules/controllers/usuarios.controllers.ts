import { Request, Response } from 'express';
import { Usuario } from '../../entities/usuario';
import UsuarioRepository from '../../persistence/repositories/usuario.repository';

class UsuarioController {

    public searchUsuarios(request: Request, response: Response) {
        
        Object.keys(request.query).forEach(function (key) {
            var val = request.query[key];
            console.log('search '+ val);
            // use val
        });

        console.log('search '+ Object.keys(request.query));
        UsuarioRepository.searchUsuarios(<string> request.query.text).then(Usuario => {
            response.status(200).json({status: true, data: Usuario});
        }, error => {
            response.status(404).json({status: false});
        });
    }

    public getUsuario(request: Request, response: Response) {
        let data: any = request.query.rut;
        UsuarioRepository.findUsuario(data).then(Usuario => {
            response.status(200).json({status: true, data: Usuario});
        }, error => {
            response.status(404).json({status: false});
        });
    }

    public getUsuarios(request: Request, response: Response) {
        console.log('search '+ request.query.params);

        UsuarioRepository.findUsuarios().then(Usuarios => {
            response.status(200).json({status: true, data: Usuarios});
        }, error => {
            response.status(404).json({status: false});
        });
    }

    public addUsuario(request: Request, response: Response) {

        if (request.body.apellido == "" || request.body.apellido == null || request.body.apellido == undefined) {
            
            response.status(400).json({status: false, message: 'El primer nombre es requerido'});
        }

        let usuario = new Usuario(request.body.rut, request.body.nombre, request.body.apellido, request.body.contraseña, request.body.correo, 1);        
        UsuarioRepository.newUsuario(usuario).then(usuarios => {
            response.status(201).json({status: true, data: usuarios});
        }, error => {
            response.status(400).json({status: false});
        });
    }

    public editUsuario(request: Request, response: Response){   
        console.log(request.body.newInfo.roles);
        let newInfo : any = request.body.newInfo;
        let usuario = new Usuario(newInfo.rut, newInfo.nombre, newInfo.apellido, newInfo.contraseña, newInfo.correo, newInfo.status);
        UsuarioRepository.editUsuario(request.body.id, usuario).then(usuarios => {
            response.status(201).json({status: true, data: usuarios});
        }, error => {
            response.status(400).json({status: false});
        });
    }

    public loginUsuario(request:Request, response:Response){
        console.log("login: " + Object.keys(request.body));
        UsuarioRepository.loginUsuarios(request.body).then(usuario => {
            //console.log("loginCF: " + usuario)
            response.status(201).json(usuario)
        })
    }

    public getAllUsers(request: Request, response: Response) {
        console.log('search '+ request.query.params);

        UsuarioRepository.getAll().then(Usuarios => {
            response.status(200).json({status: true, data: Usuarios});
        }, error => {
            response.status(404).json({status: false});
        });
    }

    public disableUser(request: Request, response: Response) {
        console.log('search '+ request.query.params);

        UsuarioRepository.desactivarUser(request.body.rut).then(Usuarios => {
            response.status(200).json({status: true, data: Usuarios});
        }, error => {
            response.status(404).json({status: false});
        });
    }

    public enableUser(request: Request, response: Response) {
        console.log('search '+ request.query.params);

        UsuarioRepository.activarUser(request.body.rut).then(Usuarios => {
            response.status(200).json({status: true, data: Usuarios});
        }, error => {
            response.status(404).json({status: false});
        });
    }
}

export default new UsuarioController();