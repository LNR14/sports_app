const { eventNames } = require('../models/Registration');
const Registration = require('../models/Registration');

module.exports = {
    async create(req, res) {
        const { user_id } = req.headers;
        const { eventId } = req.params;
        const { date } = req.body;

        const registration = await Registration.create({
            user: user_id,
            event: eventId,
            date
        })

        await registration
        .populate('event')
        .populate('user','-password')
        .execPopulate();

        return res.json(registration)
    },

    async getRegistration(req,res){
        const { registrationId } =req.params
        console.log(registrationId)

        try{    
            const registration = await Registration.findById(registrationId);
            await registration
            .populate('event')
            .populate('user','-password')
            .execPopulate();
            return res.status(400).json(registration)

        }catch(error){
            return res.status(400).json({message:" Registration not done "})
        }
    }
}