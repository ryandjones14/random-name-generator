var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const nameSchema = new Schema({
  text: String
});

module.exports = mongoose.model('Name', nameSchema);
