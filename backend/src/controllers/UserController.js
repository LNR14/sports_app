const { response } = require('express');
const  User = require('../models/User');
const bcrypt = require('bcrypt')


module.exports = {
    async createUser(req,res){
        try{
            console.log(req.body)
            const {firstName,lastName,password,email} = req.body;

            const existentUser = await User.findOne({email})

            if(!existentUser){
                const hashedPassword = await bcrypt.hash(password,10) 
                const user =  await User.create({
                    firstName,
                    lastName,
                    email,
                    password:hashedPassword
                });
                return res.json(user)
            }
            return res.json({
                message:'email/user user already exist do you want to login instead?'
            })
        }
        catch(err){
            return res.status(400).json({
                message:'Registration unsuccessful'
            })
        }
    },


    async getUserById(req,res){
        const {userId} = req.params
        try{
            const user = await User.findById(userId);
            return res.json(user)
        }catch{
            return res.status(400).json({
            message:'User ID does not exist, do you want to register instead?'
        })
        }
    }
}