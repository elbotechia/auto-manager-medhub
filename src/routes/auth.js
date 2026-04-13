import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import { validatorLogin, validatorRegister, validatorUpdateProfile, validatorChangePassword } from '../validators/auth.js';
import { authMiddleware, adminRequired } from '../middlewares/authMiddleware.js';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login de usuário
 *     description: Autentica usuário e retorna token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username ou email
 *                 example: admin
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: Admin123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login realizado com sucesso
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Cadastrar novo usuário (Admin apenas)
 *     description: Cria um novo usuário no sistema
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: funcionario1
 *               email:
 *                 type: string
 *                 format: email
 *                 example: funcionario@autocenterSERVER.com
 *               password:
 *                 type: string
 *                 example: Func123
 *               role:
 *                 type: string
 *                 enum: [admin, employee]
 *                 example: employee
 *               employeeId:
 *                 type: string
 *                 description: ID do funcionário (obrigatório se role = employee)
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       403:
 *         description: Acesso negado - apenas admin
 *       409:
 *         description: Username ou email já cadastrado
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Obter perfil do usuário logado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *   put:
 *     tags: [Auth]
 *     summary: Atualizar perfil do usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 */

/**
 * @swagger
 * /auth/change-password:
 *   put:
 *     tags: [Auth]
 *     summary: Alterar senha do usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *       400:
 *         description: Senha atual incorreta
 */

export class AuthRouter {
    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.setRoutes();
    }

    setRoutes() {
        // Rotas públicas
        this.router.post("/login", validatorLogin, this.authController.login.bind(this.authController));
        
        // Registro apenas para admin
        this.router.post("/register", 
            authMiddleware, 
            adminRequired, 
            validatorRegister, 
            this.authController.register.bind(this.authController)
        );
        
        // Rotas protegidas
        this.router.get("/profile", 
            authMiddleware, 
            this.authController.getProfile.bind(this.authController)
        );
        
        this.router.put("/profile", 
            authMiddleware, 
            validatorUpdateProfile, 
            this.authController.updateProfile.bind(this.authController)
        );
        
        this.router.put("/change-password", 
            authMiddleware, 
            validatorChangePassword, 
            this.authController.changePassword.bind(this.authController)
        );
    }

    getRouter() {
        return this.router;
    }
}
