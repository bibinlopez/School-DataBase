const mongoose = require('mongoose')
const schema = mongoose.Schema;
const studentSchema= new schema({
    name:{type:String , require : true},
    rollNumber:{type:Number , require : true},
    classId:{type: schema.Types.ObjectId , ref:'Class', require : true},
    mobileNumber:{type:Number , require : true},
    createdDate:{type:Date , require : false}

})

studentSchema.pre('save',function(next){
    var date =new Date();

    if(!this.createdDate) {
        this.createdDate= date;    
    }
    next()
})
module.exports = mongoose.model('Student',studentSchema)