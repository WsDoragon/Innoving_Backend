
export class VariablePublicacion {
    public id: number | undefined;
    public id_variable: number;
    public id_publicacion: number;
    public valor: number;

    constructor(idVariable: number, idPublicacion: number, valor: number) {
        this.id_variable = idVariable;
        this.id_publicacion = idPublicacion;
        this.valor = valor;
    }
}