import {DefaultCrudRepository} from '@loopback/repository';
import {FinalQuiz, FinalQuizRelations} from '../models';
import {CloudantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FinalQuizRepository extends DefaultCrudRepository<
  FinalQuiz,
  typeof FinalQuiz.prototype.id,
  FinalQuizRelations
> {
  constructor(
    @inject('datasources.cloudant') dataSource: CloudantDataSource,
  ) {
    super(FinalQuiz, dataSource);
  }
}
