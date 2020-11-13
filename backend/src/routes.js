const express = require('express')
const multer = require('multer')
const routes = express.Router();
const cors = require('cors')

const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController');
const RegistrationController = require('./controllers/RegistrationController');
const RejectionController = require('./controllers/RejectionController');
const ApprovalController = require('./controllers/ApprovalController')

const uploadConfig = require('./config/upload');
const verifyToken = require('./config/verifyToken');
const upload = multer(uploadConfig)



routes.get("/status",(req,res)=>{
    res.send({status:200})
})


//TODO Registration Approval Controller
//TODO Registration Reject Controller


//Dashboard
routes.get('/dashboard',verifyToken, DashboardController.getAllEvents)
routes.get('/dashboard/:sport',verifyToken, DashboardController.getAllEvents)
routes.get('/event/:eventId',verifyToken, DashboardController.getEventById)
routes.get('/user/events',verifyToken, DashboardController.getEventsByUserId)

//Registration
routes.post('/registration/:eventId',RegistrationController.create)
routes.get('/registration/:registrationId/get',RegistrationController.getRegistration)
routes.post('/registration/:registrationId/approval',ApprovalController.approval)
routes.post('/registration/:registrationId/reject',RejectionController.rejection)


//Login
routes.post('/login',LoginController.store)

//user
routes.get('/user/:userId',UserController.getUserById)
routes.post("/user/register",UserController.createUser)

//Event
routes.delete('/event/:eventId',verifyToken,EventController.delete)
routes.post('/event', verifyToken,upload.single("thumbnail"), EventController.createEvent)

module.exports = routes;