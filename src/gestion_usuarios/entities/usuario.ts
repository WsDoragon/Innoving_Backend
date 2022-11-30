export class Usuario {
    public rut: string;
    public nombre: string;
    public apellido: string;
    public contraseña: string;
    public correo: string;
    public status: number;
    public token: string;


    constructor(rut: string, nombre: string, apellido: string, contraseña: string, correo: string, status:number) {
        this.rut = rut;
        this.nombre = nombre;
        this.apellido = apellido;
        this.contraseña = contraseña;
        this.correo = correo;
        this.status = status;
    }
}