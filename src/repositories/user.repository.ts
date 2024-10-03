import { prisma } from "../database";
import { IUser, IUserCreate, IUserRepository } from "../interfaces/user.interface";
import { hash } from "bcrypt";

export class UserRepositoryPrisma implements IUserRepository {
    async create(user: IUserCreate): Promise<IUser> {
        const newUser = await prisma.user.create({
            data:{
                nome: user.nome,
                email: user.email,
                password: await hash(user.password, 10)
            }
        })
        return newUser as IUser
    }
    async findById(id: string): Promise<IUser | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user as IUser | null
    }
    async findByEmail(email: string): Promise<IUser | null> {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })
        return user as IUser | null
    }
    async update(id: string, user: IUser): Promise<IUser> {
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: user
        })
        return updatedUser as IUser
    }
    async delete(userId: string): Promise<void> {
        await prisma.user.delete({
            where: { id: userId },
        });
    }
}