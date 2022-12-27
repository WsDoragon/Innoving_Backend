import { Eje } from "../../entities/eje";
import EjeModel from "../models/eje.model";

class EjeRepository {
    
    public async findEjes(): Promise<Eje[]> {
        let ejes: any[] = await EjeModel.findAll();
        if( ejes.length==0 ) {
            return [];
        }
        return (<Eje[]> ejes);
    }

    public async findEje(nombreEje: string): Promise<Eje> {
        let res: any = await EjeModel.findOne({
            where: {
                nombre: nombreEje
            }
        });

        if (res) {
            return (<Eje> res);
        }

        throw new Error();
    }
}

export default new EjeRepository();