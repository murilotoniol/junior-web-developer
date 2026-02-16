// @ts-ignore
import swaggerJsdoc from 'swagger-jsdoc';

const options: any = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Junior Web Developer Bootcamp API',
      version: '1.0.0',
      description: 'API para gerenciamento de atividades e perfil de usuário',
    },
    servers: [
      {
        url: '/api',
        description: 'API Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/modules/**/*.ts', './src/main.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
