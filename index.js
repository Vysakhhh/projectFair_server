require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router =require('./Router/router')
require('./DB/dbConnection')

const pfServer = express()
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))
const PORT=3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`pfServer running successfully at port ${PORT}`);
    
}) 
