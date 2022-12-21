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

        
        const TASK_QUERY = `SELECt SUM(valor) AS SUMA FROM variables_publicaciones JOIN publicacion P ON id_publicacion = P.publicacion_id WHERE id_variable= 3 AND P.anio BETWEEN "${req.body.fecha1}" AND "${req.body.fecha2}";`
        const GetVariable3 : any  = await persistence.query(TASK_QUERY, {type: persistence.QueryTypes.GET});
        return GetVariable3[0][0]["SUMA"];
    }

    public async M25(req : any ){
        const TASK_QUERY = `SELECt SUM(valor) FROM variables_publicaciones JOIN publicacion P ON id_publicacion = P.publicacion_id WHERE id_variable= 2 AND P.anio BETWEEN "${req.body.fecha1}" AND "${req.body.fecha2}";`
        const GetVariable3 : any  = await persistence.query(TASK_QUERY, {type: persistence.QueryTypes.GET});
        return GetVariable3[0][0]["SUM(valor)"];
        
    }

    public async M49(req : any ){

        let  extranjero;
        const TASK_QUERY = `SELECt SUM(valor) FROM variables_publicaciones JOIN publicacion P ON id_publicacion = P.publicacion_id WHERE id_variable= 1 AND P.anio BETWEEN "${req.body.fecha1}" AND "${req.body.fecha2}";`
        const GetVariable3 : any  = await persistence.query(TASK_QUERY, {type: persistence.QueryTypes.GET});
        console.log(GetVariable3[0])
        extranjero = GetVariable3[0][0]["SUM(valor)"];

        const TASK_QUERY2 = `SELECt SUM(valor) FROM variables_publicaciones JOIN publicacion P ON id_publicacion = P.publicacion_id WHERE id_variable= 2 AND P.anio BETWEEN "${req.body.fecha1}" AND "${req.body.fecha2}";`
        const GetVariable4 : any  = await persistence.query(TASK_QUERY2, {type: persistence.QueryTypes.GET});
        console.log(GetVariable4[0][0]["SUM(valor)"])
        let porcentaje = (extranjero/GetVariable4[0][0]["SUM(valor)"] * 100).toString();

        return porcentaje
}
        
    



}




export default new VariableRepository();