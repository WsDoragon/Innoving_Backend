export class Indicador {
    public id: string;
    public nombre: string;
    public eje: string;
    public NumeroIndicador: number;

    constructor(id: string, nombre: string, eje: string, numeroIndicador: number) {
        this.id = id;
        this.nombre = nombre;
        this.eje = eje;
        this.NumeroIndicador = numeroIndicador;
    }

}