import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AUTO CENTER SERVER',
      version: '1.0.0',
      description: 'Sistema completo de gestão para centro automotivo com controle de estoque, clientes, funcionários, vendas e financeiro.',
      contact: {
        name: 'Botechia-Erika',
        email: 'elbotechia@gmail.com'
      },
      license: {
        name: 'MIT',
        url: 'https://github.com/botechia-erika/auto-center-server/blob/main/LICENSE'
      }
    },
    servers: [
      {
        url: 'http://localhost:9494',
        description: 'Servidor de Desenvolvimento'
      },
      {
        url: 'https://auto-center-server.onrender.com/',
        description: 'Servidor de Produção'
      }
    ],
    tags: [
      {
        name: 'Autenticação',
        description: 'Endpoints para autenticação e autorização'
      },
      {
        name: 'Clientes',
        description: 'Gestão de clientes'
      },
      {
        name: 'Veículos',
        description: 'Gestão de veículos dos clientes'
      },
      {
        name: 'Funcionários',
        description: 'Gestão de funcionários'
      },
      {
        name: 'Produtos',
        description: 'Gestão de produtos e estoque'
      },
      {
        name: 'Serviços',
        description: 'Gestão de serviços oferecidos'
      },
      {
        name: 'Vendas',
        description: 'Gestão de vendas e transações'
      },
      {
        name: 'Tickets',
        description: 'Gestão de tickets de atendimento'
      },
      {
        name: 'Pagamentos',
        description: 'Gestão de pagamentos'
      },
      {
        name: 'Relatórios',
        description: 'Relatórios e analytics'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtido através do login'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do usuário'
            },
            username: {
              type: 'string',
              description: 'Nome de usuário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário'
            },
            role: {
              type: 'string',
              enum: ['admin', 'employee'],
              description: 'Tipo de usuário'
            },
            isActive: {
              type: 'boolean',
              description: 'Status do usuário'
            },
            permissions: {
              type: 'object',
              description: 'Permissões do usuário'
            }
          }
        },
        Client: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do cliente'
            },
            name: {
              type: 'string',
              description: 'Nome completo do cliente'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do cliente'
            },
            cpf: {
              type: 'string',
              description: 'CPF do cliente'
            },
            phone: {
              type: 'string',
              description: 'Telefone do cliente'
            },
            address: {
              type: 'object',
              properties: {
                street: {
                  type: 'string',
                  description: 'Rua'
                },
                number: {
                  type: 'string',
                  description: 'Número'
                },
                neighborhood: {
                  type: 'string',
                  description: 'Bairro'
                },
                city: {
                  type: 'string',
                  description: 'Cidade'
                },
                state: {
                  type: 'string',
                  description: 'Estado'
                },
                zipCode: {
                  type: 'string',
                  description: 'CEP'
                }
              },
              description: 'Endereço completo do cliente'
            },
            vehicles: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Vehicle'
              },
              description: 'Veículos do cliente'
            },
            purchaseHistory: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Sale'
              },
              description: 'Histórico de compras'
            },
            isActive: {
              type: 'boolean',
              description: 'Status do cliente'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização'
            }
          },
          required: ['name', 'email', 'cpf', 'phone']
        },
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do produto'
            },
            code: {
              type: 'string',
              description: 'Código do produto'
            },
            name: {
              type: 'string',
              description: 'Nome do produto'
            },
            brand: {
              type: 'string',
              description: 'Marca do produto'
            },
            category: {
              type: 'string',
              enum: ['Óleo', 'Filtro', 'Pneu', 'Bateria', 'Peças', 'Acessórios', 'Ferramentas', 'Outros'],
              description: 'Categoria do produto'
            },
            quantity: {
              type: 'number',
              description: 'Quantidade em estoque'
            },
            unitPrice: {
              type: 'number',
              description: 'Preço unitário'
            }
          }
        },
        Service: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do serviço'
            },
            item: {
              type: 'string',
              description: 'Nome do serviço'
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada do serviço'
            },
            price: {
              type: 'number',
              description: 'Preço do serviço'
            },
            category: {
              type: 'string',
              description: 'Categoria do serviço'
            },
            estimatedTime: {
              type: 'number',
              description: 'Tempo estimado em minutos'
            },
            isActive: {
              type: 'boolean',
              description: 'Status do serviço'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização'
            }
          },
          required: ['item', 'price']
        },
        Employee: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do funcionário'
            },
            name: {
              type: 'string',
              description: 'Nome do funcionário'
            },
            role: {
              type: 'string',
              enum: ['Mecânico', 'Gerente', 'Atendente', 'Supervisor', 'Técnico', 'Auxiliar'],
              description: 'Cargo do funcionário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do funcionário'
            },
            phone: {
              type: 'string',
              description: 'Telefone do funcionário'
            },
            isActive: {
              type: 'boolean',
              description: 'Status do funcionário'
            }
          }
        },
        Financial: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do lançamento'
            },
            type: {
              type: 'string',
              enum: ['receita', 'despesa'],
              description: 'Tipo de lançamento'
            },
            category: {
              type: 'string',
              enum: ['vendas', 'servicos', 'outras_receitas', 'salarios', 'energia', 'agua', 'aluguel', 'fornecedores', 'impostos', 'combustivel', 'manutencao', 'outras_despesas'],
              description: 'Categoria do lançamento'
            },
            description: {
              type: 'string',
              description: 'Descrição do lançamento'
            },
            amount: {
              type: 'number',
              description: 'Valor do lançamento'
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Data do lançamento'
            },
            status: {
              type: 'string',
              enum: ['pendente', 'pago', 'recebido', 'cancelado'],
              description: 'Status do lançamento'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro'
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string'
                  },
                  message: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de sucesso'
            },
            data: {
              type: 'object',
              description: 'Dados retornados'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Auth',
        description: 'Autenticação e autorização de usuários'
      },
      {
        name: 'Clients',
        description: 'Gestão de clientes'
      },
      {
        name: 'Products',
        description: 'Gestão de produtos e estoque'
      },
      {
        name: 'Services',
        description: 'Gestão de serviços'
      },
      {
        name: 'Employees',
        description: 'Gestão de funcionários'
      },
      {
        name: 'Sales',
        description: 'Gestão de vendas'
      },
      {
        name: 'Financials',
        description: 'Controle financeiro (Admin apenas)'
      },
      {
        name: 'Reports',
        description: 'Relatórios e dashboards (Admin apenas)'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Arquivos que contêm anotações Swagger
};

export const swaggerSpec = swaggerJsdoc(options);
