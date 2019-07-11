// model del portfolio
Blog = require("../models/blog");

const createBlog = (req, res) => {
  const blogData = req.body;
  //console.log(portfolioData);
  // obtener id de usuario que viene de auth 0
  //const userId=req.user&&req.user.sub;

  const blog = new Blog(blogData);
  if (req.user) {
    blog.userId = req.user.sub;
    blog.author = req.user.name;
  }

  blog.save((err, createdBlog) => {
    if (err) {
      return res.status(422).send(err);
    }
    return res.json(createdBlog);
  });
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
module.exports = {
  createBlog,
  getBlogById
};
