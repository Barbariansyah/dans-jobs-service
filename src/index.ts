import express, { Application } from 'express';
import httpContext from 'express-http-context';
import bodyParser from 'body-parser';
import compression from 'compression';
import { errorHandler } from './middlewares/handle-error-code';
import { init } from './init';

const setupRoutes = (app: Application) => {
    const { getJobsController } = init();
    app.use('/get-jobs', getJobsController.getRouter());
}

const createApp = () =>{
    const app = express();
    app.set('port', process.env.PORT || 3030);
    app.use(compression());
    app.use(bodyParser.json({type: 'application/json'}));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(httpContext.middleware);

    setupRoutes(app);
    app.use(errorHandler());
    return app;
}

(()=> {
    try {
        const app = createApp();
        app.listen(app.get('port'), () => {console.log(`starting at ${app.get('port')}`)});
    } catch (err) {
        console.log(err);
    }
})();