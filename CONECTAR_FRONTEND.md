# 🚀 Passos Finais para Conectar Frontend ao Backend

## 1️⃣ Obter URL do Railway

1. Acesse: https://railway.com/project/231881da-9077-4223-afe5-eba427419dec
2. Clique no serviço do seu projeto
3. Vá em **"Settings"** (engrenagem)
4. Procure por **"Domains"** ou **"Public Networking"**
5. Você verá uma URL como: `https://seu-projeto.up.railway.app`
6. **COPIE** essa URL

## 2️⃣ Atualizar o Arquivo payment.js

Abra o arquivo: `public/js/payment.js`

Na **linha 6**, substitua:
```javascript
const API_URL = 'COLE_AQUI_A_URL_DO_RAILWAY';
```

Por (exemplo):
```javascript
const API_URL = 'https://seu-projeto.up.railway.app';
```

**⚠️ IMPORTANTE:** 
- NÃO coloque `/` no final da URL
- Use HTTPS (não HTTP)
- Copie exatamente como aparece no Railway

## 3️⃣ Fazer Upload para o Site Oficial

1. Salve o arquivo `payment.js` atualizado
2. Faça upload para seu servidor web em:
   - `https://estudeq-aura.com.br/api/` ou
   - Onde quer que esteja o arquivo JavaScript do seu site

## 4️⃣ Testar

1. Acesse: https://estudeq-aura.com.br/#cadastro
2. Preencha o formulário
3. Clique em "Finalizar e Pagar"
4. Você deve ser redirecionado para o Mercado Pago

## 5️⃣ Verificar se o Backend Está Rodando

Teste acessando: `https://sua-url-do-railway.up.railway.app`

Você deve ver a página do Q-AURA (é normal, o backend serve o HTML também).

---

## ✅ Checklist

- [ ] URL do Railway copiada
- [ ] payment.js atualizado
- [ ] Upload feito para o servidor
- [ ] Teste realizado
- [ ] Pagamento funcionando

---

## 🆘 Se Não Funcionar

1. **Abra o Console do Navegador** (F12)
2. **Veja os erros** na aba Console
3. **Verifique** se a URL está correta
4. **Teste** a URL do Railway diretamente no navegador

---

## 📞 Comandos Úteis

Para testar a API do Railway:
```bash
curl https://sua-url.up.railway.app/api/create-payment
```

Deve retornar erro 400 (normal, faltam dados).

---

**Boa sorte! 🎉**
