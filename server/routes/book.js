const express =require("express");
const router=express.Router();
const bookController=require('../controllers/book')
//enpoint para book
router.post('',bookController.saveBook)
  //endopoint 
  router.get('',bookController.getboks)
  //endpoint actualizar libro
  router.patch('/:id',bookController.updateBook)

//endpoint borrar
router.delete('/:id',bookController.deleteBook)
module.exports=router;