import {DefaultCrudRepository} from '@loopback/repository';
import {StudentTraining, StudentTrainingRelations} from '../models';
import {CloudantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class StudentTrainingRepository extends DefaultCrudRepository<
  StudentTraining,
  typeof StudentTraining.prototype.id,
  StudentTrainingRelations
> {
  constructor(
    @inject('datasources.cloudant') dataSource: CloudantDataSource,
  ) {
    super(StudentTraining, dataSource);
  }
}
