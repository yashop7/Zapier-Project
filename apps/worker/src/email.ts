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
    const mail = "12216036@nitkkr.ac.in"
    try{
      if (!to || !body) {
        throw new Error("Email recipient and body are required");
    }
      console.log("Sending Email to ", to);
      console.log("Sending Email to ", body);
      const response = await transport.sendMail({
        from: mail,
        sender: mail,
        to,
        subject: "Hello from Zapier",
        text: body
      })
      console.log("response: ", response);
      console.log("Email Sent");
    }
    catch(e){
      console.error(e);
      console.error("Failed to send email");
    }


}