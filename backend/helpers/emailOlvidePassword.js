import nodemailer from 'nodemailer'

const olvideEmail = async (datos) =>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const {email,nombre, token}  = datos

    //ENVIAR EMAIl
    console.log('POR AQUI')

    const info = await transporter.sendMail({
        from: "APV - Administrador de pacientes de Veterinaria",
        to: email,
        subject: 'Restablecimiento de password',
        text: 'Restablecimiento de password',
        html: `<p>Hola: ${nombre}, Para restrablecer  tu cuenta en APV</p>
            <p>Solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/veterinarios/olvide-password/${token}">Comprobar Cuenta <a/> </p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })

    console.log('Mensaje enviado: %s', info.messageId)
}


export default olvideEmail