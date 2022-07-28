const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {type: String, maxLength: 50, required: true},
    description: {type: String, maxLength: 50, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    metric_unit: {type: Schema.Types.ObjectId, ref: 'Metric', required: true}
});

ItemSchema.virtual('url')
.get(function(){
    return `/${this.name}/${this._id}`
})