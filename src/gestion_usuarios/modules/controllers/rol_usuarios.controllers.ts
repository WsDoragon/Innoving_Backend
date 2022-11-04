import { Request, Response } from 'express';
import { RolUsuario } from '../../entities/rol_usuario';
import RolUsuarioRepository from '../../persistence/repositories/rol_usuario.repository';
//AÑADIR CONTROLADORES(consulta superficie?) SI SE NECESITAN
class RolUsuarioController {
    public getRolUsuarios(request: Request, response: Response) {
        console.log('search '+ request.query.params);

        RolUsuarioRepository.findRolUsuarios().then(Roles => {
            response.status(200).json({status: true, data: Roles});
        }, error => {
            response.status(404).json({status: false});
        });
    }
    
    public addRolUsuarios(request: Request, response: Response) {
        RolUsuarioRepository.addRolUsuario(request.body.rut, request.body.roles).then(Roles => {
            response.status(200).json({status: true, data: Roles});
        }, error => {
            response.status(404).json({status: false});
        });
    }

    public changeRolUsuarios(request: Request, response: Response) {
        RolUsuarioRepository.changeRolUsuario(request.body.rut, request.body.roles).then(Roles => {
            response.status(200).json({status: true, data: Roles});
        }, error => {
            response.status(404).json({status: false});
        });
    }

}

export default new RolUsuarioController();