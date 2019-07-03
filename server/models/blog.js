// schemas para ingresar a la base de datos de un blog
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//const setStringType=(maxLength)=>({type:String, required: true, maxlength:maxLength})


const blogSchema=new Schema({
    userId:{type:String,required:true},
    //unique: si hay otro atributo existente en db no lo guarda, 
    //sparce: si no viene atributo el atributo unico viene null, pero sparce permite guardar
    //          varios null sin problema
    slug:{type:String,unique:true,sparce:true},
    title:{type:String,required:true},
    subTitle:{type:String,required:true},
    story:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
    status:{type:String,default:'draft'},
    author:{type:String,required:true},
});


module.exports= mongoose.model('blog',blogSchema);
