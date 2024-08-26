const mongoose = require('mongoose')
const Schema = mongoose.Schema

const secretsSchema = new Schema({
  e_link: {type: String, require: true},
  key_code: {type: String, require: true}
}, {timestamps: true})

module.exports = mongoose.model('Secrets', secretsSchema)