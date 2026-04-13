import { Router } from 'express';
import ServicesController from '../controllers/servicesController.js';
import { validatorCreateService, validatorUpdateService } from '../validators/service.js';
import { validateNeedsId } from '../validators/global.js';

export class ServicesRouter {
    constructor() {
        this.router = Router();
        this.servicesController = new ServicesController();
        this.setRoutes();
    }

    setRoutes() {
        /**
         * @swagger
         * /services:
         *   get:
         *     summary: Listar todos os serviços
         *     description: Retorna uma lista de todos os serviços disponíveis
         *     tags: [Serviços]
         *     responses:
         *       200:
         *         description: Lista de serviços retornada com sucesso
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                 data:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/Service'
         */
        this.router.get(
            "/", 
            this.servicesController.getItems.bind(this.servicesController)
        );

        /**
         * @swagger
         * /services/{id}:
         *   get:
         *     summary: Buscar serviço por ID
         *     description: Retorna um serviço específico pelo seu ID
         *     tags: [Serviços]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: ID do serviço
         *     responses:
         *       200:
         *         description: Serviço encontrado com sucesso
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                 data:
         *                   $ref: '#/components/schemas/Service'
         *       404:
         *         description: Serviço não encontrado
         */
        this.router.get(
            "/:id", 
            validateNeedsId,
            this.servicesController.getItem.bind(this.servicesController)
        );

        /**
         * @swagger
         * /services:
         *   post:
         *     summary: Criar novo serviço
         *     description: Cria um novo serviço no sistema
         *     tags: [Serviços]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - item
         *               - price
         *             properties:
         *               item:
         *                 type: string
         *                 example: "Troca de óleo"
         *               description:
         *                 type: string
         *                 example: "Troca de óleo do motor com filtro"
         *               price:
         *                 type: number
         *                 example: 89.90
         *               category:
         *                 type: string
         *                 example: "Manutenção"
         *               estimatedTime:
         *                 type: number
         *                 example: 30
         *     responses:
         *       201:
         *         description: Serviço criado com sucesso
         *       400:
         *         description: Dados inválidos
         */
        this.router.post(
            "/", 
            validatorCreateService,
            this.servicesController.createItem.bind(this.servicesController)
        );

        /**
         * @swagger
         * /services/{id}:
         *   put:
         *     summary: Atualizar serviço
         *     description: Atualiza um serviço existente
         *     tags: [Serviços]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: ID do serviço
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               item:
         *                 type: string
         *               description:
         *                 type: string
         *               price:
         *                 type: number
         *               category:
         *                 type: string
         *               estimatedTime:
         *                 type: number
         *     responses:
         *       200:
         *         description: Serviço atualizado com sucesso
         *       404:
         *         description: Serviço não encontrado
         *       400:
         *         description: Dados inválidos
         */
        this.router.put(
            "/:id", 
            validateNeedsId,
            validatorUpdateService,
            this.servicesController.updateItem.bind(this.servicesController)
        );

        /**
         * @swagger
         * /services/{id}:
         *   delete:
         *     summary: Excluir serviço
         *     description: Remove um serviço do sistema
         *     tags: [Serviços]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: ID do serviço
         *     responses:
         *       200:
         *         description: Serviço excluído com sucesso
         *       404:
         *         description: Serviço não encontrado
         */
        this.router.delete(
            "/:id", 
            validateNeedsId,
            this.servicesController.deleteItem.bind(this.servicesController)
        );
    }

    getRouter() {
        return this.router;
    }
}