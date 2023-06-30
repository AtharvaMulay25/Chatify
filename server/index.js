const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const socket = require("socket.io");
const env = require("dotenv")
env.config()
const userRoutes = require("./routes/users")
const messageRoutes = require("./routes/messages")


//use local development database
mongoose.connect(process.env.MONGO_URL).then(()=>
{
    console.log("Connection Established!");
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));   //checking for errors
db.once("open", () => {
    console.log("Database connected");      //successfully connected
});

const app = express()


// middlwares
app.use(cors())
// const allowedOrigins = ['http://127.0.0.1:5173'];
// app.use(cors({
//     origin: (origin, callback) => {
//       // Check if the origin is allowed
//       if (allowedOrigins.includes(origin) || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     }
//   }));
app.use(express.json())

    
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);


const server = app.listen(process.env.PORT, ()=>
{
    console.log(`Listening on port ${process.env.port}`);
})

const io = socket(server, {
    cors: {
        origin:"http://127.0.0.1:5173", //client port
        credentials: true
    }
    
});

global.onlineUsers = new Map();
io.on("connection", (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data)=>{
        // console.log(data);
        const sendUserSocket = onlineUsers.get(data.to);

        if(sendUserSocket)
        {
            socket.to(sendUserSocket).emit("msg-receive", data.msg);
        }
    })
})