import nodemailer from 'nodemailer'
import transporter from '../../../config/mailer'
class MailerRepository {

    public async forgotEmail(correo: string, token:string, rut:string ){
        const mailOptions={
            from: `${process.env.EMAIL_FROM}`,
            to: `${correo}`,
            subject: 'Enlace para recuperar tu cuenta de Innoving',
            text:
            `su enlace para recuperar la contraseña es:\nhttp://localhost:3000/resetPass/${rut}/${token}`
            
        };

        transporter.sendMail(mailOptions, (err: any, response: any) => {
            if (err){
                console.error ("Ha ocurrido un error: ", err);
            } else {
                console.log("respuesta:", response);
                return("email para la recuperacion de contraseña ha sido enviado")
            }
        })

    }

}

export default new MailerRepository();