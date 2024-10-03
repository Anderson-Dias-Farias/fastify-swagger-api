import { compare } from "bcrypt";
import { IUser, IUserCreate, IUserRepository } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUsecase {
    private userRepository: IUserRepository
    constructor(){
        this.userRepository = new UserRepositoryPrisma()
    }

    async create(user: IUserCreate): Promise<IUser> {
        const userExists = await this.userRepository.findByEmail(user.email)
        if (userExists) {
            throw new Error("Usuário já cadastrado")
        }
        const newUser = await this.userRepository.create(user)
        return newUser
    }
    async login(email: string, password: string): Promise<IUser> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new Error("Usuário não encontrado")
        }
        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new Error("Senha incorreta")
        }
        return user
    }
}

export { UserUsecase }  