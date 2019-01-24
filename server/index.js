// para poder tener urls limpias con next.js, cstom server cambian los scripts del package
const express = require('express')
const next = require('next')
const routes = require('../routes')
// service:revisa la validez del token
const authService=require('./services/auth')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
// esta parte es para el next-routes
const handle = routes.getRequestHandler(app)
const secretData=[
    {
        title:'secretData 1',
        description:'planes secretos'
    },
    {
        title:'secretData2',
        description:'paswords secretos'
    }
]

app.prepare()
.then(() => {
  const server = express()
//   endpoint:ruta, middleware, route handler
    server.get('/api/v1/secret',authService.checkJWT,(req,res)=>{
        // console.log('_______user__________')
        // console.log(req.user)
        return res.json(secretData)
    })
    server.get('/api/v1/onlySiteOwner',authService.checkJWT,authService.checkRole('siteOwner'),(req,res)=>{
      
      return res.json(secretData)
  })
  server.get('*', (req, res) => {
    
    return handle(req, res)
  })
  server.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({title:'unauthorized',details:'Unauthorized Access'});
    }
  });
  server.use(handle).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})

.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})