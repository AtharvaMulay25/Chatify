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

module.exports.login = async(req, res, next)=>
{
    console.log(req.body);
    try 
    {
        const {username, password} = req.body;

        const user = await User.findOne({username});
        if(!user)   //authentication error
        {
            return res.json({status: false, msg: "Incorrect username or password!"});
        }
        const isPassValid = await bcrypt.compare(password, user.password);
        if(!isPassValid)    //authentication error
        {
            return res.json({status: false, msg: "Incorrect username or password!"});
        }
        //User logged in successfully
        return res.json({user, status: true});
    } 
    catch (error) 
    {
        next(error);
    }
}

module.exports.setAvatar = async(req, res, next)=>
{
    try 
    {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, 
            {
                avatarImage, 
                isAvatarImageSet:true
            })
        
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: avatarImage
        })
    } 
    catch (error)
    {
        next(error);   
    }
}

module.exports.getAllUsers = async(req, res, next)=>
{
    try 
    {   
        //selecting all the users except me and their particular fields
        const users = await User.find({ _id: {$ne: req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ]) ;
        
        return res.json(users);
    } 
    catch (error)
     {
        next(error);
    }
}