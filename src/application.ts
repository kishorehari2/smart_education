import {AuthenticationComponent} from '@loopback/authentication';
import {JWTAuthenticationComponent, UserServiceBindings} from '@loopback/authentication-jwt';
import {AuthorizationComponent} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import * as dotenv from 'dotenv';
import path from 'path';
import {CloudantDataSource} from './datasources';
import {MySequence} from './sequence';
export {ApplicationConfig};


export class LbtestApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    this.component(AuthorizationComponent);
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    this.dataSource(CloudantDataSource, UserServiceBindings.DATASOURCE_NAME);

    dotenv.config();
    const {IamTokenManager} = require('ibm-watson/auth');
    const serviceUrl = process.env.SPEECH_TO_TEXT_URL;
    const tokenManager = new IamTokenManager({
      apikey: process.env.STT_API_KEY || '<iam_apikey>',
    });
    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../client'));
    this.static('/mcq/*', path.join(__dirname, '../client'));
    this.static('/quiz/*', path.join(__dirname, '../client'));
    this.static('/voice/*', path.join(__dirname, '../client'));



    /*this.app.use('/', express.static('./client'));
     this.app.use('/mcq/*', express.static('./client'));
     this.app.use('/quiz/*', express.static('./client'));
     this.app.use('/voice/*', express.static('./client'));

     this.app.get('/hello', function (_req: Request, res: Response) {
       res.send('Hello world!');
     });*/

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

}
