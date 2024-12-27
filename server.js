const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./src/db/sequelize.js");
const claimRoutes = require("./src/claims/routes/claimRoutes.js");
const customerRoutes = require("./src/customers/routes/customerRoutes.js");
const policyRoutes = require("./src/policies/routes/policyRoutes.js");

require("dotenv").config();

sequelize.authenticate()
  .then(() => console.log("Database connection successful"))
  .catch("sequeslize error",console.error);

class Server {
  constructor() {
    this.app = express();
    this.initMiddleware();
    this.setupRoutes();
    this.initDatabase();
  }

  initMiddleware() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(morgan(":method :url :status :response-time ms - :res[content-length]"));
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(cors({ origin: true, credentials: true }));
  }

  setupRoutes() {

    this.app.use("/api", (req, res, next) => {
      if (req.originalUrl === "/api") {
        res.status(200).send({ message: "Connected to Insurance API server" });
      } else {
        next();
      }
    });

    this.app.use("/api/claims", claimRoutes);
    this.app.use("/api/customers", customerRoutes);
    this.app.use("/api/policies", policyRoutes);

    this.app.use("*", (req, res) => {
      res.status(404).json({ error: "Route Not Found" });
    });
  }

  initDatabase() {
    sequelize
      .sync({ alter: true })
      .then(() => console.log("Database synchronized."))
      .catch("error caught---",console.error);
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  }
}

const server = new Server();
server.start(process.env.PORT || 3000);
