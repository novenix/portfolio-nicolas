const Book=require('../models/book')
const getboks=(req,res)=>{
      
    Book.find({},(err,allBooks)=>{
      if (err){
        return res.status(422).send(err);
      }
      return res.json(allBooks);

    })
    
    
  }
  const saveBook=(req,res)=>{
    const bookData=req.body;
    
    const book=new Book(bookData);

    book.save((err,createdBook)=>{
      if(err){
        return res.status(422).send(err);

      }
      return res.json(createdBook);
    })
  }
  const updateBook=(req,res)=>{
    
    const bookId=req.params.id;
    const bookData=req.body;
    Book.findById(bookId,(err,foundBook)=>{
      if (err){
        return res.status(422).send(err);
      }
      foundBook.set(bookData);
      foundBook.save((err,savedBook)=>{
        if (err){
          return res.status(422).send(err);
        }
        return res.json(foundBook);
      })
    });
  }
  const deleteBook=(req,res)=>{
    const bookId=req.params.id;
    Book.deleteOne({_id:bookId},(err,deletedBook)=>{
      if (err){
        return res.status(422).send(err);
      }
      return res.json({status:'DELETED'});
    })
  }

  module.exports={
      getboks,
      deleteBook,
      updateBook,
      saveBook
  }