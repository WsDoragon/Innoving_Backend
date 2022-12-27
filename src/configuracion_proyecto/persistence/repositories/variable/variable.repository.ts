import { Model, Sequelize } from "sequelize";
import persistence from "../../../../config/persistence";
import { now } from "sequelize/types/utils";
import VariableModel from "../../models/variable/variable.model";
class VariableRepository{

    public async addVariables(req : any ){
        VariableModel;
        const ADD_QUERY = `INSERT INTO variables_publicaciones (valor, id_publicacion, id_variable) values (1, ${req.body.publicacion_id}, 2);`
        const addVariable : any  = await persistence.query(ADD_QUERY, {type: persistence.QueryTypes.POST});
        if(req.body.autores_extranjeros === 1){
            const ADD_QUERY2 =  `INSERT INTO variables_publicaciones (valor, id_publicacion, id_variable) values (1, ${req.body.publicacion_id}, 1);`
            const addVariable2 : any  = await persistence.query(ADD_QUERY2, {type: persistence.QueryTypes.POST});
        }
        if(req.body.disciplina === "Ingeniería"){
            const ADD_QUERY3 =  `INSERT INTO variables_publicaciones (valor, id_publicacion, id_variable) values (1, ${req.body.publicacion_id}, 3);`
            const addVariable3 : any  = await persistence.query(ADD_QUERY3, {type: persistence.QueryTypes.POST});
        }else{
            const ADD_QUERY4 =  `INSERT INTO variables_publicaciones (valor, id_publicacion, id_variable) values (1, ${req.body.publicacion_id}, 4);`
            const addVariable4 : any  = await persistence.query(ADD_QUERY4, {type: persistence.QueryTypes.POST});
        }

        return "ok"

    }

    public async M26(req : any ){

        let meta ; 
        const TASK_QUERY = `SELECT cantidad FROM metas WHERE idindicador = "M26" AND fecha = ${req.body.anio}`; 
        const GetVariable3 : any  = await persistence.query(TASK_QUERY, {type: persistence.QueryTypes.SELECT});
        meta =  GetVariable3; 
        console.log(GetVariable3)
        const TASK_QUERY2 = `SELECT MONTH(P.anio) AS Mes, SUM(valor) AS Valor FROM variables_publicaciones JOIN publicacion P ON id_publicacion = P.publicacion_id WHERE id_variable= 3 AND YEAR(P.anio) = ${req.body.anio} GROUP BY MONTH(P.anio)`; 

        const GetVariable4 =  await persistence.query(TASK_QUERY2, {type: persistence.QueryTypes.SELECT});

        for(let i = 0; i<12; i++){
            try {
                if(GetVariable4[i]["Mes"] != i+1){
                    GetVariable4.splice(i,0,{"Mes": i+1, "Valor": "0"});
                }
            } catch (error) {
                GetVariable4.splice(i,0,{"Mes": i+1, "Valor": "0"});
                
            }
        }

        return [meta,GetVariable4]
    }

    public async M25(req : any ){
        let meta ; 
        const TASK_QUERY = `SELECT cantidad FROM metas WHERE idindicador = "M25" AND fecha = ${req.body.anio};`; 
        const GetVariable3 : any  = await persistence.query(TASK_QUERY, {type: persistence.QueryTypes.SELECT});
        meta =  GetVariable3; 

        const TASK_QUERY2 = ` SELECT MONTH(P.anio) AS Mes, SUM(valor) AS Valor FROM variables_publicaciones JOIN publicacion P ON id_publicacion = P.publicacion_id WHERE id_variable= 2 AND YEAR(P.anio) = ${req.body.anio} GROUP BY MONTH(P.anio)`; 
        const GetVariable4 =  await persistence.query(TASK_QUERY2, {type: persistence.QueryTypes.SELECT});

        for(let i = 0; i<12; i++){
            try {
                if(GetVariable4[i]["Mes"] != i+1){
                    GetVariable4.splice(i,0,{"Mes": i+1, "Valor": "0"});

                }
            } catch (error) {
                GetVariable4.splice(i,0,{"Mes": i+1, "Valor": "0"});
                
            }
        }

        return [meta,GetVariable4]
        
    }

    public async M49(req : any ){

        let  metas;
        const TASK_QUERY3 = `SELECT cantidad FROM metas WHERE idindicador = "M49" AND fecha = "${req.body.anio}";`
        const GetVariable3 : any  = await persistence.query(TASK_QUERY3, {type: persistence.QueryTypes.SELECT});
        metas  = GetVariable3;
        //---------------------------------------------------------------------------------------------------//
        let extranjeros;
        const TASK_QUERY4 = `SELECT MONTH(P.anio) AS Mes, SUM(valor) AS Valor FROM variables_publicaciones JOIN publicacion P ON id_publicacion = P.publicacion_id WHERE id_variable= 1 AND YEAR(P.anio) = "${req.body.anio}" GROUP BY MONTH(P.anio);`
        const GetVariable4 : any  = await persistence.query(TASK_QUERY4, {type: persistence.QueryTypes.SELECT});
        extranjeros = GetVariable4; 
        //----------------------------------------------------------------------------------------------------//

        const TASK_QUERY5 = `SELECT MONTH(P.anio) AS Mes, SUM(valor) AS Valor FROM variables_publicaciones JOIN publicacion P ON id_publicacion = P.publicacion_id WHERE id_variable= 2 AND YEAR(P.anio) = "${req.body.anio}" GROUP BY MONTH(P.anio);`
        const GetVariable5 : any  = await persistence.query(TASK_QUERY5, {type: persistence.QueryTypes.SELECT});

        for( let i= 0; i<12;  i++ ){
            try {
                if(extranjeros[i]["Mes"] != i+1){
                    extranjeros.splice(i,0,{"Mes": i+1, "Valor": "0"});

                }
            } catch (error) {
                extranjeros.splice(i,0,{"Mes": i+1, "Valor": "0"})
                
            }
        }
        for( let i= 0; i<12;  i++ ){
            try {
                if(GetVariable5[i]["Mes"] != i+1){
                    GetVariable5.splice(i,0,{"Mes": i+1, "Valor": "1"});
                }
                
            } catch (error) {
                GetVariable5.splice(i,0,{"Mes": i+1, "Valor": "1"});           
            }
        }

        let porcentaje = [];
        for(var i = 0; i< 12; i++){
            porcentaje.push({"Mes": i+1, "Valor": (extranjeros[i]["Valor"]/GetVariable5[i]["Valor"])*100})
        }

        return([metas,porcentaje])
        

    }

        
        
    



}




export default new VariableRepository();