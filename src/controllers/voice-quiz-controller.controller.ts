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
import {VoiceQuiz} from '../models';
import {VoiceQuizRepository} from '../repositories';

export class VoiceQuizControllerController {
  constructor(
    @repository(VoiceQuizRepository)
    public voiceQuizRepository : VoiceQuizRepository,
  ) {}

  @post('/voice', {
    responses: {
      '200': {
        description: 'VoiceQuiz model instance',
        content: {'application/json': {schema: getModelSchemaRef(VoiceQuiz)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VoiceQuiz, {
            title: 'NewVoiceQuiz',
            
          }),
        },
      },
    })
    voiceQuiz: VoiceQuiz,
  ): Promise<VoiceQuiz> {
    return this.voiceQuizRepository.create(voiceQuiz);
  }

  @get('/voice/count', {
    responses: {
      '200': {
        description: 'VoiceQuiz model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(VoiceQuiz) where?: Where<VoiceQuiz>,
  ): Promise<Count> {
    return this.voiceQuizRepository.count(where);
  }

  @get('/voice', {
    responses: {
      '200': {
        description: 'Array of VoiceQuiz model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(VoiceQuiz, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(VoiceQuiz) filter?: Filter<VoiceQuiz>,
  ): Promise<VoiceQuiz[]> {
    return this.voiceQuizRepository.find(filter);
  }

  @patch('/voice', {
    responses: {
      '200': {
        description: 'VoiceQuiz PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VoiceQuiz, {partial: true}),
        },
      },
    })
    voiceQuiz: VoiceQuiz,
    @param.where(VoiceQuiz) where?: Where<VoiceQuiz>,
  ): Promise<Count> {
    return this.voiceQuizRepository.updateAll(voiceQuiz, where);
  }

  @get('/voice/{id}', {
    responses: {
      '200': {
        description: 'VoiceQuiz model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(VoiceQuiz, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VoiceQuiz, {exclude: 'where'}) filter?: FilterExcludingWhere<VoiceQuiz>
  ): Promise<VoiceQuiz> {
    return this.voiceQuizRepository.findById(id, filter);
  }

  @patch('/voice/{id}', {
    responses: {
      '204': {
        description: 'VoiceQuiz PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VoiceQuiz, {partial: true}),
        },
      },
    })
    voiceQuiz: VoiceQuiz,
  ): Promise<void> {
    await this.voiceQuizRepository.updateById(id, voiceQuiz);
  }

  @put('/voice/{id}', {
    responses: {
      '204': {
        description: 'VoiceQuiz PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() voiceQuiz: VoiceQuiz,
  ): Promise<void> {
    await this.voiceQuizRepository.replaceById(id, voiceQuiz);
  }

  @del('/voice/{id}', {
    responses: {
      '204': {
        description: 'VoiceQuiz DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.voiceQuizRepository.deleteById(id);
  }
}
