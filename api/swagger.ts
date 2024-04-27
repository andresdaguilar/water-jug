import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Water Jug Challenge',
    version: '1.0.0',
    description: 'This is a single endpoint API to solve the Water Jug challenge',
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Example Developer',
      url: 'http://www.example.com',
      email: 'example@example.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./api/waterJug/waterJugRoutes.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);