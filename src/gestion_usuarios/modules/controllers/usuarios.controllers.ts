import { Request, Response } from 'express';
import { Usuario } from '../../entities/usuario';
import usuarioRepository from '../../persistence/repositories/usuario.repository';
import UsuarioRepository from '../../persistence/repositories/usuario.repository';
import jwtController from './jwt.controller';
import mailerRepository from '../../persistence/repositories/mailer.repository';

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
    // Aplicar refactoring JWT y Nodemailer (Como en resetpassword)
    public addUsuario(request: Request, response: Response) {

        let rut:Boolean = (request.body.rut == "" || request.body.rut == null || request.body.rut == undefined);
        let name:Boolean = (request.body.nombre == "" || request.body.nombre == null || request.body.nombre == undefined);
        let rol:Boolean = request.body.roles == "";
        let correo:Boolean = request.body.correo == "";

        if (name || rut || rol || correo) {        
            
            let text:String = "Faltan campos por rellenar: ";
            if(name){
                text = text + "Nombre - ";   
            }

            if(correo){
                text = text + "Correo - ";   
            }

            if(rut){
                text = text + "Rut - ";
            }
            
            if(request.body.roles != "4"){
                if(rol){
                    text = text + "Rol";
                }
            }

            else{
                let c:string[] = request.body.contraseña.split("$");
                
                let d:string = c[0];
                let m:string = c[1];
                let a:string = c[2];
                
                if(parseInt(d) > 31 || isNaN(+d) || d.length == 0){
                    text = text + "Día - ";
                }

                if(m.length < 4){
                    text = text + "Mes - ";
                }

                if(parseInt(a) > 1930 || parseInt(a) < 2020 || isNaN(+a) || d.length == 0){
                    text = text + "Año";
                }
            }

            
            if(text.slice(-3, text.length) == " - "){
                text = text.slice(0,-3);
            }

            response.status(404).json({status: false, error: text}); 


        }         
        else{
            let usuario = new Usuario(request.body.rut, request.body.nombre, request.body.apellido, request.body.contraseña, request.body.correo, 1);     
            
            let token = jwtController.createToken(usuario.correo);
            UsuarioRepository.newUsuario(usuario, token).then(usuarios => {
                mailerRepository.newEmail(usuarios).then( res => {
                    response.status(201).json({status: true, data: usuarios});
                }, error => {
                    response.status(409).json({status: false, error: "Correo no enviado"});
                })
                
            }, error => {
                response.status(409).json({status: false, error: "Usuario ya creado en sistema"});
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
            let token = jwtController.createToken(request.body.email)
            UsuarioRepository.forgotPassword(request.body.email, token).then( res =>{
                mailerRepository.forgotEmail(request.body.email, token, res.rut).then( res => {
                    response.status(200).json({status: true, data: "solicitud cargada"})
                }, error => {
                    response.status(404).json({status:false, mensaje:"Error en su consulta, Correo no enviado"})
                })
                
            }, error=>{
                response.status(404).json({status:false, mensaje:"Error en su consulta, usuario no existe o error en base de datos"})
            });
            
        }
    }

    //Refactoring aplicado
    public resetPassword1(request: Request, response: Response) {
        jwtController.validateToken(request.body.token)
            .then( res => {
                usuarioRepository.resetPassword(request.params.id, request.params.token, request.body.password, res)
                    .then(res =>{
                        //console.log(res)
                        response.status(200).json({status: true, data: res})
                    }, error =>{
                        console.log(error.message)
                        response.status(404).json({status:false, a: error.message})
                    })
            }, error => {
                //console.log(error.message)
                response.status(404).json({status:false, message: error.message})
        })
    }

}

export default new UsuarioController();