import nodemailer from "nodemailer";
async function sendEmail(to,subject,html){
const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {

    user: process.env.SENDEMAIL,
    pass: process.env.SENDPASSWORD,
  },
});

  const info = await transporter.sendMail({
    from: '"heba 👻" <hebahamdan296@gmail.com>',
    to, 
    subject,
    html,
  });
}
export default sendEmail;