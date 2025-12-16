# 🚀 GUIA RÁPIDO - Como Iniciar o Site Q-AURA

## ⚠️ IMPORTANTE: O site precisa do servidor rodando para funcionar!

### Passo 1: Configure suas Credenciais do Mercado Pago

1. Abra o arquivo `.env` que você criou
2. Adicione seu Access Token do Mercado Pago:

```env
MP_ACCESS_TOKEN=SEU_ACCESS_TOKEN_AQUI
MP_PUBLIC_KEY=SUA_PUBLIC_KEY_AQUI
PORT=3000
```

**Onde pegar as credenciais:**
- Acesse: https://www.mercadopago.com.br/developers/panel/credentials
- Copie o **Access Token** (Production)
- Cole no arquivo `.env`

### Passo 2: Inicie o Servidor

Abra o terminal nesta pasta e execute:

```bash
npm start
```

Você verá:
```
🚀 Servidor rodando em http://localhost:3000
📱 Acesse o site Q-AURA em http://localhost:3000
```

### Passo 3: Acesse o Site

Abra seu navegador em: **http://localhost:3000**

---

## ❌ Erro que você viu

O erro "Erro ao processar pagamento: Erro ao processar BY CLIENT" acontece porque:

1. ❌ O servidor **NÃO está rodando**
2. ❌ O JavaScript tenta fazer requisição para `/api/create-payment`
3. ❌ Como não há servidor, a requisição falha

## ✅ Solução

Execute `npm start` no terminal e o erro será resolvido!

---

## 🔧 Comandos Úteis

```bash
# Instalar dependências (já feito)
npm install

# Iniciar servidor
npm start

# Parar servidor
Ctrl + C
```

---

## 📝 Fluxo Completo

1. Usuário preenche formulário
2. Clica em "Finalizar e Pagar com Pix"
3. **JavaScript faz POST para `/api/create-payment`** ← PRECISA DO SERVIDOR!
4. Servidor cria pagamento no Mercado Pago
5. Retorna QR Code e código Pix
6. Modal exibe para o usuário

**Sem o servidor rodando, o passo 3 falha!**

---

## 🆘 Precisa de Ajuda?

Se o servidor não iniciar, verifique:
- ✅ Node.js está instalado? (`node --version`)
- ✅ Dependências instaladas? (`npm install`)
- ✅ Arquivo `.env` configurado?
- ✅ Porta 3000 está livre?
