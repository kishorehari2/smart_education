import {Entity, model, property} from '@loopback/repository';

@model()
export class VoiceQuiz extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  questions: object[];


  constructor(data?: Partial<VoiceQuiz>) {
    super(data);
  }
}

export interface VoiceQuizRelations {
  // describe navigational properties here
}

export type VoiceQuizWithRelations = VoiceQuiz & VoiceQuizRelations;
