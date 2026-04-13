import { Router } from 'express';
import ClientsController from '../controllers/clientsController.js';
import { validatorCreateClient, validatorUpdateClient } from '../validators/client.js';
import { validateNeedsId } from '../validators/global.js';
import { authMiddleware, checkPermission } from '../middlewares/authMiddleware.js';

export class ClientsRouter {
    constructor() {
        this.router = Router();
        this.clientsController = new ClientsController();
        this.setRoutes();
    }

    setRoutes() {
        // Todas as rotas requerem autenticação
        this.router.use(authMiddleware);
        
        /**
         * @swagger
         * /clients:
         *   get:
         *     summary: Listar todos os clientes
         *     description: Retorna uma lista de todos os clientes cadastrados
         *     tags: [Clientes]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: Lista de clientes retornada com sucesso
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
         *                     $ref: '#/components/schemas/Client'
         *       401:
         *         description: Token de acesso inválido
         *       403:
         *         description: Permissão insuficiente
         */
        this.router.get("/", 
            checkPermission('canViewClients'), 
            this.clientsController.getItems.bind(this.clientsController)
        );
        
        /**
         * @swagger
         * /clients/{id}:
         *   get:
         *     summary: Buscar cliente por ID
         *     description: Retorna um cliente específico pelo seu ID
         *     tags: [Clientes]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: ID do cliente
         *     responses:
         *       200:
         *         description: Cliente encontrado com sucesso
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                 data:
         *                   $ref: '#/components/schemas/Client'
         *       404:
         *         description: Cliente não encontrado
         *       401:
         *         description: Token de acesso inválido
         */
        this.router.get("/:id", 
            validateNeedsId, 
            checkPermission('canViewClients'), 
            this.clientsController.getItem.bind(this.clientsController)
        );
        
        /**
         * @swagger
         * /clients/email/{email}:
         *   get:
         *     summary: Buscar cliente por email
         *     description: Retorna um cliente específico pelo seu email
         *     tags: [Clientes]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: email
         *         required: true
         *         schema:
         *           type: string
         *         description: Email do cliente
         *     responses:
         *       200:
         *         description: Cliente encontrado com sucesso
         *       404:
         *         description: Cliente não encontrado
         */
        this.router.get("/email/:email", 
            checkPermission('canViewClients'), 
            this.clientsController.getByEmail.bind(this.clientsController)
        );
        
        /**
         * @swagger
         * /clients/cpf/{cpf}:
         *   get:
         *     summary: Buscar cliente por CPF
         *     description: Retorna um cliente específico pelo seu CPF
         *     tags: [Clientes]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: cpf
         *         required: true
         *         schema:
         *           type: string
         *         description: CPF do cliente
         *     responses:
         *       200:
         *         description: Cliente encontrado com sucesso
         *       404:
         *         description: Cliente não encontrado
         */
        this.router.get("/cpf/:cpf", 
            checkPermission('canViewClients'), 
            this.clientsController.getByCpf.bind(this.clientsController)
        );
        
        /**
         * @swagger
         * /clients:
         *   post:
         *     summary: Criar novo cliente
         *     description: Cria um novo cliente no sistema
         *     tags: [Clientes]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - name
         *               - email
         *               - cpf
         *               - phone
         *             properties:
         *               name:
         *                 type: string
         *                 example: "João Silva"
         *               email:
         *                 type: string
         *                 format: email
         *                 example: "joao@email.com"
         *               cpf:
         *                 type: string
         *                 example: "12345678901"
         *               phone:
         *                 type: string
         *                 example: "(11) 99999-9999"
         *               address:
         *                 type: object
         *                 properties:
         *                   street:
         *                     type: string
         *                   number:
         *                     type: string
         *                   neighborhood:
         *                     type: string
         *                   city:
         *                     type: string
         *                   state:
         *                     type: string
         *                   zipCode:
         *                     type: string
         *     responses:
         *       201:
         *         description: Cliente criado com sucesso
         *       400:
         *         description: Dados inválidos
         *       409:
         *         description: Cliente já existe
         */
        this.router.post("/", 
            validatorCreateClient, 
            checkPermission('canManageClients'), 
            this.clientsController.createItem.bind(this.clientsController)
        );
        
        this.router.put("/:id", 
            validateNeedsId, 
            validatorUpdateClient, 
            checkPermission('canManageClients'), 
            this.clientsController.updateItem.bind(this.clientsController)
        );
        
        this.router.delete("/:id", 
            validateNeedsId, 
            checkPermission('canManageClients'), 
            this.clientsController.deleteItem.bind(this.clientsController)
        );
    }

    getRouter() {
        return this.router;
    }
}
