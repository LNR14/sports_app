const Event = require('../models/Event')
const jwt=require('jsonwebtoken')

module.exports = {
    async getEventById(req, res) {
        jwt.verify(req.token,'secret',async(err, authData)=>{
            if(err){
                res.sendstatus(401)
            }else{


            const { eventId } = req.params;
            try {
            const event = await Event.findById(eventId)
            
            if (event) {
                return res.json({authData,event})
            }
        }
        catch(error){
            return res.status(400).json({message:"Event ID does not exist"})
            }
        }
    })  
    },
    async getAllEvents(req, res){
        jwt.verify(req.token,'secret',async(err, authData)=>{
            if(err){
                res.sendstatus(401)
            }else{
                    const { sport } = req.params;
                    var query = {} 
                    sport === undefined ?  query = {}: query = { sport }

                    try {
                        const events = await Event.find(query)
                    
                    if (events) {
                        return res.json({ authData,events})
                    } 
                    } catch (error) {
                        return res.status(400).json({message: "We do not have any events yet"})
                    }
                }
        })
        
    },
    async getEventsByUserId(req, res){
        jwt.verify(req.token,'secret',async(err, authData)=>{
            if(err){
                res.sendstatus(401)
            }else{
                const { user_id} = req.headers

                try {
                    const events = await Event.find({user:authData.user._id}) 
                
                if (events) {
                    return res.json({ authData,events })
                } 
                } catch (error) {
                    return res.status(400).json({message: `We do not have any events yet ${user_id}`})
                }
            }
        })
    }
    
}