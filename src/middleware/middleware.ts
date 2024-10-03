import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

declare module 'fastify' {
    interface FastifyRequest {
        user?: any
    }
}

export function verifyToken(token: string, reply: FastifyReply) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string, { complete: true });
    } catch (err) {
        return reply.status(401).send({ error: "Token inválido" });
    }
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return reply.status(401).send({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = verifyToken(token, reply);
        request.user = decoded;
        return request.user;
    } catch (err) {
        const error = err as Error; // Cast 'err' to 'Error'
        return reply.status(401).send({ error: error.message });
    }
}

