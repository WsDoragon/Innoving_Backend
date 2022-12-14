 export class Indicador{
    public id: number;
    public CalificacionCORFO : string;
    public NumeroIndicador: number;
    public MisionUniversitaria : string;
    public nombre : string;
    public TipoIndicador:  string;
    public eje : string;
    public Unidad : string;
    public FuenteInformacion : string;
    public Responsable: string;
    public Frecuencia: string;
    public Aprobado : number;
    public Peticion : string;
    public id_editado : string;
    public Descripcion : string

    constructor(id : number,
                CalificacionCORFO : string,
                NumeroIndicador : number,
                MisionUniversitaria : string,
                nombre : string,
                TipoIndicador : string,
                eje : string,
                Unidad : string,
                FuenteInformacion : string,
                Responsable : string,
                Frecuencia : string,
                Aprobado : number,
                Peticion : string,
                id_editado : string, 
                Descripcion : string

                ){
                this.id = id;
                this.CalificacionCORFO = CalificacionCORFO;
                this.NumeroIndicador = NumeroIndicador;
                this.MisionUniversitaria = MisionUniversitaria; 
                this.nombre = nombre;
                this.TipoIndicador = TipoIndicador; 
                this.eje = eje; 
                this.Unidad = Unidad;
                this.FuenteInformacion = FuenteInformacion;
                this.Responsable =  Responsable; 
                this.Frecuencia =  Frecuencia; 
                this.Aprobado = Aprobado;
                this.Peticion = Peticion;
                this.id_editado =id_editado;
                this.Descripcion = Descripcion; 
    }
        
}

