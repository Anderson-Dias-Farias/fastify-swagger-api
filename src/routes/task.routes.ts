import { FastifyInstance } from "fastify";
import { ITask, ITaskCreate, TaskCreateSchema} from "../interfaces/task.interface";
import { TaskUsecase } from "../usecases/task.usecase";
import { authMiddleware} from "../middleware/middleware";
export async function taskRoutes(fastify: FastifyInstance) {
    const taskUsecase = new TaskUsecase();
    fastify.addHook('preHandler', authMiddleware)

    //Rota de criação de tarefa
    fastify.post('/tasks/create',{
        schema: {
            description: 'Criação de tarefa',
            tags: ['tasks'],
            summary: 'Criação de tarefa',
            security: [{ bearerAuth: [] }],
            body: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    status: { type: 'boolean' },
                    dueDate: { type: 'string' }
                },
                required: ['title', 'description', 'status','dueDate']
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        task: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                title: { type: 'string' },
                                description: { type: 'string' },
                                status: { type: 'string' },
                                userId: { type: 'string' }
                            }
                        }
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
        const body = request.body as ITaskCreate;
        const bodyShema = {
            ...body,
            userId: request.user.payload.id as string
        }
        const validationResult = TaskCreateSchema.safeParse(bodyShema)
        console.log(validationResult.error)
       
        if (!validationResult.success) {
            return reply.status(400).send({ error: "Dados inválidos" })
        }
       
        try {
            const task = await taskUsecase.create(bodyShema);
            return reply.status(201).send({message: "Tarefa criada com sucesso", task});
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(500).send({ error: error.message });
            }
            return reply.status(500).send({ error: 'Ocorreu um erro desconhecido' });
        }
    });


    //Rota de listagem de tarefas
    fastify.get('/tasks/list',{
        schema: {
            description: 'Listagem de tarefas',
            tags: ['tasks'],
            summary: 'Listagem de tarefas',
            security: [{ bearerAuth: [] }],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        tasks: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' },
                                    description: { type: 'string' },
                                    status: { type: 'boolean' },
                                    userId: { type: 'string' },
                                    dueDate: { type: 'string' }
                                }
                            }
                        }
                    }
                },
                400:{
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
        const tasks = await taskUsecase.findAll(request.user.payload.id as string)
        return reply.status(200).send({message: "Tarefas listadas com sucesso", tasks})
    })

    //Rota de deletar tarefa
    fastify.delete('/tasks/delete/:id',{
        schema: {
            description: 'Deletar tarefa',
            tags: ['tasks'],
            summary: 'Deletar tarefa',
            security: [{ bearerAuth: [] }],
            params: {
                $id: 'deleteTaskParams', // Use $id em vez de id
                type: 'object',
                properties: {
                    id: { type: 'string' }
                },
                required: ['id']
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        task: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                title: { type: 'string' },
                                description: { type: 'string' },
                                status: { type: 'string' },
                                userId: { type: 'string' }
                            }
                        }
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
        const { id } = request.params as { id: string }; // Adiciona tipagem explícita
        const task = await taskUsecase.delete(id);
        return reply.status(200).send({message: "Tarefa deletada com sucesso", task});
    })

    //Rota de atualizar tarefa
    fastify.put('/tasks/update', {
        schema: {
            description: 'Atualizar tarefa',
            tags: ['tasks'],
            summary: 'Atualizar tarefa',
            security: [{ bearerAuth: [] }],
            body: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    dueDate: { type: 'string' },
                    description: { type: 'string' },
                    status: { type: 'boolean' }
                },
                required: ['id', 'title', 'description', 'status', 'dueDate']
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        task: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                title: { type: 'string' },
                                description: { type: 'string' },
                                status: { type: 'boolean' },
                                dueDate: { type: 'string' }
                            }
                        }
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


        const body = request.body as ITask;
        console.log(body)
        const bodyShema = {
            ...body,
            userId: request.user.payload.id as string
        }
        const validationResult = TaskCreateSchema.safeParse(bodyShema)
        console.log(validationResult.error)
       
        if (!validationResult.success) {
            return reply.status(400).send({ error: "Dados inválidos" })
        }


        const task = await taskUsecase.update(body);
        return reply.status(200).send({message: "Tarefa atualizada com sucesso", task});
    })
}