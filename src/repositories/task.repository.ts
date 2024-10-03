import { prisma } from "../database";
import { ITask, ITaskCreate, ITaskRepository } from "../interfaces/task.interface";

export class TaskRepositoryPrisma implements ITaskRepository {
    async create(task: ITaskCreate): Promise<ITask> {
        const newTask = await prisma.task.create({
            data: task
        })
        return newTask as ITask
    }
    async findByTitle(title: string, userId: string): Promise<ITask | null> {
        const task = await prisma.task.findFirst({
            where: {
                title,
                userId
            }
        })
        return task as ITask | null
    }
    async update( task: ITask): Promise<ITask | null> {
        const updatedTask = await prisma.task.update({
            where: {
                id: task.id
            },
            data: task
        })
        return updatedTask as ITask | null
    }
    async delete(id: string): Promise<ITask | null  > {
        console.log("id",id)
        const task = await prisma.task.delete({
            where: {
                id,
            },
        });
        console.log("eu sou o task",task)
        return task as ITask
    }
    async findAll(userId: string): Promise<ITask[]> {
        const tasks = await prisma.task.findMany({
            where: {
                userId
            }
        })
        return tasks as ITask[]
    }
}
