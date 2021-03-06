// model del portfolio
Portfolio=require('../models/portfolio');

const getPortfolios=(req,res)=>{

    Portfolio.find({})
        .sort({'startDate':1})
        .exec((err,allPortfolios)=>{
          if(err){
            return res.status(422).send(err)
        }
        return res.json(allPortfolios);
        })
    
}
const getPortfolioById =(req,res)=>{
  const portfolioId = req.params.id;
  // Portfolio.findById(portfolioId).select('-__v') permite no seleccionar '-__v' al consular en la base de datos
  Portfolio.findById(portfolioId)
            .select('-__v')
            .exec((err,foundPortfolio)=>{
              if (err){
                return res.status(422).send(err);
              }
              return res.json(foundPortfolio);
            })
  
}
const savePortfolio=(req,res)=>{
    const portfolioData=req.body;
    //console.log(portfolioData);
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
const updatePortfolio=(req,res)=>{
    const portfolioId=req.params.id;
    const portfolioData=req.body;
    Portfolio.findById(portfolioId,(err,foundPortfolio)=>{
      if (err){
        return res.status(422).send(err);
      }
      foundPortfolio.set(portfolioData);
      foundPortfolio.save((err,savedPortfolio)=>{
        if (err){
          return res.status(422).send(err);
        }
        return res.json(foundPortfolio);
      })
    });
}
const deletePortfolio=(req,res)=>{
    const portfolioId=req.params.id;
    Portfolio.deleteOne({_id:portfolioId},(err,deletedPortfolio)=>{
      if (err){
        return res.status(422).send(err);
      }
      return res.json({status:'DELETED'});
    })
    
}
module.exports={
    getPortfolios,
    getPortfolioById,
    savePortfolio,
    updatePortfolio,
    deletePortfolio
}