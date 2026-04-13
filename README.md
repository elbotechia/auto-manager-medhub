# 🚗 AUTO CENTER SERVER - API

Sistema completo de gestão para centro automotivo com controle de estoque, clientes, funcionários, vendas e financeiro.

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-5.1+-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-7+-green.svg)
![Swagger](https://img.shields.io/badge/Swagger-3.0-orange.svg)
![JWT](https://img.shields.io/badge/JWT-Authentication-red.svg)

## 📋 Sobre o Projeto

O AUTO CENTER SERVER é uma API REST moderna e completa desenvolvida para automatizar e modernizar a gestão de centros automotivos. O sistema oferece funcionalidades abrangentes para controle de:

- 👥 **Gestão de Clientes** - Cadastro completo com histórico de compras
- 🚙 **Gestão de Veículos** - Controle dos veículos dos clientes
- 👨‍💼 **Gestão de Funcionários** - Controle de acesso baseado em funções
- 📦 **Controle de Estoque** - Gestão completa de produtos e peças
- 🔧 **Serviços** - Catálogo de serviços oferecidos
- 💰 **Vendas e Pagamentos** - Sistema de vendas com controle financeiro
- 🎫 **Tickets de Atendimento** - Sistema de tickets para organização
- 📊 **Relatórios** - Analytics e relatórios detalhados

## 🚀 Funcionalidades Principais

### 🔐 Autenticação e Autorização
- Sistema de login com JWT
- Controle de acesso baseado em funções (Admin/Funcionário)
- Middleware de autenticação e permissões
- Sistema de registro de usuários

### 👥 Gestão de Clientes
- Cadastro completo de clientes com endereço
- Busca por CPF, email ou nome
- Histórico de compras e serviços
- Gestão de veículos do cliente

### 🚗 Gestão de Veículos
- Cadastro de veículos vinculados aos clientes
- Busca por placa ou cliente
- Histórico de serviços por veículo

### 📦 Controle de Estoque
- Gestão completa de produtos
- Controle de quantidade e preços
- Categorização de produtos
- Alertas de estoque baixo

### 🔧 Serviços
- Catálogo de serviços oferecidos
- Preços e tempo estimado
- Categorização de serviços

### 💼 Vendas e Financeiro
- Sistema de vendas completo
- Controle de pagamentos
- Geração de faturas
- Relatórios financeiros

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js + Express.js
- **Banco de Dados**: MongoDB + Mongoose
- **Autenticação**: JWT (JSON Web Tokens)
- **Validação**: Express Validator
- **Documentação**: Swagger/OpenAPI 3.0
- **Criptografia**: bcryptjs
- **CORS**: cors
- **Logger**: Morgan
- **Ambiente**: dotenv

## 📁 Estrutura do Projeto

```
auto-center-server/
├── src/
│   ├── app.js                 # Ponto de entrada da aplicação
│   ├── config/                # Configurações
│   │   ├── mongoose.js        # Configuração do MongoDB
│   │   ├── swagger.js         # Configuração do Swagger
│   │   └── multer.js          # Configuração de upload
│   ├── controllers/           # Controladores da aplicação
│   │   ├── authController.js
│   │   ├── clientsController.js
│   │   ├── vehiclesController.js
│   │   ├── employeesController.js
│   │   ├── servicesController.js
│   │   ├── salesController.js
│   │   ├── ticketsController.js
│   │   └── paymentsController.js
│   ├── models/                # Modelos e esquemas
│   │   ├── server.js          # Configuração do servidor
│   │   └── schemas/           # Esquemas do Mongoose
│   │       ├── userSchema.js
│   │       ├── clientSchema.js
│   │       ├── vehicleSchema.js
│   │       ├── productSchema.js
│   │       ├── serviceSchema.js
│   │       ├── saleSchema.js
│   │       ├── ticketSchema.js
│   │       ├── paymentSchema.js
│   │       ├── invoiceSchema.js
│   │       └── financialSchema.js
│   ├── routes/                # Rotas da API
│   │   ├── main.js
│   │   ├── auth.js
│   │   ├── clients.js
│   │   ├── vehicles.js
│   │   ├── employees.js
│   │   ├── services.js
│   │   ├── sales.js
│   │   ├── tickets.js
│   │   └── payments.js
│   ├── middlewares/           # Middlewares
│   │   └── authMiddleware.js
│   ├── validators/            # Validadores de entrada
│   │   ├── auth.js
│   │   ├── client.js
│   │   ├── vehicle.js
│   │   ├── employee.js
│   │   ├── service.js
│   │   ├── sale.js
│   │   ├── ticket.js
│   │   ├── payment.js
│   │   └── global.js
│   ├── utils/                 # Utilitários
│   │   ├── handleJWT.js
│   │   ├── handlePassword.js
│   │   └── handleValidator.js
│   └── errors/                # Tratamento de erros
│       └── handleError.js
├── public/                    # Arquivos estáticos
│   ├── index.html
│   ├── favicon.png
│   └── stylesheets/
├── DATA/                      # Dados e banco
│   ├── database/
│   └── JSON/
├── STORAGE/                   # Armazenamento de arquivos
├── package.json
└── README.md
```

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- MongoDB (versão 7 ou superior)
- npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/botechia-erika/auto-center-server.git
cd auto-center-server
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Servidor
PORT=9494

# MongoDB
MONGODB_URI=mongodb://localhost:27017/autocenter
DB_NAME=autocenter

# JWT
JWT_SECRET=sua_chave_secreta_super_segura_aqui
JWT_EXPIRE=7d

# Ambiente
NODE_ENV=development
```

### 4. Inicie o MongoDB

```bash
# Linux/Mac
sudo systemctl start mongod

# Windows (se instalado como serviço)
net start MongoDB

# Ou usando Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Execute a aplicação

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

A API estará rodando em: `http://localhost:9494`

## 📚 Documentação da API

### Swagger UI

Acesse a documentação interativa da API em:
- **Interface Swagger**: `http://localhost:9494/api-docs`
- **JSON OpenAPI**: `http://localhost:9494/api-docs.json`

### Endpoints Principais

#### 🔐 Autenticação
```
POST /auth/register    # Registrar usuário
POST /auth/login       # Login
GET  /auth/profile     # Perfil do usuário
PUT  /auth/password    # Alterar senha
```

#### 👥 Clientes
```
GET    /clients           # Listar clientes
GET    /clients/:id       # Buscar por ID
GET    /clients/cpf/:cpf  # Buscar por CPF
POST   /clients           # Criar cliente
PUT    /clients/:id       # Atualizar cliente
DELETE /clients/:id       # Excluir cliente
```

#### 🚗 Veículos
```
GET    /vehicles                    # Listar veículos
GET    /vehicles/:id                # Buscar por ID
GET    /vehicles/client/:clientId   # Veículos do cliente
GET    /vehicles/plate/:plate       # Buscar por placa
POST   /vehicles                    # Cadastrar veículo
PUT    /vehicles/:id                # Atualizar veículo
DELETE /vehicles/:id                # Excluir veículo
```

#### 🔧 Serviços
```
GET    /services     # Listar serviços
GET    /services/:id # Buscar por ID
POST   /services     # Criar serviço
PUT    /services/:id # Atualizar serviço
DELETE /services/:id # Excluir serviço
```

#### 💰 Vendas
```
GET    /sales     # Listar vendas
GET    /sales/:id # Buscar por ID
POST   /sales     # Criar venda
PUT    /sales/:id # Atualizar venda
DELETE /sales/:id # Cancelar venda
```

## 🔒 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar endpoints protegidos:

1. Faça login para obter o token:
```bash
curl -X POST http://localhost:9494/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@autocenter.com","password":"senha123"}'
```

2. Use o token no cabeçalho Authorization:
```bash
curl -X GET http://localhost:9494/clients \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 👨‍💼 Controle de Acesso

### Tipos de Usuário

- **Admin**: Acesso completo a todas as funcionalidades
- **Employee**: Acesso limitado baseado em permissões

### Permissões Disponíveis

```javascript
{
  canViewClients: true,      // Visualizar clientes
  canManageClients: false,   // Gerenciar clientes
  canViewEmployees: false,   // Visualizar funcionários
  canManageEmployees: false, // Gerenciar funcionários
  canViewProducts: true,     // Visualizar produtos
  canManageProducts: false,  // Gerenciar produtos
  canViewSales: true,        // Visualizar vendas
  canManageSales: true,      // Gerenciar vendas
  canViewReports: false,     // Visualizar relatórios
  canManageSystem: false     // Gerenciar sistema
}
```

## 🧪 Testando a API

### Exemplo de uso com curl

```bash
# Registrar primeiro usuário (Admin)
curl -X POST http://localhost:9494/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@autocenter.com",
    "password": "senha123",
    "role": "admin"
  }'

# Login
curl -X POST http://localhost:9494/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@autocenter.com",
    "password": "senha123"
  }'

# Criar cliente (use o token retornado no login)
curl -X POST http://localhost:9494/clients \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "cpf": "12345678901",
    "phone": "(11) 99999-9999"
  }'
```

## 🚀 Deploy

### Variáveis de Ambiente para Produção

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://seu-servidor-mongo/autocenter
JWT_SECRET=uma_chave_muito_mais_segura_em_producao
```

### Docker (Opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**ÉRIKA LUÍSA MENDONÇA BOTECHIA DE JESUS LEITE**
- Email: elbotechia@gmail.com
- GitHub: [@botechia-erika](https://github.com/botechia-erika)

## 🙏 Agradecimentos

- Comunidade Node.js
- Equipe do MongoDB
- Contribuidores do Express.js
- Documentação do Swagger

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**

## 📞 Suporte

Para suporte, envie um email para elbotechia@gmail.com ou abra uma issue no GitHub.

---

**AUTO CENTER SERVER** - *Modernizando a gestão automotiva* 🚗✨# auto-manager-medhub
