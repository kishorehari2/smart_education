import {Entity, model, property} from '@loopback/repository';

@model()
export class FinalQuiz extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  mcqID?: string;

  @property({
    type: 'string',
  })
  voiceID?: string;
  
   @property({
    type: 'string',
	generated:true
  })
  name?: string;


  constructor(data?: Partial<FinalQuiz>) {
    super(data);
  }
}

export interface FinalQuizRelations {
  // describe navigational properties here
}

export type FinalQuizWithRelations = FinalQuiz & FinalQuizRelations;
