"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crmRoutes_1 = require("./routes/crmRoutes");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
class App {
    constructor() {
        this.routePrv = new crmRoutes_1.Routes();
        this.mongoUrl = 'mongodb://192.168.93.131:27017/CRMdb';
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        const swaggerDocument = require('../swagger.json');
        const options = { explorer: true };
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
    }
    mongoSetup() {
        require("mongoose").Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map