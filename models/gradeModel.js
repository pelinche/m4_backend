import mongoose from 'mongoose';


const gradeSchema = mongoose.Schema({

  name:{
    type:String,
    required: true,
  },
  subject:{
    type:String,
    required:true,
  },
  type:{
    type:String,
    required: true,
  },
  value:{
    type: Number,
    required: true,
    min:0,
  },
  lastModified:{
    type: Date,
    default: Date.now(),
  }
},{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

/*
gradeSchema.virtual('id')
.get(function () {
  //console.log("Entrou aqui")
  return this._id;
});
// */

const gradeModel = mongoose.model('grade',gradeSchema);

export {gradeModel};
