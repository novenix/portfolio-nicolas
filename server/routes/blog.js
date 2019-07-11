const express=require('express');
const router=express.Router();

// validacion tokens y permisos
const authService=require('../services/auth')
const blogController=require('../controllers/blog')


router.post('', authService.checkJWT,
                authService.checkRole('siteOwner'),
                blogController.createBlog)

router.get("/:id",blogController.getBlogById);
module.exports=router;