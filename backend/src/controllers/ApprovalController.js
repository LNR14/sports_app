const Registration = require('../models/Registration')


module.exports = {
    async approval(req,res){
        const { registrationId } = req.params
        console.log(registrationId)

        try {
        const registration = await Registration.findById(registrationId)
        registration.approved = true 
        await registration.save()
        return res.json(registration)
        }catch(error){

            return res.status(400).json({message:"Registration approval unsuccessful"})
        }
    }
}