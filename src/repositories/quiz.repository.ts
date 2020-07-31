import {DefaultCrudRepository} from '@loopback/repository';
import {Quiz, QuizRelations} from '../models';
import {CloudantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class QuizRepository extends DefaultCrudRepository<
  Quiz,
  typeof Quiz.prototype.id,
  QuizRelations
> {
  constructor(
    @inject('datasources.cloudant') dataSource: CloudantDataSource,
  ) {
    super(Quiz, dataSource);
  }
}
