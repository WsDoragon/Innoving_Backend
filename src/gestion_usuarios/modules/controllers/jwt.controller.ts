import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
class jwtController {
    public createToken(email:string){
        const token = jwt.sign({id: email}, `${process.env.JWT_SECRET}`, {expiresIn:"1h"});
        return token
    }

    public async validateToken(token:string){
        jwt.verify(token, `${process.env.JWT_SECRET}`, (err, email) => {
            if (err){
                //console.log("Token no valido para consultas, token expirado o incorrecto")
                throw new Error('Token no valido para consultas, token expirado o incorrecto.')
            } else {
                return email
            }
        })
    }
    
}

export default new jwtController();