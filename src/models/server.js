import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger.js';
dotenv.config();

import { connectMongoDB } from '../config/mongoose.js';
import { MainRouter } from '../routes/main.js';
import { AuthRouter } from '../routes/auth.js';
import { ServicesRouter } from '../routes/services.js';
import { PaymentsRouter } from '../routes/payments.js';
import { ClientsRouter } from '../routes/clients.js';
import { VehiclesRouter } from '../routes/vehicles.js';
import { EmployeesRouter } from '../routes/employees.js';
import { TicketsRouter } from '../routes/tickets.js';
import { SalesRouter } from '../routes/sales.js';

export class Server{

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
        this.mainRouter = new MainRouter();
        this.authRouter = new AuthRouter();
        this.servicesRouter = new ServicesRouter();
        this.paymentsRouter = new PaymentsRouter();
        this.clientsRouter = new ClientsRouter();
        this.vehiclesRouter = new VehiclesRouter();
        this.employeesRouter = new EmployeesRouter();
        this.ticketsRouter = new TicketsRouter();
        this.salesRouter = new SalesRouter();
        this.setMiddlewares();
        this.setRoutes();
    }

    setMiddlewares() {
        connectMongoDB();
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.resolve('public')));
        
        this.app.use(express.static(path.resolve('STORAGE')));
    }

    setRoutes() {
        // Documentação Swagger
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
            customCss: '.swagger-ui .topbar { display: none }',
            customSiteTitle: 'AUTO CENTER SERVER API',
            customfavIcon: '/favicon.png'
        }));
        
        // Endpoint para baixar especificação OpenAPI
        this.app.get('/api-docs.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });
        
        // Rotas da aplicação
        this.app.use("/", this.mainRouter.getRouter());
        this.app.use("/auth", this.authRouter.getRouter());
        this.app.use("/services", this.servicesRouter.getRouter());
        this.app.use("/payments", this.paymentsRouter.getRouter());
        this.app.use("/clients", this.clientsRouter.getRouter());
        this.app.use("/vehicles", this.vehiclesRouter.getRouter());
        this.app.use("/employees", this.employeesRouter.getRouter());
        this.app.use("/tickets", this.ticketsRouter.getRouter());
        this.app.use("/sales", this.salesRouter.getRouter());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}