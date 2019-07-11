// para poder tener urls limpias con next.js, cstom server cambian los scripts del package
const express = require("express");
const next = require("next");
// mongoose
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const routes = require("../routes");
// service:revisa la validez del token
const authService = require("./services/auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
// esta parte es para el next-routes
const handle = routes.getRequestHandler(app);
//configuracion base de datos
const config = require("./config");
// model de book
const Book = require("./models/book");

const bookRoutes = require("./routes/book");
const portfolioRoutes = require("./routes/portfolio");
const blogRoutes = require("./routes/blog");

const secretData = [
  {
    title: "secretData 1",
    description: "planes secretos"
  },
  {
    title: "secretData2",
    description: "paswords secretos"
  }
];
// conectar base de datos
mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Base de Datos conectada");
  })
  .catch(err => console.log(err));
// async()=>( await mongoose.connect(config.DB_URI,{useNewUrlParser:true}))();

app
  .prepare()
  .then(() => {
    const server = express();
    // midlleware body-parser;
    server.use(bodyParser.json());
    // uso de la ruta de books sin validacion
    server.use("/api/v1/books", bookRoutes);
    // uso de ruta de portfolio con autorizacion de sit owner(dentro de routes la autorizacion)
    server.use("/api/v1/portfolios", portfolioRoutes);
    //ruta para blogs con site owner para publicar
    server.use("/api/v1/blogs", blogRoutes);

    //   endpoint:ruta, middleware, route handler
    server.get("/api/v1/secret", authService.checkJWT, (req, res) => {
      // console.log('_______user__________')
      // console.log(req.user)
      return res.json(secretData);
    });
    server.get(
      "/api/v1/onlySiteOwner",
      authService.checkJWT,
      authService.checkRole("siteOwner"),
      (req, res) => {
        return res.json(secretData);
      }
    );
    server.get("*", (req, res) => {
      return handle(req, res);
    });
    server.use(function(err, req, res, next) {
      if (err.name === "UnauthorizedError") {
        res
          .status(401)
          .send({ title: "unauthorized", details: "Unauthorized Access" });
      }
    });
    server.use(handle).listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })

  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
