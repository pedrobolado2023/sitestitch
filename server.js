const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Configure Mercado Pago
const accessToken = process.env.MP_ACCESS_TOKEN;
if (accessToken) {
    mercadopago.configure({
        access_token: accessToken
    });
    console.log('✅ Mercado Pago configurado com sucesso');
} else {
    console.warn('⚠️ MP_ACCESS_TOKEN não configurado no .env');
}

// Rota para criar preferência de pagamento (Checkout Pro - aceita cartão e Pix)
app.post('/api/create-payment', async (req, res) => {
    try {
        const { name, email, phone, plan, amount } = req.body;

        // Validação básica
        if (!name || !email || !phone || !plan || !amount) {
            return res.status(400).json({
                error: 'Dados incompletos. Preencha todos os campos.'
            });
        }

        // Criar preferência de pagamento (Checkout Pro)
        const preference = {
            items: [
                {
                    title: `Q-AURA - ${plan}`,
                    description: 'Acesso ao bot de estudos via WhatsApp com IA',
                    quantity: 1,
                    unit_price: parseFloat(amount),
                    currency_id: 'BRL'
                }
            ],
            payer: {
                name: name,
                email: email,
                phone: {
                    number: phone.replace(/\D/g, '')
                }
            },
            back_urls: {
                success: `${req.protocol}://${req.get('host')}/success`,
                failure: `${req.protocol}://${req.get('host')}/failure`,
                pending: `${req.protocol}://${req.get('host')}/pending`
            },
            auto_return: 'approved',
            notification_url: `${req.protocol}://${req.get('host')}/api/webhook`,
            statement_descriptor: 'Q-AURA',
            external_reference: `${plan}-${Date.now()}`,
            metadata: {
                phone: phone,
                plan: plan,
                name: name
            }
        };

        console.log('📝 Criando preferência de pagamento para:', name);

        // Criar preferência
        const response = await mercadopago.preferences.create(preference);

        console.log('✅ Preferência criada com sucesso:', response.body.id);

        // Retornar dados da preferência
        res.json({
            success: true,
            preference_id: response.body.id,
            init_point: response.body.init_point,
            sandbox_init_point: response.body.sandbox_init_point
        });

    } catch (error) {
        console.error('❌ Erro ao criar preferência:', error);
        console.error('Detalhes:', error.message);
        res.status(500).json({
            error: 'Erro ao processar pagamento',
            details: error.message
        });
    }
});

// Rota de sucesso
app.get('/success', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pagamento Aprovado - Q-AURA</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                }
                .container {
                    background: white;
                    padding: 3rem;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    text-align: center;
                    max-width: 500px;
                }
                .success-icon {
                    font-size: 80px;
                    color: #10b981;
                    margin-bottom: 1rem;
                }
                h1 {
                    color: #1f2937;
                    margin-bottom: 1rem;
                }
                p {
                    color: #6b7280;
                    line-height: 1.6;
                }
                .btn {
                    display: inline-block;
                    margin-top: 2rem;
                    padding: 1rem 2rem;
                    background: #f9f506;
                    color: black;
                    text-decoration: none;
                    border-radius: 50px;
                    font-weight: bold;
                    transition: transform 0.2s;
                }
                .btn:hover {
                    transform: scale(1.05);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="success-icon">✅</div>
                <h1>Pagamento Aprovado!</h1>
                <p>Seu pagamento foi processado com sucesso. Em breve você receberá as instruções de acesso ao Q-AURA no WhatsApp cadastrado.</p>
                <p><strong>Bem-vindo à Q-AURA!</strong></p>
                <a href="/" class="btn">Voltar ao Início</a>
            </div>
        </body>
        </html>
    `);
});

// Rota de falha
app.get('/failure', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pagamento Não Aprovado - Q-AURA</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                }
                .container {
                    background: white;
                    padding: 3rem;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    text-align: center;
                    max-width: 500px;
                }
                .error-icon {
                    font-size: 80px;
                    color: #ef4444;
                    margin-bottom: 1rem;
                }
                h1 {
                    color: #1f2937;
                    margin-bottom: 1rem;
                }
                p {
                    color: #6b7280;
                    line-height: 1.6;
                }
                .btn {
                    display: inline-block;
                    margin-top: 2rem;
                    padding: 1rem 2rem;
                    background: #f9f506;
                    color: black;
                    text-decoration: none;
                    border-radius: 50px;
                    font-weight: bold;
                    transition: transform 0.2s;
                }
                .btn:hover {
                    transform: scale(1.05);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="error-icon">❌</div>
                <h1>Pagamento Não Aprovado</h1>
                <p>Infelizmente não conseguimos processar seu pagamento. Por favor, verifique seus dados e tente novamente.</p>
                <a href="/" class="btn">Tentar Novamente</a>
            </div>
        </body>
        </html>
    `);
});

// Rota pendente
app.get('/pending', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pagamento Pendente - Q-AURA</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                }
                .container {
                    background: white;
                    padding: 3rem;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    text-align: center;
                    max-width: 500px;
                }
                .pending-icon {
                    font-size: 80px;
                    color: #f59e0b;
                    margin-bottom: 1rem;
                }
                h1 {
                    color: #1f2937;
                    margin-bottom: 1rem;
                }
                p {
                    color: #6b7280;
                    line-height: 1.6;
                }
                .btn {
                    display: inline-block;
                    margin-top: 2rem;
                    padding: 1rem 2rem;
                    background: #f9f506;
                    color: black;
                    text-decoration: none;
                    border-radius: 50px;
                    font-weight: bold;
                    transition: transform 0.2s;
                }
                .btn:hover {
                    transform: scale(1.05);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="pending-icon">⏳</div>
                <h1>Pagamento Pendente</h1>
                <p>Seu pagamento está sendo processado. Você receberá uma confirmação em breve no e-mail cadastrado.</p>
                <a href="/" class="btn">Voltar ao Início</a>
            </div>
        </body>
        </html>
    `);
});

// Webhook para notificações do Mercado Pago
app.post('/api/webhook', async (req, res) => {
    try {
        const { type, data } = req.body;

        console.log('📬 Webhook recebido:', type);

        if (type === 'payment') {
            const payment = await mercadopago.payment.get(data.id);

            console.log('💳 Pagamento atualizado:', {
                id: payment.body.id,
                status: payment.body.status,
                email: payment.body.payer.email
            });

            if (payment.body.status === 'approved') {
                console.log('✅ Pagamento aprovado!');
                // Aqui você pode:
                // 1. Salvar no banco de dados
                // 2. Enviar email de confirmação
                // 3. Ativar acesso ao WhatsApp Bot
                // 4. Etc.
            }
        }

        res.status(200).send('OK');

    } catch (error) {
        console.error('Erro no webhook:', error);
        res.status(500).send('Error');
    }
});

// Servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📱 Acesse o site Q-AURA em http://localhost:${PORT}`);
    console.log(`💳 Pagamento configurado: Cartão de Crédito e Pix via Checkout Pro`);
});
