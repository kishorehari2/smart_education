import {DefaultCrudRepository} from '@loopback/repository';
import {VoiceQuiz, VoiceQuizRelations} from '../models';
import {CloudantDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VoiceQuizRepository extends DefaultCrudRepository<
  VoiceQuiz,
  typeof VoiceQuiz.prototype.id,
  VoiceQuizRelations
> {
  constructor(
    @inject('datasources.cloudant') dataSource: CloudantDataSource,
  ) {
    super(VoiceQuiz, dataSource);
  }
}
