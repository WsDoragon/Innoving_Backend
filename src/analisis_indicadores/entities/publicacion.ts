export class Publicacion {
    public publicacion_id: number;
    public issn_doi: string;
    public titulo?: string;
    public autores?: string;
    public revista?: string;
    public autores_extranjeros?: number;
    public validado?: number;
    public indexacion?: string;
    public anio?: Date;
    public citaciones?: string;
    public clasificacion?: string;
    public disciplina?: string;


    constructor(publicacion: {
        publicacion_id: number,
        issDoi: string,
        titulo?: string,
        autores?: string,
        revista?: string,
        autoresExtranjeros?: number,
        validado?: number,
        indexacion?: string,
        anio?: Date,
        citaciones?: string,
        clasificacion?: string,
        disciplina?: string,
        estado?: string,
    }){
        this.publicacion_id = publicacion.publicacion_id;
        this.issn_doi = publicacion.issDoi;
        this.titulo = publicacion.titulo;
        this.autores = publicacion.autores;
        this.revista = publicacion.revista;
        this. autores_extranjeros = publicacion.autoresExtranjeros;
        this.validado = publicacion.validado;
        this.indexacion = publicacion.indexacion;
        this.anio = publicacion.anio;
        this.citaciones = publicacion.citaciones;
        this.clasificacion = publicacion.clasificacion;
        this.disciplina = publicacion.disciplina;
    }
  
}