const jwt = require('express-jwt');
// verifica los tokens
const jwksRsa = require('jwks-rsa');

const config=require('../config');
const NAMESPACE=config.NAMESPACE;

// MIDDLEWARE
exports.checkJWT=jwt(
    { 
        secret: jwksRsa.expressJwtSecret({
            cache: true,
            reteLimit:true,
            jwksRequestsPerMinute:50,
            jwksUri: 'https://novenix.auth0.com/.well-known/jwks.json'
        }),
        audience: 'SBe4dxaK317aYsr9HKbC1XIb0X80V6gn',
        issuer: 'https://novenix.auth0.com/', 
        algorithms:['RS256']
    })

// MIDDLEWARE
exports.checkRole=role=> (req,res,next)=>{
        const user=req.user;
        if(user&& user[NAMESPACE+'/role'] &&(user[NAMESPACE+'/role']===role)){
            next();
        }
        else{
            return res.status(401).send({title:'not Authorized',detail:'you are not authorized to acces this data'})
        }
    }
