import { z } from 'zod';

// Esquemas de validação usando Zod
export const UserSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(3).max(25),
  email: z.string().email(),
  password: z.string().min(8).max(25) ,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserCreateSchema = z.object({
  nome: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(25) ,
});

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(25),
});

// Interfaces geradas a partir dos esquemas do Zod
export type IUser = z.infer<typeof UserSchema>;
export type IUserCreate = z.infer<typeof UserCreateSchema>;
export type IUserLogin = z.infer<typeof UserLoginSchema>;

export interface IUserRepository {
  create(user: IUserCreate): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  update(id: string, user: IUser): Promise<IUser | null>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<IUser | null>;
}
