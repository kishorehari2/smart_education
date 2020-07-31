import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {StudentTraining} from '../models';
import {StudentTrainingRepository} from '../repositories';

export class TrainingController {
  constructor(
    @repository(StudentTrainingRepository)
    public studentTrainingRepository : StudentTrainingRepository,
  ) {}

  @post('/train', {
    responses: {
      '200': {
        description: 'StudentTraining model instance',
        content: {'application/json': {schema: getModelSchemaRef(StudentTraining)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StudentTraining, {
            title: 'NewStudentTraining',
            exclude: ['id'],
          }),
        },
      },
    })
    studentTraining: Omit<StudentTraining, 'id'>,
  ): Promise<StudentTraining> {
    return this.studentTrainingRepository.create(studentTraining);
  }

  @get('/train/count', {
    responses: {
      '200': {
        description: 'StudentTraining model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(StudentTraining) where?: Where<StudentTraining>,
  ): Promise<Count> {
    return this.studentTrainingRepository.count(where);
  }

  @get('/train', {
    responses: {
      '200': {
        description: 'Array of StudentTraining model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(StudentTraining, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(StudentTraining) filter?: Filter<StudentTraining>,
  ): Promise<StudentTraining[]> {
    return this.studentTrainingRepository.find(filter);
  }

  @patch('/train', {
    responses: {
      '200': {
        description: 'StudentTraining PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StudentTraining, {partial: true}),
        },
      },
    })
    studentTraining: StudentTraining,
    @param.where(StudentTraining) where?: Where<StudentTraining>,
  ): Promise<Count> {
    return this.studentTrainingRepository.updateAll(studentTraining, where);
  }

  @get('/train/{id}', {
    responses: {
      '200': {
        description: 'StudentTraining model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(StudentTraining, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(StudentTraining, {exclude: 'where'}) filter?: FilterExcludingWhere<StudentTraining>
  ): Promise<StudentTraining> {
    return this.studentTrainingRepository.findById(id, filter);
  }

  @patch('/train/{id}', {
    responses: {
      '204': {
        description: 'StudentTraining PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StudentTraining, {partial: true}),
        },
      },
    })
    studentTraining: StudentTraining,
  ): Promise<void> {
    await this.studentTrainingRepository.updateById(id, studentTraining);
  }

  @put('/train/{id}', {
    responses: {
      '204': {
        description: 'StudentTraining PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() studentTraining: StudentTraining,
  ): Promise<void> {
    await this.studentTrainingRepository.replaceById(id, studentTraining);
  }

  @del('/train/{id}', {
    responses: {
      '204': {
        description: 'StudentTraining DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.studentTrainingRepository.deleteById(id);
  }
}
