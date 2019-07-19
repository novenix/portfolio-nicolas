// para hacer rutas dinamicas con next(mostrar portflio-detail)
// (solo cuando se debe mostrar un contenido especifico)
const routes = require('next-routes')


module.exports = routes()                           
.add('portfolioNew', '/portfolios/new')
.add('portfolio', '/portfolio/:id')                        
.add('portfolioEdit', '/portfolios/:id/edit')  
.add('blogEditorUpdate','/blogs/:id/edit')
.add('userBlogs','/blogs/dashboard')
.add('blogEditor','/blogs/new')
.add('blogDetail','/blogs/:slug')
