import { z } from "zod";

export const TaskCreateSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    status: z.boolean(),
    userId: z.string(),
    dueDate: z.string(),
});

export const TaskSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1),
    description: z.string().min(1),
    status: z.boolean(),
    dueDate: z.date(),
});

export type ITaskCreate = z.infer<typeof TaskCreateSchema>;
export type ITask = z.infer<typeof TaskSchema>;

export interface ITaskRepository {
    create(task: ITaskCreate): Promise<ITask>;
    findByTitle(title: string, userId: string): Promise<ITask | null>;
    findAll(userId: string): Promise<ITask[]>;
    update(task: ITask): Promise<ITask | null>;
    delete(id: string): Promise<ITask | null>;
}