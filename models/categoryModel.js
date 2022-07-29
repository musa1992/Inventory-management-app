const mongoose = require('mongoose');
const categoryRouter = require('../routes/categoryRoute');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: String, minLength: 3, maxLength: 100, required: true},
    description: {type: String, minLength: 3, maxLength: 100, required: true}
});

CategorySchema.virtual('url')
.get(function(){
    return `/category/${this.name}/${this._id}`
})

// CategorySchema.pre('deleteOne', function(next){
//     mongoose.model('Item').deleteMany({'category': this._id}, function(err,result){
//         if(err){ return next(err)}
//         return 'Succesfully deleted'
//     })
// })

CategorySchema.pre('deleteOne',()=> console.log('About to delete a resource'))


module.exports = mongoose.model('Category', CategorySchema)