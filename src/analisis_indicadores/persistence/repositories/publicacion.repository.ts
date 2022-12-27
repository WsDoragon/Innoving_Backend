import { Publicacion } from "../../entities/publicacion";
import PublicacionModel from "../models/publicacion.model";
import persistence from "../../../config/persistence";


class PublicacionRepository {
    public async findPublicacionesByEstado(estado: number | undefined): Promise<Publicacion[]> {
        
        console.log(`[PUBLICACIONES_REPOSITORES]: estado: ${estado}`);
        
        let publicaciones: any[] = await PublicacionModel.findAll({
            attributes: [
                "publicacion_id",
                "titulo",
                "issn_doi",
                "autores",
            ],
            where: (estado!=undefined) ? {
                validado: estado
            } : undefined,
        });

        if (publicaciones.length == 0) {
            return [];
        }
        return (<Publicacion[]> publicaciones);
    }

    public async findPublicacionesByIdIndicador(idIndicador: string): Promise<Publicacion[]> {

        console.log(`[PUBLICACION_REPOSITORY] idIndicador ${idIndicador}`);

        let [publicaciones, _meta]: any[] = await persistence.query(`
            SELECT publicacion_id,
            titulo,
            issn_doi,
            autores
            FROM publicacion
            JOIN Variable_Publicaciones pv ON pv.id_publicacion=publicacion_id
            JOIN variables v ON v.id=pv.id_variable
            JOIN indicadores_variables iv ON iv.id_variable=v.id
            JOIN indicadores i ON iv.id_indicador=i.NumeroIndicador
            WHERE i.id="${idIndicador}"
        `);

        if (publicaciones.length == 0) {
            return [];
        }
        return (<Publicacion[]> publicaciones);
    }

    public async findPublicacionById(id: number): Promise<Publicacion> {
        const res: any = await PublicacionModel.findByPk(id);

        if (res) {
            console.log(`[PUBLICACION REPOSITORY] ${res.publicacion_id}`);
            return <Publicacion> res;
        }

        throw new Error();
    }


  
}

export default new PublicacionRepository();