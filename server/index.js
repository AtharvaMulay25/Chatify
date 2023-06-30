const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
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


//middlwares
app.use(cors())
app.use(express.json())

    
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);


app.listen(process.env.PORT, ()=>
{
    console.log(`Listening on port ${process.env.port}`);
})