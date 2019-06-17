//para hacer el deploy por medio de SRV string
if(process.env.NODE_ENV==='production'){
    module.exports=require('./prod')
}
else{
    module.exports=require('./dev.js')
}