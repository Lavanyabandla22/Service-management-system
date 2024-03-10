const express=require("express");
const router=express.Router();
const nodemailer=require("nodemailer");

//configure the sttm mail server
var otpStore=' ';
const transpoter=nodemailer.createTransport(
    {
        host:"smtp.gmail.com",
        port: 587,
        secure:false,
        auth: {
            user:"saisankar3193@gmail.com",
            pass: "mviz ymhi fbxf wtzj",
        },
    }
);

function generateOtp(){
    return Math.floor(10000+Math.random()*900000).toString();
}

router.post("/",async(req,res)=>{
    const email=req.body.email;
    const otp=generateOtp();
    otpStore=otp;
    console.log(otp);
    const mailOption={
        from:"saisankar3193@gmail.com",
        to: email,
        subject: "OTP",
        text: `Your Otp is:${otp}`,
    };
    try{
        await transpoter.sendMail(mailOption,(err,info)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log(`OTP  mail sent successfully to ${email}`);

        });

    }
    catch (err){
        console.error("Error sending OTP:",err);
        res.status(404).json({success: false,message: "Error sending OTP"});
    }
});
router.post("/verify-otp", async (req, res) => {
    const otp = req.body.otp;
    // Get the expected OTP from memory
    const expectedOTP = otpStore;
    // expected OTP is not set, return an error
    if (!expectedOTP) {
      res.status(400).json({
        message: "Expected OTP not set.",
      });
      return res.status(400);
    }
    console.log(otp);
    console.log(expectedOTP);
    // Verify the OTP
    if (otp !== expectedOTP) {
      res.status(401).json({
        message: "OTP is invalid.",
      });
      return;
    }
    // The OTP is valid.
    return res.status(200).json({
      status: 200,
      message: "OTP verified successfully.",
    });
  });



module.exports=router;