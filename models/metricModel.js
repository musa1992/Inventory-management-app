const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MertricSchema = new Schema({
    name: {type: String, minLength:5, maxLength: 50, required: true},
    abbriviation: {type: String, minLenght: 1, maxLength: 5}
})

MertricSchema.virtual('url')
.get(function(){
    return `/metric/${this.id}`
})