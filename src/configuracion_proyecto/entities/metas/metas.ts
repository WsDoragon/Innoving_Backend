export class Metas {
    public id : number;
    public idindicador :string;
    public fecha : string;
    public cantidad: number;
    public Peticion : string;
    public Aprobado : number;
    public antiguaid : string;



    constructor(id : number,idindicador : string , fecha : string, cantidad : number, Peticion : string, Aprobado : number , antiguaid : string){
        this.id = id;
        this.idindicador = idindicador
        this.fecha = fecha; 
        this.cantidad = cantidad; 
        this.Peticion = Peticion;
        this.Aprobado = Aprobado;
        this.antiguaid = antiguaid; 
    }
}