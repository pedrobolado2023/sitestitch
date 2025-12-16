# 🎓 Q-AURA - Landing Page com Pagamento Mercado Pago

Landing page completa para o Q-AURA com integração de pagamento via **Mercado Pago Checkout Pro** (aceita cartão de crédito, Pix e outros métodos).

## 🚀 Como Usar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Credenciais do Mercado Pago

Crie um arquivo `.env` na raiz do projeto (copie de `.env.example`):

```env
MP_ACCESS_TOKEN=SEU_ACCESS_TOKEN_DE_PRODUCAO
MP_PUBLIC_KEY=SUA_PUBLIC_KEY_DE_PRODUCAO
PORT=3000
```

**Onde pegar as credenciais:**
- Acesse: https://www.mercadopago.com.br/developers/panel/credentials
- Use as **credenciais de PRODUÇÃO** (não de teste)
- Copie o `Access Token` e a `Public Key`

### 3. Iniciar o Servidor

```bash
npm start
```

O servidor estará rodando em: **http://localhost:3000**

## 💳 Como Funciona o Pagamento

1. **Usuário preenche o formulário** de cadastro
2. **Clica em "Finalizar e Pagar"**
3. **É redirecionado** para o Checkout Pro do Mercado Pago
4. **Escolhe o método de pagamento:**
   - 💳 Cartão de Crédito
   - 📱 Pix
   - 🏦 Boleto
   - Outros métodos disponíveis
5. **Após o pagamento:**
   - ✅ **Aprovado** → Redireciona para `/success`
   - ❌ **Recusado** → Redireciona para `/failure`
   - ⏳ **Pendente** → Redireciona para `/pending`

## 📁 Estrutura do Projeto

```
stitch_hero_section_q_aura_landing_page/
├── index.html              # Landing page principal
├── server.js               # Backend Node.js/Express
├── package.json            # Dependências do projeto
├── .env.example            # Exemplo de variáveis de ambiente
├── .env                    # Suas credenciais (NÃO COMMITAR!)
├── public/
│   └── js/
│       └── payment.js      # JavaScript de pagamento
├── README.md               # Este arquivo
└── .gitignore              # Arquivos ignorados pelo Git
```

## 🔧 Endpoints da API

### `POST /api/create-payment`

Cria uma preferência de pagamento no Mercado Pago.

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 99999-9999",
  "plan": "Plano Mensal",
  "amount": 19.90
}
```

**Response:**
```json
{
  "success": true,
  "preference_id": "123456789-abcd-1234-efgh-123456789012",
  "init_point": "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=..."
}
```

### `POST /api/webhook`

Recebe notificações do Mercado Pago sobre mudanças no status dos pagamentos.

### Páginas de Retorno

- `GET /success` - Pagamento aprovado
- `GET /failure` - Pagamento recusado
- `GET /pending` - Pagamento pendente

## 🎨 Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - Tailwind CSS
  - JavaScript (Vanilla)
  - Google Fonts (Spline Sans)
  - Material Symbols

- **Backend:**
  - Node.js
  - Express
  - Mercado Pago SDK
  - CORS
  - dotenv

## 🔐 Segurança

- ✅ Credenciais armazenadas em `.env` (não versionado)
- ✅ `.gitignore` protege arquivos sensíveis
- ✅ Webhook para validação de pagamentos
- ✅ CORS configurado
- ✅ Validação de dados no backend

## 📊 Próximos Passos

Após a confirmação do pagamento, você pode:

1. **Salvar dados do usuário** em um banco de dados
2. **Enviar e-mail de confirmação**
3. **Ativar acesso ao WhatsApp Bot**
4. **Gerar credenciais de acesso**
5. **Enviar instruções de uso**

Implemente essas funcionalidades no webhook (`/api/webhook`) quando `payment.body.status === 'approved'`.

## 🚀 Deploy

### Frontend (Arquivos Estáticos)

Pode ser hospedado em:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Backend (Node.js)

Pode ser hospedado em:
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

**Importante:** Configure as variáveis de ambiente no serviço de hospedagem!

## 📞 Suporte

Para dúvidas sobre a integração com Mercado Pago:
- Documentação: https://www.mercadopago.com.br/developers/pt/docs
- Suporte: https://www.mercadopago.com.br/developers/pt/support

## 📄 Licença

Este projeto foi desenvolvido para o Q-AURA.

---

**Desenvolvido com ❤️ para Q-AURA**
