const mongoose = require('mongoose')
const dataschema = new mongoose.Schema({
       Username:{
        type : String
       },
       Email:{
        type : String
       },
       Password:{
        type : String
       }
})
module.exports= mongoose.model('user',dataschema)