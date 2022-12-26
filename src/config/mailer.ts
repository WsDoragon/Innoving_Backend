import  nodemailer  from 'nodemailer'
import dotenv from 'dotenv'


class Mailer {

    public transporter: any;

    public trans2 : any;

    constructor() {
        dotenv.config();

        this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        //service:"gmail",
        auth:{
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        }
    });
    }
    
}

export default new Mailer().transporter