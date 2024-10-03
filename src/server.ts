import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import cors from '@fastify/cors';
import { taskRoutes } from "./routes/task.routes";
import swaggerUi from '@fastify/swagger-ui';
import swagger from '@fastify/swagger';

const app: FastifyInstance = fastify({ logger: true });

app.register(cors, { 
  origin: process.env.CORS_ORIGIN, // Configura a origem permitida
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Configura os métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Configura os cabeçalhos permitidos
});

// Configurando Swagger
app.register(swagger, {
  swagger: {
    info: {
      title: 'API Documentation',
      description: 'API documentation using Swagger',
      version: '1.0.0',
    },
    host: 'localhost:3100',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: "Requer token de autenticação"  }
    },
  },

});

// Configurando Swagger UI para visualização da documentação
app.register(swaggerUi, {
  routePrefix: '/docs', // Rota onde será exibida a documentação
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

app.register(userRoutes);
app.register(taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen({ port: 3100 }, (err, address) => {
  if (err) throw err;
  console.log(`Server is running on ${address}`);
});

