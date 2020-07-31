import {Entity, model, property} from '@loopback/repository';

@model()
export class Quiz extends Entity {
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


  constructor(data?: Partial<Quiz>) {
    super(data);
  }
}

export interface QuizRelations {
  // describe navigational properties here
}

export type QuizWithRelations = Quiz & QuizRelations;
