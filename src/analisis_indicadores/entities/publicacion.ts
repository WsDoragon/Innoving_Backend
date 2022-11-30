export class Publicacion {
    public publicacion_id: number | undefined;
    public issn_doi?: string;
    public titulo?: string;
    public autores?: string;
    public revista?: string;
    public autores_extranjeros?: number;
    public indexacion?: string;
    public anio?: string;
    public citaciones?: string;
    public clasificacion?: string;
    public disciplina?: string;
    public estado?: string;
    public comentario?: string | null;
/*
    constructor(
        issDoi: string,
        titulo: string,
        autores: string,
        revista: string,
        autoresExtranjeros: number,
        indexacion: string,
        anio: string,
        citaciones: string,
        clasificacion: string,
        disciplina: string,
        estado: string,
        comentario: string | undefined
    ) {
        this.issn_doi = issDoi;
        this.titulo = titulo;
        this.autores = autores;
        this.revista = revista;
        this. autores_extranjeros = autoresExtranjeros;
        this.indexacion = indexacion;
        this.anio = anio;
        this.citaciones = citaciones;
        this.clasificacion = clasificacion;
        this.disciplina = disciplina;
        this.estado = estado;
        this.comentario = comentario;

    }
*/
    constructor(publicacion: {
        issDoi?: string,
        titulo?: string,
        autores?: string,
        revista?: string,
        autoresExtranjeros?: number,
        indexacion?: string,
        anio?: string,
        citaciones?: string,
        clasificacion?: string,
        disciplina?: string,
        estado?: string,
        comentario?: string | null
    }){
        this.issn_doi = publicacion.issDoi;
        this.titulo = publicacion.titulo;
        this.autores = publicacion.autores;
        this.revista = publicacion.revista;
        this. autores_extranjeros = publicacion.autoresExtranjeros;
        this.indexacion = publicacion.indexacion;
        this.anio = publicacion.anio;
        this.citaciones = publicacion.citaciones;
        this.clasificacion = publicacion.clasificacion;
        this.disciplina = publicacion.disciplina;
        this.estado = publicacion.estado;
        this.comentario = publicacion.comentario ?? null;
    }
  
}