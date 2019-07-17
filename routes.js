// para hacer rutas dinamicas con next(mostrar portflio-detail)
// (solo cuando se debe mostrar un contenido especifico)
const routes = require('next-routes')


module.exports = routes()                           
                      
.add('portfolio-detail', '/portfolio-detail/:id')                        
.add('portfolioEdit', '/portfolios/:id/edit')  
.add('blogEditorUpdate','/blogs/:id/edit')
.add('blogEditor','/blogs/new')
.add('blogDetail','/blogs/:slug')
