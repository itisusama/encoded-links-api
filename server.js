require('dotenv').config()
const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
const secrets = require("./api/routes/secrets")

const app = express()

// Enable CORS for all routes
app.use(cors());

// middleware
app.use(express.json())
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

app.use("/api/secrets", secrets)

mongoose.connect("mongodb+srv://itisusama:UH123ook@encodedlinks.zz7dh.mongodb.net/?retryWrites=true&w=majority&appName=ENCODEDlinks")
.then(() => {
    app.listen(3003, () => {
        console.log(`App is Listening on port ${3003}`)
    })
}).catch((error) => {console.error(error)})

