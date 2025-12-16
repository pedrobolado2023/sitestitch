# 🚀 Deploy do Backend Q-AURA no Easypanel

## 📋 Pré-requisitos

- Conta no Easypanel
- Repositório GitHub: https://github.com/pedrobolado2023/sitestitch
- Credenciais do Mercado Pago (já configuradas)

---

## 🎯 Passo a Passo

### 1️⃣ Criar Novo Projeto no Easypanel

1. Acesse seu painel Easypanel
2. Clique em **"Create"** ou **"New Project"**
3. Selecione **"App from GitHub"** ou **"Git Repository"**

### 2️⃣ Conectar Repositório

1. **Repository URL:** `https://github.com/pedrobolado2023/sitestitch`
2. **Branch:** `main`
3. **Build Type:** **Docker** (não Node.js)

### 3️⃣ Configurar Build

**⚠️ IMPORTANTE:** O Easypanel deve detectar automaticamente o `Dockerfile`.

Se pedir configuração manual:

**Dockerfile Path:** `./Dockerfile` (ou deixe em branco)

**Port:** `3000`

**Não precisa configurar Build Command ou Start Command** - o Dockerfile já tem tudo!

### 4️⃣ Adicionar Variáveis de Ambiente

No Easypanel, vá em **Environment Variables** e adicione:

```env
MP_ACCESS_TOKEN=APP_USR-5519364874850587-121608-4212956dcbe4f0527291fb79271b360b-1420180015
MP_PUBLIC_KEY=APP_USR-459f5f82-4725-4360-b5bb-f300e79a298d
PORT=3000
NODE_ENV=production
```

### 5️⃣ Configurar Domínio

1. Após o deploy, o Easypanel gerará uma URL automática
2. Ou configure um domínio customizado:
   - Vá em **"Domains"**
   - Adicione seu domínio (ex: `api.estudeq-aura.com.br`)
   - Configure o DNS conforme instruções do Easypanel

### 6️⃣ Deploy

1. Clique em **"Deploy"** ou **"Create"**
2. Aguarde o build (2-5 minutos)
3. Verifique os logs para confirmar que está rodando

---

## ✅ Verificar Deploy

### Testar Backend

Acesse a URL gerada pelo Easypanel (ex: `https://seu-app.easypanel.host`)

Você deve ver a página do Q-AURA.

### Testar API

Acesse: `https://seu-app.easypanel.host/api/create-payment`

Deve retornar erro 400 (normal, faltam dados).

---

## 🔧 Configurar CORS (Se Necessário)

Se tiver problemas de CORS, adicione no `server.js`:

```javascript
app.use(cors({
    origin: ['https://estudeq-aura.com.br', 'https://www.estudeq-aura.com.br'],
    credentials: true
}));
```

Faça commit e push:
```bash
git add server.js
git commit -m "feat: Configurar CORS para domínio de produção"
git push origin main
```

O Easypanel fará redeploy automaticamente.

---

## 📝 Atualizar Frontend

Depois do deploy, copie a URL do Easypanel e atualize:

**Arquivo:** `public/js/payment.js`

```javascript
// Linha 6
const API_URL = 'https://sua-url.easypanel.host';
```

Ou se configurou domínio customizado:
```javascript
const API_URL = 'https://api.estudeq-aura.com.br';
```

---

## 🔄 Auto Deploy

O Easypanel pode fazer deploy automático quando você fizer push no GitHub:

1. Vá em **"Settings"** do projeto
2. Ative **"Auto Deploy"** ou **"GitHub Webhook"**
3. Agora qualquer push na branch `main` fará redeploy automático

---

## 📊 Monitoramento

### Ver Logs
```bash
# No painel Easypanel
Vá em "Logs" para ver logs em tempo real
```

### Métricas
- CPU Usage
- Memory Usage
- Request Count
- Response Time

---

## 🆘 Troubleshooting

### Erro: "Application failed to start"

**Solução:**
1. Verifique os logs
2. Confirme que `package.json` tem:
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

### Erro: "Port already in use"

**Solução:**
Certifique-se que `server.js` usa:
```javascript
const PORT = process.env.PORT || 3000;
```

### Erro: "Mercado Pago não configurado"

**Solução:**
1. Verifique as variáveis de ambiente
2. Confirme que `MP_ACCESS_TOKEN` está correto
3. Reinicie a aplicação

### Erro CORS

**Solução:**
Adicione domínio permitido no CORS (ver seção "Configurar CORS" acima)

---

## 📁 Estrutura de Arquivos Necessária

O Easypanel precisa destes arquivos na raiz:

```
✅ server.js          # Servidor principal
✅ package.json       # Dependências
✅ .env.example       # Template de variáveis
✅ index.html         # Frontend (opcional)
✅ public/            # Arquivos estáticos
```

Todos já estão no repositório! ✅

---

## 🎉 Pronto!

Após seguir estes passos:

1. ✅ Backend rodando no Easypanel
2. ✅ Mercado Pago configurado
3. ✅ URL pública disponível
4. ✅ Pronto para receber pagamentos

---

## 📞 Links Úteis

- **Repositório:** https://github.com/pedrobolado2023/sitestitch
- **Documentação Easypanel:** https://easypanel.io/docs
- **Mercado Pago Docs:** https://www.mercadopago.com.br/developers

---

**Desenvolvido com ❤️ para Q-AURA**
