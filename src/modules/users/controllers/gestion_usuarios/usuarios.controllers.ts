import { Request, Response } from 'express';
import { Usuario } from '../../../../entities/gestion_usuarios/usuario';
import UsuarioRepository from '../../../../persistence/repositories/gestion_usuarios/usuario.repository';

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
        console.log('getUsuario by id? '+ request.query.id);
        
        UsuarioRepository.findUsuario(request.body.id).then(Usuario => {
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

        if (request.body.lastName == "" || request.body.lastName == null || request.body.lastName == undefined) {
            
            response.status(400).json({status: false, message: 'El primer nombre es requerido'});
        }

        let usuario = new Usuario(request.body.rut, request.body.nombre, request.body.apellido, request.body.correo, request.body.contraseña, request.body.status);

        UsuarioRepository.newUsuario(usuario).then(usuarios => {
            response.status(201).json({status: true, data: usuarios});
        }, error => {
            response.status(400).json({status: false});
        });
    }

    public loginUsuario(request:Request, response:Response){
        console.log("login: " + request.body);
        UsuarioRepository.loginUsuarios(request.body).then(usuario => {
            //console.log("loginCF: " + usuario)
            response.status(201).json(usuario)
        })
    }
}

export default new UsuarioController();