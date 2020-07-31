import {DefaultCrudRepository} from '@loopback/repository';
import {Login, LoginRelations} from '../models';
import {CloudantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LoginRepository extends DefaultCrudRepository<
  Login,
  typeof Login.prototype.id,
  LoginRelations
> {
  constructor(
    @inject('datasources.cloudant') dataSource: CloudantDataSource,
  ) {
    super(Login, dataSource);
  }
}
