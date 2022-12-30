import transporter from '../../../config/mailer'
import { Usuario } from '../../entities/usuario';
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
                throw new Error("no se a enviado el correo, error en la validacion o envio.")
            } else {
                //console.log("respuesta:", response);
                return("email para la recuperacion de contraseña ha sido enviado")
            }
        })

    }

    public async newEmail(usuario : Usuario){
        const mailOptions={
            from: `${process.env.EMAIL_FROM}`,
            to: `${usuario.correo}`,
            subject: 'Enlace para recuperar tu cuenta de Innoving',
            text:
            `su enlace para crear la contraseña es:\nhttp://localhost:3000/resetPass/${usuario.rut}/${usuario.token}`
            
        };

        transporter.sendMail(mailOptions, (err: any, response: any) => {
            if (err){
                console.error ("Ha ocurrido un error: ", err);
            } else {
                console.log("respuesta:", response);
                return("email para la creacion de contraseña ha sido enviado")
            }
        })
    }

}

export default new MailerRepository();