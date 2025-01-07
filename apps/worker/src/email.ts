import nodemailer from 'nodemailer';
require("dotenv").config();

const transport = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });



export async function SendEmail(to : string , body : string){
    //Sending to the Particular user
    console.log("Sending Email to ", to);
    console.log("Sending Email to ", body);
    console.log(process.env.SMTP_SERVER);
    await transport.sendMail({
        from: "12216036@nitkkr.ac.in",
        sender: "12216036@nitkkr.ac.in",
        to,
        subject: "Hello from Zapier",
        text: body
    })


}