import jwt from 'jsonwebtoken'

class jwtController {
    public createToken(email:string){
        const token = jwt.sign({id: email}, 'innovame1234', {expiresIn:"1h"});
        return token
    }
}

export default new jwtController();