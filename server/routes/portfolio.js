const express=require('express');
const router=express.Router();

// validacion tokens y permisos
const authService=require('../services/auth')
const portfolioController=require('../controllers/portfolio')

router.get('',  authService.checkJWT,
                authService.checkRole('siteOwner'), 
                portfolioController.getPortfolios)
router.post('', authService.checkJWT,
                authService.checkRole('siteOwner'),
                portfolioController.savePortfolio)

module.exports=router;