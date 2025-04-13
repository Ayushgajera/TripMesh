const nodemailer=require("nodemailer");
const sendMail=async(to,subject,text,html=null)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        port:465,
        secure:true,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASS
        }
    });
    const mailOptions={
        from:"Trip Mesh",
        to:to,
        subject:subject,
        text:text,
        html:html||undefined
    }
    try {
        const info=await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error;
    }
}

module.exports=sendMail;