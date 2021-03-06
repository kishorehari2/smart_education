import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class StudentTraining extends Entity {
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
  username: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<StudentTraining>) {
    super(data);
  }
}

export interface StudentTrainingRelations {
  // describe navigational properties here
}

export type StudentTrainingWithRelations = StudentTraining & StudentTrainingRelations;
