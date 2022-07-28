const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MertricSchema = new Schema({
    name: {type: String, minLength:5, maxLength: 50, required: true},
    abbreviation: {type: String, minLenght: 1, maxLength: 5, required: true}
})

MertricSchema.virtual('url')
.get(function(){
    return `/metric/${this.id}`
})

module.exports = mongoose.model('Metric', MertricSchema)