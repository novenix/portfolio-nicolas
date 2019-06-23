const express=require('express');
const router=express.Router();

// validacion tokens y permisos
const authService=require('../services/auth')
const portfolioController=require('../controllers/portfolio')

router.get('',portfolioController.getPortfolios)
router.post('', authService.checkJWT,
                authService.checkRole('siteOwner'),
                portfolioController.savePortfolio)
router.get('/:id',portfolioController.getPortfolioById)
router.patch('/:id',authService.checkJWT,
                authService.checkRole('siteOwner'), 
                portfolioController.updatePortfolio)
router.delete('/:id',authService.checkJWT,
                authService.checkRole('siteOwner'), 
                portfolioController.deletePortfolio)

module.exports=router;