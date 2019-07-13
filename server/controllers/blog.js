// model del portfolio
Blog = require("../models/blog");
const AsyncLock = require('async-lock');
const lock = new AsyncLock();
 
const createBlog = (req, res) => {
  const lockId=req.query.lockId;
  if(!lock.isBusy(lockId)){
    lock.acquire(lockId, function(done) {
      const blogData = req.body;
      
      const blog = new Blog(blogData);
      if (req.user) {
        blog.userId = req.user.sub;
        blog.author = req.user.name;
      }
    
      blog.save((err, createdBlog) => {
        setTimeout(() =>done(),5000);
        if (err) {
          return res.status(422).send(err);
        }
        return res.json(createdBlog);
      });
    }, function(err, ret) {
        err&&console.err(err)
    });
  }
  else{
    return res.status(422).send({message:"el blog se esta guardando!"})
  }
  
  
};
const getBlogById =(req,res)=>{
  const blogId = req.params.id;
  // Portfolio.findById(portfolioId).select('-__v') permite no seleccionar '-__v' al consular en la base de datos
  Blog.findById(blogId,(err,foundBlog)=>{
    if (err){
      return res.status(422).send(err);
    }
    return res.json(foundBlog);
  })
           
}
const updateBlog=(req,res)=>{
  const blogId=req.params.id;
  const blogData=req.body;
  Blog.findById(blogId,(err,foundBlog)=>{
    if (err){
      return res.status(422).send(err);
    }
    foundBlog.set(blogData);
    foundBlog.updatedAt=new Date()
    foundBlog.save((err,foundBlog)=>{
      if (err){
        return res.status(422).send(err);
      }
      return res.json(foundBlog);
    })
  });
}
module.exports = {
  createBlog,
  getBlogById,
  updateBlog
};
