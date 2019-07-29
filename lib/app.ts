import { Routes } from "./routes/crmRoutes"

import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";
import * as helmet from "helmet";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://192.168.93.131:27017/CRMdb';
    
    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
        const swaggerDocument = require('../swagger.json');
        const options = {
            explorer: false,
            customCss: '.topbar { display: none }',
        };
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
    }

    private mongoSetup(): void {
        require("mongoose").Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}

export default new App().app;