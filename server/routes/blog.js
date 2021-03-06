const express=require('express');
const router=express.Router();

// validacion tokens y permisos
const authService=require('../services/auth')
const blogController=require('../controllers/blog')

router.get("/s/:slug",blogController.getBlogBySlug);
router.get("",blogController.getBlogs);
router.get("/me",authService.checkJWT,
                authService.checkRole('siteOwner'),
                blogController.getUserBlogs);
                
router.get("/:id",blogController.getBlogById);

router.post('', authService.checkJWT,
                authService.checkRole('siteOwner'),
                blogController.createBlog)


router.patch('/:id', authService.checkJWT,
                authService.checkRole('siteOwner'),
                blogController.updateBlog)

router.delete('/:id', authService.checkJWT,
                authService.checkRole('siteOwner'),
                blogController.deleteBlog)             
module.exports=router;