import { Publicacion } from "../../entities/publicacion";
import PublicacionModel from "../models/publicacion.model";
import persistence from "../../../config/persistence";


class PublicacionRepository {
    public async findPublicacionesByEstado(estado: string | undefined): Promise<Publicacion[]> {
        
        console.log(`[PUBLICACIONES_REPOSITORES]: estado: ${estado}`);
        
        let publicaciones: any[] = await PublicacionModel.findAll({
            attributes: [
                "publicacion_id",
                "titulo",
                "issn_doi",
                "autores",
                "revista",
                "disciplina",
                "autores_extranjeros",
                "anio",
                "comentario"
            ],
            where: (estado!=undefined) ? {
                estado
            } : undefined,
        });

        if (publicaciones.length == 0) {
            throw new Error();
        }
        return (<Publicacion[]> publicaciones);
    }

    public async findPublicacionesByIdIndicador(idIndicador: string): Promise<Publicacion[]> {

        console.log(`[PUBLICACION_REPOSITORY] idIndicador ${idIndicador}`);

        let [publicaciones, _meta]: any[] = await persistence.query(`
            SELECT publicacion_id,
            titulo,
            issn_doi,
            autores,
            revista,
            disciplina,
            autores_extranjeros,
            anio FROM publicacion
            JOIN Variables_Publicaciones pv ON pv.id_publicacion=publicacion_id
            JOIN Variables v ON v.id=pv.id_variable
            JOIN Indicadores_Variables iv ON iv.id_variable=v.id
            JOIN Indicadores i ON iv.id_indicador=i.id
            WHERE i.id="${idIndicador}"
        `);

        if (publicaciones.length == 0) {
            throw new Error();
        }
        return (<Publicacion[]> publicaciones);
    }


    public async updatePublicacion(id: number, publicacion: Publicacion) {
        const response: any = await PublicacionModel.update(
            publicacion,
            {
                where: {
                    publicacion_id: id
                }
            });

        console.log(`[UPDATE PUBLICACION] response: ${response}`);
    }
}

export default new PublicacionRepository();