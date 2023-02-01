const mongoose = require('mongoose')
const schema = mongoose.Schema;
const classSchema= new schema({
    
    standard:{type:Number , require : true},
    division:{type:String , require : true},
    

})

classSchema.pre('save',function(){
    
})
module.exports = mongoose.model('Class',classSchema)