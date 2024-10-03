import { TaskRepositoryPrisma } from "../repositories/task.repository";
import { ITask, ITaskCreate, ITaskRepository } from "../interfaces/task.interface";

class TaskUsecase {
    private taskRepository: ITaskRepository
    constructor(){
        this.taskRepository = new TaskRepositoryPrisma()
    }

    async create(task: ITaskCreate): Promise<ITask> {
        const taskExists = await this.taskRepository.findByTitle(task.title, task.userId)
        if (taskExists) {
            throw new Error("Tarefa já cadastrada")
        }
        const newTask = await this.taskRepository.create(task)
        return newTask
    }

    async findAll(userId: string): Promise<ITask[]> {
        const tasks = await this.taskRepository.findAll(userId)
        return tasks
    }

    async delete(id: string): Promise<void> {
        const task = await this.taskRepository.delete(id)
    }
    async update(task: ITask): Promise<ITask | null> {
        const updatedTask = await this.taskRepository.update(task)
        return updatedTask
    }
}

export { TaskUsecase }  