const users = require('../Modal/userModal')
const jwt=require('jsonwebtoken')

exports.registerController = async (req, res) => {
    console.log("inside registerController");

    const { username, email, password } = req.body
    console.log(username, email, password);

    try {


        const existingUser = await users.findOne({ email })

        if (existingUser) {
            res.status(406).json("user already exists...please login")
        }
        else {

            const newUser = new users({ username, email, password, github: '', linkedin: "", profilePic: "" })

            await newUser.save()
            res.status(200).json(newUser)
        }

    }
    catch (err) {
        res.status(401).json(err)

    }

}

exports.loginController = async (req, res) => {
    console.log("inside loginController");
    try {

        const { email, password } = req.body

        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token=jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({user:existingUser,token})

        }
        else {
            res.status(404).json("invalid email / password")
        }
    }
    catch (err) {
        res.status(401).json(err)
    }

}

exports.updateProfileController=async(req,res)=>{

    console.log("inside updateProfileController");

    const userId=req.userId

    const {username,password,email,github,linkedin,profilePic}=req.body

    const uploadImg= req.file?req.file.filename :profilePic

    try{

        const updateProfile=await users.findByIdAndUpdate({_id:userId},{username,password,email,github,linkedin,profilePic:uploadImg},{new:true})
        await updateProfile.save()
        res.status(200).json(updateProfile)

    }
    catch(err){
        res.status(401).json(err)
    }
    
}