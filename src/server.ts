import * as dotenv from 'dotenv';
import {once} from 'events';
import express, {Request, Response} from 'express';
import http from 'http';
import path from 'path';
import {ApplicationConfig, LbtestApplication} from './application';
export {ApplicationConfig};
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
export class ExpressServer {
  public readonly app: express.Application;
  public readonly lbApp: LbtestApplication;
  private server?: http.Server;


  constructor(options: ApplicationConfig = {}) {
    dotenv.config();
    const {IamTokenManager} = require('ibm-watson/auth');
    const serviceUrl = "https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/51bebeb6-6f4a-458a-a5a6-2e5da4420609";
    const tokenManager = new IamTokenManager({
      apikey: "ui0fbqGwPnc89NO8S-jWy7zicSJfrarYafV_8UDHqbi6" || '<iam_apikey>',
    });
    this.app = express();
    this.lbApp = new LbtestApplication(options);
    this.app.use('/api', this.lbApp.requestHandler);
    this.app.use('/home', express.static('./client'));
    this.app.use('/mcq/*', express.static('./client'));
    this.app.use('/quiz/*', express.static('./client'));
    this.app.use('/teacher', express.static('./client'));
    this.app.use('/voice/*', express.static('./client'));

    this.app.use(express.static('public/css'));
    this.app.use(express.static('public/script'));

    this.app.get('/hello', function (_req: Request, res: Response) {
      res.send('Hello world!');
    });
    this.app.get('/signUp', function (_req: Request, res: Response) {
      res.sendFile(path.resolve('public/sign_up.html'));
    });
    this.app.post('/signUp', function (_req: Request, res: Response) {
      res.sendFile(path.resolve('public/sign_up.html'));
    });
    this.app.get('/', function (_req: Request, res: Response) {
      res.sendFile(path.resolve('public/login.html'));
    });
    this.app.post('/', function (_req: Request, res: Response) {
      res.sendFile(path.resolve('public/login.html'));
    });
    this.app.get('/success', function (_req: Request, res: Response) {
      res.sendFile(path.resolve('public/submitted.html'));
    });
    this.app.post('/success', function (_req: Request, res: Response) {
      res.sendFile(path.resolve('public/submitted.html'));
    });

    this.app.get('/name', callName);

    function callName(_req: Request, _res: Response) {
      console.log('inside')
      console.log(_req.query)
      var spawn = require("child_process").spawn;

      var process = spawn('python', [path.resolve('public/tester.py'), _req.query.id]);

      console.log(__dirname)
      process.stdout.on('data', function (data: JSON) {
        console.log('in std')
        // console.log(data)
        _res.send(data.toString());
      })
	  process.stdout.on('message', function (message: JSON) {
        console.log('in msg')
        // console.log(data)
        _res.send(message.toString());
      })
	  process.stdout.on('error', function (error: JSON) {
        console.log('in std')
        // console.log(data)
        _res.send(error.toString());
      })
    }

    this.app.get('/train', callTrain);

    function callTrain(_req: Request, _res: Response) {
      console.log('inside')
      console.log(_req.query)
      var spawn = require("child_process").spawn;

      var process = spawn('python', [path.resolve('public/training.py'), _req.query.username, _req.query.id]);

      console.log(__dirname)
      process.stdout.on('data', function (data: JSON) {
        console.log('in std')
        // console.log(data)
        _res.send(data.toString());
      })
    }


    this.app.get('/apii/v1/credentials', async (req, res, next) => {
      try {
        //console.log(serviceUrl)
        //	console.log(tokenManager)
        const accessToken = await tokenManager.getToken();
        res.json({
          accessToken,
          serviceUrl,
        });
      } catch (err) {
        next(err);
      }
    });

  }
  async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
    const port = appEnv.isLocal ? 3000 : appEnv.port;
    console.log(appEnv.isLocal)
    console.log(port)
    const host = appEnv.isLocal ? '127.0.0.1' : appEnv.host;
    this.server = this.app.listen(port, host);
    await once(this.server, 'listening');
  }

  // For testing purposes
  public async stop() {
    if (!this.server) return;
    await this.lbApp.stop();
    this.server.close();
    // await pEvent(this.server, 'close');
    this.server = undefined;
  }
}
