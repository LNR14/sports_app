const mongoose = require("mongoose")
const express = require('express')
const path = require('path')
const cors = require('cors')
const http = require('http')
const socketio = require('socket.io')
const routes = require('./routes')

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.Server(app)
const io = socketio(server)


app.use(cors())
app.use(express.json())

io.on('connection',socket =>{
    console.log('user is connected',socket.id)
})


if(process.env.NODE_ENV !== 'production '){
    require('dotenv').config()
}



try{
    mongoose.connect(process.env.MONGO_DB_CONNECTION,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    console.log("mongo DB connected")

}catch(err){
    console.log(err)
}
app.use("/files",express.static(path.resolve(__dirname,"..","files")))
app.use(routes)

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})