# Q-AURA Landing Page com Integração Mercado Pago

Landing page completa do Q-AURA com integração de pagamentos via Pix usando a API do Mercado Pago.

## 🚀 Funcionalidades

- ✅ Landing page responsiva e moderna
- ✅ Integração completa com API do Mercado Pago
- ✅ Pagamento via Pix com QR Code
- ✅ Verificação automática de pagamento
- ✅ Modal de pagamento interativo
- ✅ Webhook para notificações
- ✅ Backend Node.js/Express

## 📋 Pré-requisitos

- Node.js 14+ instalado
- Conta no Mercado Pago
- Credenciais do Mercado Pago (Access Token e Public Key)

## 🔧 Instalação

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Credenciais do Mercado Pago

Copie o arquivo `.env.example` para `.env`:

```bash
copy .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais:

```env
MP_ACCESS_TOKEN=seu_access_token_aqui
MP_PUBLIC_KEY=sua_public_key_aqui
PORT=3000
```

**Como obter as credenciais:**
1. Acesse: https://www.mercadopago.com.br/developers/panel/credentials
2. Copie o **Access Token** e a **Public Key**
3. Cole no arquivo `.env`

### 3. Iniciar o Servidor

```bash
npm start
```

O servidor estará rodando em: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
stitch_hero_section_q_aura_landing_page/
├── index.html              # Landing page principal
├── server.js               # Backend Node.js/Express
├── package.json            # Dependências do projeto
├── .env.example            # Exemplo de variáveis de ambiente
├── .env                    # Suas credenciais (não commitar!)
├── public/
│   └── js/
│       └── payment.js      # JavaScript de integração com MP
└── README.md               # Este arquivo
```

## 🔐 Fluxo de Pagamento

1. **Usuário preenche o formulário** de cadastro
2. **Backend cria pagamento Pix** via API do Mercado Pago
3. **Modal exibe QR Code** e código Pix copia e cola
4. **Verificação automática** do status do pagamento a cada 5 segundos
5. **Redirecionamento** para página de confirmação após aprovação
6. **Webhook recebe notificação** do Mercado Pago

## 🛠️ Endpoints da API

### POST `/api/create-payment`
Cria um novo pagamento Pix

**Request Body:**
```json
{
  "name": "Nome Completo",
  "email": "email@exemplo.com",
  "phone": "(11) 99999-9999",
  "plan": "Plano Mensal",
  "amount": 19.90
}
```

**Response:**
```json
{
  "success": true,
  "payment_id": "123456789",
  "status": "pending",
  "qr_code": "00020126580014br.gov.bcb.pix...",
  "qr_code_base64": "iVBORw0KGgoAAAANSUhEUgAA...",
  "amount": 19.90
}
```

### GET `/api/payment-status/:payment_id`
Verifica o status de um pagamento

**Response:**
```json
{
  "status": "approved",
  "status_detail": "accredited",
  "payment_id": "123456789"
}
```

### POST `/api/webhook`
Recebe notificações do Mercado Pago

## 🎨 Personalização

### Alterar Valores dos Planos

Edite o arquivo `index.html`, seção de cadastro:

```html
<select name="plan" id="planSelect">
    <option value="Plano Mensal" data-amount="19.90">Plano Mensal - R$ 19,90</option>
    <option value="Plano Anual" data-amount="190.80">Plano Anual - R$ 190,80</option>
</select>
```

### Modificar Cores

As cores estão definidas no Tailwind config no `index.html`:

```javascript
colors: {
    "primary": "#f9f506",           // Amarelo principal
    "background-light": "#f8f8f5",  // Fundo claro
    "background-dark": "#23220f",   // Fundo escuro
}
```

## 🔄 Webhook do Mercado Pago

Para receber notificações em produção, você precisa:

1. **Expor seu servidor** para a internet (use ngrok para testes)
2. **Configurar a URL** do webhook no Mercado Pago
3. **Processar as notificações** no endpoint `/api/webhook`

### Usando ngrok para testes:

```bash
ngrok http 3000
```

Copie a URL gerada (ex: `https://abc123.ngrok.io`) e configure no Mercado Pago.

## 📝 Próximos Passos

Após o pagamento ser aprovado, você pode:

- [ ] Salvar dados do usuário em banco de dados
- [ ] Enviar email de confirmação
- [ ] Ativar acesso ao bot do WhatsApp
- [ ] Criar dashboard de administração
- [ ] Implementar sistema de assinaturas recorrentes

## 🐛 Troubleshooting

### Erro: "Access Token inválido"
- Verifique se copiou o Access Token correto do Mercado Pago
- Certifique-se de estar usando credenciais de **Produção** (não Teste)

### Modal de pagamento não abre
- Verifique o console do navegador para erros
- Certifique-se de que o servidor está rodando
- Confirme que o arquivo `payment.js` está sendo carregado

### Pagamento não é detectado
- Verifique se o webhook está configurado corretamente
- Teste com valores reais (Pix de teste não funciona em produção)

## 📞 Suporte

Para dúvidas sobre a API do Mercado Pago:
- Documentação: https://www.mercadopago.com.br/developers/pt/docs
- Suporte: https://www.mercadopago.com.br/developers/pt/support

## 📄 Licença

Este projeto é privado e proprietário.

---

**Desenvolvido para Q-AURA** 🚀
