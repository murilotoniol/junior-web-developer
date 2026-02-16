import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { AppModule } from './app.module.ts';
import { errorHandler } from './shared/filters/http-exception.filter.ts';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';

dotenv.config();

const app = express();

app.use(helmet())
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

AppModule.register(app);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 Swagger docs on http://localhost:${PORT}/api-docs`);
});