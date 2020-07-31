import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {FinalQuiz} from '../models';
import {FinalQuizRepository} from '../repositories';
//@authenticate('jwt')
export class FinalQuizControllerController {
  constructor(
    @repository(FinalQuizRepository)
    public finalQuizRepository: FinalQuizRepository,
  ) {}

  @post('/final', {
    responses: {
      '200': {
        description: 'FinalQuiz model instance',
        content: {'application/json': {schema: getModelSchemaRef(FinalQuiz)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FinalQuiz, {
            title: 'NewFinalQuiz',
            exclude: ['id'],
          }),
        },
      },
    })
    finalQuiz: Omit<FinalQuiz, 'id'>,
  ): Promise<FinalQuiz> {
    return this.finalQuizRepository.create(finalQuiz);
  }

  @get('/final/count', {
    responses: {
      '200': {
        description: 'FinalQuiz model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(FinalQuiz) where?: Where<FinalQuiz>,
  ): Promise<Count> {
    return this.finalQuizRepository.count(where);
  }

  @get('/final', {
    responses: {
      '200': {
        description: 'Array of FinalQuiz model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(FinalQuiz, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(FinalQuiz) filter?: Filter<FinalQuiz>,
  ): Promise<FinalQuiz[]> {
    return this.finalQuizRepository.find(filter);
  }

  @patch('/final', {
    responses: {
      '200': {
        description: 'FinalQuiz PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FinalQuiz, {partial: true}),
        },
      },
    })
    finalQuiz: FinalQuiz,
    @param.where(FinalQuiz) where?: Where<FinalQuiz>,
  ): Promise<Count> {
    return this.finalQuizRepository.updateAll(finalQuiz, where);
  }

  @get('/final/{id}', {
    responses: {
      '200': {
        description: 'FinalQuiz model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(FinalQuiz, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FinalQuiz, {exclude: 'where'}) filter?: FilterExcludingWhere<FinalQuiz>
  ): Promise<FinalQuiz> {
    return this.finalQuizRepository.findById(id, filter);
  }

  @patch('/final/{id}', {
    responses: {
      '204': {
        description: 'FinalQuiz PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FinalQuiz, {partial: true}),
        },
      },
    })
    finalQuiz: FinalQuiz,
  ): Promise<void> {
    await this.finalQuizRepository.updateById(id, finalQuiz);
  }

  @put('/final/{id}', {
    responses: {
      '204': {
        description: 'FinalQuiz PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() finalQuiz: FinalQuiz,
  ): Promise<void> {
    await this.finalQuizRepository.replaceById(id, finalQuiz);
  }

  @del('/final/{id}', {
    responses: {
      '204': {
        description: 'FinalQuiz DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.finalQuizRepository.deleteById(id);
  }
}
