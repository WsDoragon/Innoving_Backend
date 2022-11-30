import { Request, Response } from "express";
import EjeRepository from "../../persistence/repositories/eje.repository";

class EjesController {
    public getEjes(req: Request, res: Response) {
        console.log("getEjes");
        EjeRepository.findEjes().then( ejes => {
            res.status(200).json({status: true, data: ejes});
        }, error => {
            res.status(404).json({status: false})
        })
    }
}

export default new EjesController();