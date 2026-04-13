import { User } from "../models/schemas/userSchema.js";
import { handleHttpError } from "../errors/handleError.js";
import { handlePasswordCompare } from "../utils/handlePassword.js";
import { tokenSignIn } from "../utils/handleJWT.js";

class AuthController {
    constructor() {}

    async login(req, res) {
        try {
            const { username, password } = req.body;
            
            // Buscar usuário
            const user = await User.findOne({ 
                $or: [
                    { username },
                    { email: username }
                ],
                isActive: true,
                deleted: false 
            }).populate('employeeId', 'name role');
            
            if (!user) {
                return res.status(401).json({
                    message: "Credenciais inválidas"
                });
            }
            
            // Verificar senha
            const isPasswordValid = await handlePasswordCompare(password, user.password);
            
            if (!isPasswordValid) {
                return res.status(401).json({
                    message: "Credenciais inválidas"
                });
            }
            
            // Atualizar último login
            user.lastLogin = new Date();
            await user.save();
            
            // Gerar token
            const userObj = {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                permissions: user.permissions
            };
            
            const token = await tokenSignIn({ userObj });
            
            res.status(200).json({
                message: "Login realizado com sucesso",
                data: {
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        permissions: user.permissions,
                        employee: user.employeeId
                    },
                    token
                }
            });
            
        } catch (error) {
            handleHttpError(res, "ERROR_LOGIN", error);
        }
    }

    async register(req, res) {
        try {
            const { username, email, password, role, employeeId } = req.body;
            
            // Verificar se já existe usuário com este username ou email
            const existingUser = await User.findOne({
                $or: [
                    { username },
                    { email }
                ],
                deleted: false
            });
            
            if (existingUser) {
                return res.status(409).json({
                    message: "Username ou email já cadastrado"
                });
            }
            
            // Criar novo usuário
            const newUser = await User.create({
                username,
                email,
                password,
                role: role || 'employee',
                employeeId
            });
            
            // Retornar dados sem a senha
            const userResponse = await User.findById(newUser._id)
                .select('-password')
                .populate('employeeId', 'name role');
            
            res.status(201).json({
                message: "Usuário criado com sucesso",
                data: userResponse
            });
            
        } catch (error) {
            if (error.code === 11000) {
                return handleHttpError(res, "ERROR_USER_EXISTS", { ...error, status: 409 });
            }
            handleHttpError(res, "ERROR_REGISTER", error);
        }
    }

    async getProfile(req, res) {
        try {
            const user = await User.findById(req.userId)
                .select('-password')
                .populate('employeeId', 'name role phone email');
            
            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }
            
            res.status(200).json({
                message: "Perfil obtido com sucesso",
                data: user
            });
            
        } catch (error) {
            handleHttpError(res, "ERROR_GET_PROFILE", error);
        }
    }

    async updateProfile(req, res) {
        try {
            const { username, email } = req.body;
            const userId = req.userId;
            
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { username, email },
                { new: true, runValidators: true }
            ).select('-password').populate('employeeId', 'name role');
            
            if (!updatedUser) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }
            
            res.status(200).json({
                message: "Perfil atualizado com sucesso",
                data: updatedUser
            });
            
        } catch (error) {
            if (error.code === 11000) {
                return handleHttpError(res, "ERROR_USER_EXISTS", { ...error, status: 409 });
            }
            handleHttpError(res, "ERROR_UPDATE_PROFILE", error);
        }
    }

    async changePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.userId;
            
            const user = await User.findById(userId);
            
            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }
            
            // Verificar senha atual
            const isCurrentPasswordValid = await handlePasswordCompare(currentPassword, user.password);
            
            if (!isCurrentPasswordValid) {
                return res.status(400).json({
                    message: "Senha atual incorreta"
                });
            }
            
            // Atualizar senha
            user.password = newPassword;
            await user.save();
            
            res.status(200).json({
                message: "Senha alterada com sucesso"
            });
            
        } catch (error) {
            handleHttpError(res, "ERROR_CHANGE_PASSWORD", error);
        }
    }
}

export default AuthController;
