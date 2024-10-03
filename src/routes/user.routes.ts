import { FastifyInstance } from 'fastify';
import { UserUsecase } from '../usecases/user.usecase';
import { IUserCreate, IUserLogin, UserCreateSchema, UserLoginSchema } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';

export async function userRoutes(fastify: FastifyInstance) {
    const userUsecase = new UserUsecase();
//Rota de login
    fastify.post('/login',{
        schema: {
            description: 'Login',
            tags: ['users'],
            summary: 'Login',
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['email', 'password']
            },
            response: {
              200: {
                type: 'object',
                  properties: {
                    message: { type: 'string' },
                    token: { type: 'string' }
                  }
                },
                400: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                },
                500: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }, async (request, reply) => {
        // Sanitização dos dados de entrada
        const body = request.body as IUserLogin

        // Validação dos dados de entrada
        const validationResult = UserLoginSchema.safeParse(body)
        
        if (!validationResult.success) {
            return reply.status(400).send({ error: "Dados inválidos" })
        }

        const user = await userUsecase.login(body.email, body.password)
        if (!user) {
            return reply.status(401).send({ error: "Credenciais inválidas" })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' })

        // Logging da tentativa de login
        fastify.log.info(`Usuário ${body.email} logado com sucesso`)

        return reply.status(200).send({ message: "Login efetuado com sucesso", token })
    })

//Rota de criação de usuário
    fastify.post('/users/create',{
        schema: {
            description: 'Criação de usuário',
            tags: ['users'],
            summary: 'Criação de usuário',
            body: {
                type: 'object',
                properties: {
                    nome: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['nome', 'email', 'password']
            },
            response: {
                201: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
                },
                500: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }, async (request, reply) => {
        const body = request.body as IUserCreate ;

        try {
            await userUsecase.create({ nome: body.nome, email: body.email, password: body.password });
            return reply.status(201).send({ message: "Usuário criado com sucesso" });
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(500).send({ error: error.message });
            }
            return reply.status(500).send({ error: 'Ocorreu um erro desconhecido' });
        }
    });

  

}