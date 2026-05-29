const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

async function registerUser(req , res) {

    const {UserName , email , password , role} = req.body;

    const doesUserExists = await userModel.findOne({email})

    if (doesUserExists)
        return res.status(409).json({
            message: "This Email Is Registered Previously Try With Another Email !",
            email
    })

    const hash = await bcrypt.hash(password , 10)

    const user = await userModel.create({
        UserName,
        email,
        password : hash,
        role
    })

    const token = JWT.sign({
        id : user._id,
        role : user.role
    }, process.env.JWT_SECRET)

    res.cookie('JWTToken', token, { httpOnly: true })

    res.status(201).json({
        message : "User Registered Successfully",
        user : {
            UserName,
            email,
            password,
            role
        }
    })
}

async function loginUser(req , res) {

    const {email , password} = req.body;

    const user = await userModel.findOne({email})

    if(!user)
        return res.status(401).json({
            message : "user with these credentials doesn't exist's",
            user : {
                email
            }
        })
        
    const isPasswordExists = await bcrypt.compare(password , user.password)

    if(!isPasswordExists)
        return res.status(401).json({
            message : "Invaild Password !"
    })

    const token = JWT.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie('JWTToken', token, { httpOnly: true })

    res.status(200).json({
        message: "Login Successful !!!",
        user: {
            UserName: user.UserName,
            email: user.email,
            role: user.role
        }
    })
    
}

async function logoutUser(req , res) {
    res.clearCookie("token")
    res.status(200).json({
        message : " User logout successfull !!"
    })
}

module.exports = { registerUser , loginUser , logoutUser} 