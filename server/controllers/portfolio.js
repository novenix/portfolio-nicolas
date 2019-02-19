// model del portfolio
Portfolio=require('../models/portfolio');

const getPortfolios=(req,res)=>{
    Portfolio.find({},(err,allPortfolios)=>{
        if(err){
            return res.status(422).send(err)
        }
        return res.json(allPortfolios);
    })
}
const savePortfolio=(req,res)=>{
    const portfolioData=req.body;
    
    // obtener id de usuario que viene de auth 0
    const userId=req.user&&req.user.sub;

    const portfolio=new Portfolio(portfolioData);
    portfolio.userId=userId;
    portfolio.save((err,createdPortfolio)=>{
        if(err){
            return res.status(422).send(err);
        }
        return res.json(createdPortfolio);
    })
}
module.exports={
    getPortfolios,
    savePortfolio,
}