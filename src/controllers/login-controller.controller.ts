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
import {Login} from '../models';
import {LoginRepository} from '../repositories';

export class LoginControllerController {
  constructor(
    @repository(LoginRepository)
    public loginRepository : LoginRepository,
  ) {}

  @post('/login', {
    responses: {
      '200': {
        description: 'Login model instance',
        content: {'application/json': {schema: getModelSchemaRef(Login)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {
            title: 'NewLogin',
            exclude: ['id'],
          }),
        },
      },
    })
    login: Omit<Login, 'id'>,
  ): Promise<Login> {
    return this.loginRepository.create(login);
  }

  @get('/login/count', {
    responses: {
      '200': {
        description: 'Login model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Login) where?: Where<Login>,
  ): Promise<Count> {
    return this.loginRepository.count(where);
  }

  @get('/login', {
    responses: {
      '200': {
        description: 'Array of Login model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Login, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Login) filter?: Filter<Login>,
  ): Promise<Login[]> {
    return this.loginRepository.find(filter);
  }

  @patch('/login', {
    responses: {
      '200': {
        description: 'Login PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {partial: true}),
        },
      },
    })
    login: Login,
    @param.where(Login) where?: Where<Login>,
  ): Promise<Count> {
    return this.loginRepository.updateAll(login, where);
  }

  @get('/login/{id}', {
    responses: {
      '200': {
        description: 'Login model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Login, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Login, {exclude: 'where'}) filter?: FilterExcludingWhere<Login>
  ): Promise<Login> {
    return this.loginRepository.findById(id, filter);
  }

  @patch('/login/{id}', {
    responses: {
      '204': {
        description: 'Login PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {partial: true}),
        },
      },
    })
    login: Login,
  ): Promise<void> {
    await this.loginRepository.updateById(id, login);
  }

  @put('/login/{id}', {
    responses: {
      '204': {
        description: 'Login PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() login: Login,
  ): Promise<void> {
    await this.loginRepository.replaceById(id, login);
  }

  @del('/login/{id}', {
    responses: {
      '204': {
        description: 'Login DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.loginRepository.deleteById(id);
  }
}
