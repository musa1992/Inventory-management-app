const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ItemInstanceSchema = new Schema({
    item: {type: Schema.Types.ObjectId, ref: 'Item', required: true},
    size: String,
    brandName: {type: String, minLength: 3, maxLength: 100, required: true},
    price: {type: Number, min: [1, 'Price can not be below 1Ksh'],required: true}
})

ItemInstanceSchema.virtual('url')
.get(function(){
    return `/${this.name}/${this._id}`
})

module.exports = mongoose.model('ItemInstance', ItemInstanceSchema)