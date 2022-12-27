import { Model, where, Sequelize } from "sequelize";

import { Metas } from "../../../entities/metas/metas";
import persistence from "../../../../config/persistence";
import MetasModel from "../../models/metas/Metas.model";


import servicios from "../../../modules/historialPeticiones/controllers/historialPeticiones.controllers";
const sHistorial = servicios



class MetasRepository {

    public async getMetas() : Promise<Array<Metas>>{
        let metas : Array<any> = await MetasModel.findAll({
            order : Sequelize.literal("Aprobado ASC" )
        });

        if (metas.length === 0 ){
            throw new Error();
        }else{
            return (<Array<Metas>> metas);
        }
    }

    public async createMetas(meta : Metas) : Promise<Metas>{
        console.log(meta);
        let nuevaMeta : any = await MetasModel.create(meta);
        return <Metas> nuevaMeta;
     
        

    }

    public async setAprobado(data : any )   {
        const myArray = data.split("_")
        const id : string =  myArray[0];
        const solicitud : string =  myArray[1]; 
        const now : string = myArray[2];
        
        
        const meta : any   = await MetasModel.findOne({
            where : {id},
        });
        if (!meta){
            throw new Error();
        }
        meta.set({
            Aprobado : 1
        })
        meta.save()
        if(solicitud === "Añadir"){
            sHistorial.createHistorial({
                body :  {
        
                    id_imm : id, 
                    tipo  :2, 
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
                        tipo  :2, 
                        solicitud : "Eliminar", 
                        estado: "Rechazado", 
                        fecha : now
                    }
                } as never ,0 as never);
            } else{ 
                sHistorial.createHistorial({
                    body :{
                        id_imm : id, 
                        tipo  :2, 
                        solicitud : "Eliminar", 
                        estado: "Aprobado", 
                        fecha : now
                    }
                } as never , 0 as never )
            }

            
        }
        
        return "ok"
    }

    public async setPeticion(data : any ){
        const myArray = data.split("-");
        console.log(myArray);
        //const id: number  =   parseInt(myArray[0],10);
        const id :string = myArray[0]
        const fecha : string = myArray[1];
        console.log(fecha)
        console.log(id)
        const meta : any = await MetasModel.findOne({
            where : {idindicador : id}
        });
        //console.log(meta)
        if(!meta){
            throw new Error();
        }

        meta.set({
            Peticion : "Eliminar",
            Aprobado : 0,
            fecha : fecha
        })
        console.log(meta.Peticion)
        console.log(meta.Aprobado)
        meta.save()
        return "ok"
        
        
    }

    public async deleteMetas(data : any ){
        const myArray = data.split("-");
        const id : number =  parseInt(myArray[0],10);
        const solicitud : string = myArray[1];
        const now :string  = myArray[2]; 

        console.log(id)

        const meta : any = await MetasModel.findOne({
            where :  {id},
        });

        if(!meta) {
            throw new Error();
        }
        
        meta.set({
            Aprobado :2

        })
        meta.save()
        sHistorial.setHistorial({
            body: { 
                D: `${id}`, 
                id: `${id}`, 
                tipo: 2}} as never , 0 as never ); 
        if(solicitud === "Eliminar"){
            sHistorial.createHistorial( {
                body : {
                    id_imm : id, 
                    tipo  :2, 
                    solicitud : "Eliminar", 
                    estado: "Aprobado", 
                    fecha : now
                }
            } as never ,0 as never );
            }else{
            sHistorial.createHistorial( {
                body : {
                    id_imm : id, 
                    tipo  :2, 
                    solicitud : "Añadir", 
                    estado: "Rechazado", 
                    fecha : now
                }
            } as never , 0 as never);

            }
    } 


    public async deleteMetasIndicador(data : any ){
        const {idindicador , antiguaid, antiguaidN , Aprobado} = data
        const idNum : number = Math.floor(Math.random() * 999999);
        const metasI : any = await MetasModel.findOne({
            where :{idindicador}
        }) 
        if(!metasI){
            throw new Error();
        }
        metasI.set({
            idindicador : idNum,
            Aprobado : Aprobado, 
            antiguaid : antiguaidN, 
        })
        metasI.seve();


    }

    public async cambiarMetasIndicador(data : any) {
        const ADD_QUERY = `UPDATE metas SET idindicador = '${data.idnueva}' WHERE idindicador = '${data.ideliminar}';`
        const updateMetas  : any = await  persistence.query(ADD_QUERY, {type: persistence.QueryTypes.UPDATE});
        return "ok"
    }
    
    public async editarMeta(metas : Metas, idMetaActualizar : number){
        let nuevaMeta : any = await MetasModel.create(metas);

        const ADD_QUERY = `UPDATE metas SET Aprobado = 3 WHERE id = '${idMetaActualizar}';`
        const desactivarMeta : any = await  persistence.query(ADD_QUERY, {type: persistence.QueryTypes.UPDATE});

        return "ok"
    }

    public async eliminarMetaEditado (data : any ){
        const myArray = data.split("_");
        const ideliminar = myArray[0];
        const idantigua = myArray[1];
        const now = myArray[2];
        const ADD_QUERY = `DELETE FROM metas WHERE id = "${ideliminar}";`
        const eliminarMeta : any = await  persistence.query(ADD_QUERY, {type: persistence.QueryTypes.DELETE});


        const ADD_QUERY2 = `UPDATE metas SET Aprobado = 1 WHERE id = '${idantigua}';`
        const actualizarMeta : any = await  persistence.query(ADD_QUERY2, {type: persistence.QueryTypes.DELETE});
        sHistorial.createHistorial(
            {body: { 
                id_imm: idantigua, 
                tipo: 2, 
                solicitud: 'Editar',
                estado: 'Rechazado',
                fecha: now 
                }
            }  as never, 0 as never);

            
    }

    public async eliminarMeta( data : any){ 
        const myArray = data.split("_");
        const ideliminar = myArray[0];
        const idnueva = myArray[1];

        const ADD_QUERY = `DELETE FROM metas WHERE id = "${ideliminar}";`
        const eliminarMeta : any = await  persistence.query(ADD_QUERY, {type: persistence.QueryTypes.DELETE});
        sHistorial.setHistorial(
            {body: { 
                D: idnueva,
                id: ideliminar, 
                tipo: 2
                }
            } as never, 0 as never ); 
    }

    



}

export default new MetasRepository();