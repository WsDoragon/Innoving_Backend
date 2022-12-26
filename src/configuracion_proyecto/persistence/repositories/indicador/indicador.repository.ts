import { triggerAsyncId } from "async_hooks";
import { Model , Sequelize} from "sequelize";
import { Request, Response } from 'express';
import { now } from "sequelize/types/utils";

import { Indicador } from '../../../entities/indicador/indicador';
import persistence from "../../../../config/persistence";

import IndicadorModel from "../../models/indicador/Indicador.model";

import servicios from "../../../modules/historialPeticiones/controllers/historialPeticiones.controllers"
import servicos2 from "../../../modules/metas/controllers/metas.controllers"
const sHistorial = servicios
const sMetas = servicos2

class IndicadoreRepository {

    public getTesteo() : Promise<any> {
        
        let text  : any   = "hola mundo"; 
        if (text == null ){
            throw new Error()
        } else {
            return (<any> text);
        }

    }

    public async getIndicadores() :  Promise<Array<Indicador>>{
        let indicadores : Array<any> = await IndicadorModel.findAll({
            order : Sequelize.literal("Aprobado DESC" )
        });

        if (indicadores.length == 0 ) {
            throw new Error();

        }else {
            return (<Array<Indicador>> indicadores)

        }

    }

    public async  createIndicador(indicador : Indicador) : Promise<Indicador> {
        let nuevoIndicador : any = await IndicadorModel.create(indicador);

        return <Indicador> nuevoIndicador;
    }


    

    public  async  setAprobado(data : any ){
        
        
        const myArray = data.id.split("_");
        const id : string  = myArray[0];
        const solicitud : string = myArray[1];
        const now : string = myArray[2];
        
        const indicador : any = await IndicadorModel.findOne({
            where : {id}, 
        });
        if(!indicador){
            throw new Error();
        }
        indicador.set({
            Aprobado : 1 

        })
        indicador.save()
         if(solicitud === "Añadir"){
            sHistorial.createHistorial({
                body :  {
        
                    id_imm : id, 
                    tipo  :1, 
                    solicitud : "Anadir", 
                    estado: "Aprobado", 
                    fecha : now
                }
            } as never  ,0 as never );
        }else{
            if(solicitud === "Eliminar"){
                sHistorial.createHistorial({
                    body : {
                        id_imm : id, 
                        tipo  :1, 
                        solicitud : "Eliminar", 
                        estado: "Rechazado", 
                        fecha : now
                    }
                } as never ,0 as never);
            } else{ 
                sHistorial.createHistorial({
                    body :{
                        id_imm : id, 
                        tipo  :1, 
                        solicitud : "Eliminar", 
                        estado: "Aprobado", 
                        fecha : now
                    }
                } as never , 0 as never )
            }

            
        }
        
        
        return "ok"

    }

    public async  setPeticion(id : string) {
        
        console.log(id)
        const indicador : any = await IndicadorModel.findOne({
            where : {id}, 
        });
        
        if(!indicador){
            throw new Error();
            
        }
        indicador.set({
            Aprobado : 0, 
            Peticion : "Eliminar"

        })
        indicador.save();

        return "ok"

    }


    public async editarIndicador(id : string, indicador: Indicador){
        const nuevoIndicador : any = await IndicadorModel.create(indicador);
        
        const ADD_QUERY= `UPDATE indicadores SET Aprobado = 3 WHERE id = '${id}';`
        const desactivarMeta : any = await  persistence.query(ADD_QUERY, {type: persistence.QueryTypes.UPDATE});
        
    
        return ("ok")
    } 

    public async  eliminarIndicadorEditado(data : any){
        const myArray = data.split("_");
        const ideliminar = myArray[0];
        const idantigua = myArray[1];
        const now = myArray[2];
        const ADD_QUERY = `DELETE FROM indicadores WHERE id = "${ideliminar}";`
        const  eliminarIndicador : any =  await persistence.query(ADD_QUERY, {type: persistence.QueryTypes.DELETE});

        if(!eliminarIndicador)
            throw new Error()

        const ADD_QUERY2 = `UPDATE indicadores SET Aprobado = 1 WHERE id = '${idantigua}';`
        const updateIndicador : any = await persistence.query(ADD_QUERY2, {type: persistence.QueryTypes.UPDATE});
        if(!updateIndicador)
            throw new Error()

        sHistorial.createHistorial({
            body: {
                id_imm: idantigua, 
                tipo: 1, 
                solicitud: 'Editar', 
                estado: 'Rechazado', 
                fecha: now 
            }  }as never, 0 as never );

        return "ok"; 

    }

    public async  eliminarIndicador(data : any){

        const myArray = data.split("_");
        const ideliminar = myArray[0];
        const idnueva = myArray[1];
        const now = myArray[2];

        const ADD_QUERY = `DELETE FROM indicadores WHERE id = "${ideliminar}";`
        const  eliminarIndicador : any =  await persistence.query(ADD_QUERY, {type: persistence.QueryTypes.DELETE});

        
    
         sHistorial.setHistorial({
            body: { 
                D: idnueva.slice(0,-2),
                 id: ideliminar, 
                 tipo: 1
            }} as never, 0 as never );
        sMetas.cambiarMetasIndicador({
            body: { 
                idnueva: idnueva.slice(0,-2), 
                ideliminar: ideliminar
            }} as never , 0 as never );

        const UPDATE_QUERY = `UPDATE indicadores SET Aprobado = 1, id = "${idnueva.slice(0,-2)}"  WHERE id = "${idnueva}";`
        const updateIndicador  : any = await  persistence.query(UPDATE_QUERY, {type: persistence.QueryTypes.UPDATE});
       

        sHistorial.createHistorial({
            body: { 
                id_imm: idnueva.slice(0,-2),
                tipo: 1, 
                solicitud: 'Editar',
                estado: 'Aprobado', 
                fecha: now 
            }} as never , 0 as never );

    }

    public async  deleteIndicador(data : any ){
        const myArray = data.split("_");
        const id : string  =  myArray[0];
        const  solicitud: string = myArray[1];
        const now : string = myArray[2];

        const indicador : any = await IndicadorModel.findOne({
            where : {id}, 
        });
        if(!indicador){
            throw new Error();
            
        }
        indicador.set({
         
            
            Aprobado : 2 
        })
        indicador.save()

        if(solicitud === "Eliminar"){
            sHistorial.createHistorial( {
                body : {
                    id_imm : id, 
                    tipo  :1, 
                    solicitud : "Eliminar", 
                    estado: "Aprobado", 
                    fecha : now
                }
            } as never,   0 as never );
            }else{
            sHistorial.createHistorial( {
                body : {
                    id_imm : id, 
                    tipo  :1, 
                    solicitud : "Añadir", 
                    estado: "Rechazado", 
                    fecha : now
                }
            } as never ,0 as never );

            }
        

            return "ok "


    }

    

    

}


export default new IndicadoreRepository();