import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
 name: 'cloudant',
  connector: 'cloudant',
  url: 'https://fab907e3-78f2-4d06-b635-15dad9373575-bluemix.cloudantnosqldb.appdomain.cloud',
  host: 'fab907e3-78f2-4d06-b635-15dad9373575-bluemix.cloudantnosqldb.appdomain.cloud',
  database: 'testdb',
  username: 'fab907e3-78f2-4d06-b635-15dad9373575-bluemix',
  password: '',
  modelIndex: 'Quiz',
  plugins: {
    "iamauth": { "iamApiKey": "9pVwSZ47r8CHuRyEUOJrtyXas1sdQ-nKZ1O0pxaHL_R3"}
  }
};


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CloudantDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'cloudant';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.cloudant', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
