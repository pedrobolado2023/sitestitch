# 🚀 Guia de Deploy do Backend Q-AURA

## Opção 1: Railway (Recomendado - Mais Fácil)

### Passo 1: Criar Conta
1. Acesse: https://railway.app
2. Clique em "Start a New Project"
3. Faça login com GitHub

### Passo 2: Deploy
1. Clique em "Deploy from GitHub repo"
2. Selecione o repositório: `pedrobolado2023/sitestitch`
3. Railway detectará automaticamente que é Node.js

### Passo 3: Configurar Variáveis de Ambiente
1. Vá em "Variables"
2. Adicione as seguintes variáveis:

```
MP_ACCESS_TOKEN=APP_USR-5519364874850587-121608-4212956dcbe4f0527291fb79271b360b-1420180015
MP_PUBLIC_KEY=APP_USR-459f5f82-4725-4360-b5bb-f300e79a298d
PORT=3000
```

### Passo 4: Deploy
1. Railway fará o deploy automaticamente
2. Você receberá uma URL como: `https://seu-projeto.up.railway.app`

### Passo 5: Atualizar Frontend
No seu site `estudeq-aura.com.br`, atualize o arquivo `payment.js`:

```javascript
// Trocar de:
const API_URL = window.location.origin;

// Para:
const API_URL = 'https://seu-projeto.up.railway.app';
```

---

## Opção 2: Render

### Passo 1: Criar Conta
1. Acesse: https://render.com
2. Faça login com GitHub

### Passo 2: Novo Web Service
1. Clique em "New +"
2. Selecione "Web Service"
3. Conecte seu repositório GitHub: `pedrobolado2023/sitestitch`

### Passo 3: Configurar
- **Name:** qaura-backend
- **Environment:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free

### Passo 4: Variáveis de Ambiente
Adicione em "Environment":

```
MP_ACCESS_TOKEN=APP_USR-5519364874850587-121608-4212956dcbe4f0527291fb79271b360b-1420180015
MP_PUBLIC_KEY=APP_USR-459f5f82-4725-4360-b5bb-f300e79a298d
PORT=3000
```

### Passo 5: Deploy
1. Clique em "Create Web Service"
2. Aguarde o deploy (3-5 minutos)
3. Você receberá uma URL como: `https://qaura-backend.onrender.com`

---

## Opção 3: Vercel (Serverless)

### Passo 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

### Passo 2: Login
```bash
vercel login
```

### Passo 3: Deploy
Na pasta do projeto:
```bash
vercel
```

### Passo 4: Configurar Variáveis
No dashboard da Vercel:
1. Vá em "Settings" > "Environment Variables"
2. Adicione:
   - `MP_ACCESS_TOKEN`
   - `MP_PUBLIC_KEY`
   - `PORT=3000`

---

## 🔧 Após o Deploy

### 1. Testar o Backend
Acesse: `https://sua-url-do-backend.com`

Você deve ver uma página em branco (normal, pois o backend serve o HTML).

### 2. Testar a API
Acesse: `https://sua-url-do-backend.com/api/create-payment`

Deve retornar erro 400 (normal, pois faltam dados).

### 3. Atualizar o Frontend

No arquivo `public/js/payment.js` do seu site oficial:

```javascript
// Linha 2 - Trocar de:
const API_URL = window.location.origin;

// Para:
const API_URL = 'https://sua-url-do-backend.com';
```

### 4. Upload do Frontend
Faça upload do arquivo `payment.js` atualizado para seu servidor web.

---

## ✅ Checklist Final

- [ ] Backend hospedado e rodando
- [ ] Variáveis de ambiente configuradas
- [ ] URL do backend anotada
- [ ] Frontend atualizado com nova URL
- [ ] Teste de pagamento realizado

---

## 🆘 Problemas Comuns

### Erro: "Application failed to respond"
- Verifique se o `PORT` está configurado corretamente
- Certifique-se que `server.js` usa `process.env.PORT`

### Erro: "Mercado Pago não configurado"
- Verifique as variáveis de ambiente
- Certifique-se que `MP_ACCESS_TOKEN` está correto

### Erro CORS
Adicione no `server.js`:
```javascript
app.use(cors({
    origin: 'https://estudeq-aura.com.br'
}));
```

---

## 📞 Suporte

- Railway: https://docs.railway.app
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs

**Boa sorte com o deploy! 🚀**
