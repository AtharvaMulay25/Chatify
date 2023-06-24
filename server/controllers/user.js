const User = require("../models/users")
const bcrypt = require("bcrypt")


module.exports.register = async(req, res, next)=>
{
    console.log(req.body);
    try 
    {
        const {username, email, password} = req.body;

        const usernameCheck = await User.findOne({username});
        // console.log("******************")
        // console.log(usernameCheck);
        // console.log("******************")
        if(usernameCheck)
        {
            return res.json({status: false, msg: "Username Already Exists!"});
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck)
        {
            return res.json({status: false, msg: "Email Already Exists!"});
        }
        // console.log("hkdhfsj");
        const salt = await bcrypt.genSalt(12);
        const hashedPassword =await bcrypt.hash(password, salt);
        const newUser = await new User({username, email, password: hashedPassword});
        await newUser.save();

        //User created successfully
        return res.json({newUser, status: true});
    } 
    catch (error) 
    {
        next(error);
    }
}