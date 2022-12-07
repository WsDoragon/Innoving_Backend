import { Request, Response } from 'express';
import { Usuario } from '../../entities/usuario';
import usuarioRepository from '../../persistence/repositories/usuario.repository';
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

        if ((request.body.rut == "" || request.body.rut == null || request.body.rut == undefined || request.body.nombre == "")) {
            
            response.status(404).json({status: false, error: 'El RUT y primer nombre es requerido'});
        }
        else{
            let usuario = new Usuario(request.body.rut, request.body.nombre, request.body.apellido, request.body.contraseña, request.body.correo, 1);        
            UsuarioRepository.newUsuario(usuario).then(usuarios => {
                response.status(201).json({status: true, data: usuarios});
            }, error => {
                response.status(409).json({status: false, error: "usuario ya creado en sistema"});
            });
    }
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

    public getAllProv(request: Request, response: Response) {
        console.log('search '+ request.query.params);

        UsuarioRepository.getAllP().then(Usuarios => {
            response.status(200).json({status: true, data: Usuarios});
        }, error => {
            response.status(404).json({status: false});
        });
    }

    public getAllInnov(request: Request, response: Response) {
        console.log(request.query.params);
        UsuarioRepository.getAllInnoving().then(Usuarios => {
            response.status(200).json({status: true, data: Usuarios});
        }, error => {
            response.status(404).json({status: false});
        });
    }



    public getEnabledUsers(request: Request, response: Response) {
        console.log('search '+ request.query.params);

        UsuarioRepository.getAllEnabled().then(Usuarios => {
            response.status(200).json({status: true, data: Usuarios});
        }, error => {
            response.status(404).json({status: false});
        });
    }
    
    public getDisabledUsers(request: Request, response: Response) {
        let data: any = request.query.soloInnoving
        console.log(data)
        UsuarioRepository.getDisabled(data).then(Usuarios => {
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

    public forgotPassword1(request: Request, response: Response) {

        console.log("forgot pasword")

        if ((request.body.email === "" )) {
            console.log("No se ingreso email")
            response.status(404).json({status: false, error: 'El e-mail es requerido para la solicitud'});

        }
        else{
            console.log("Solicitud correcta: " + request.body.email)
            UsuarioRepository.forgotPassword(request.body.email).then( res =>{
                response.status(200).json({status: true, data: "solicitud cargada"})
            }, error=>{
                response.status(404).json({status:false, mensaje:"Error en su consulta, usuario no existe o error en base de datos"})
            });
            
        }
    }

    public resetPassword1(request: Request, response: Response) {
        usuarioRepository.resetPassword(request.params.id, request.params.token, request.body.password)
            .then(res =>{
                //console.log(res)
                response.status(200).json({status: true, data: res})
            }, error =>{
                //console.log(error)
                response.status(404).json({status:false, mensaje:error.message})
            })
        //console.log("llega consulta de resetPassword: " + request.body.userPassword)
    }

}

export default new UsuarioController();