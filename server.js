const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Configure Mercado Pago
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN || 'SEU_ACCESS_TOKEN_AQUI'
});

// Rota para criar pagamento Pix
app.post('/api/create-payment', async (req, res) => {
    try {
        const { name, email, phone, plan, amount } = req.body;

        // Validação básica
        if (!name || !email || !phone || !plan || !amount) {
            return res.status(400).json({ 
                error: 'Dados incompletos. Preencha todos os campos.' 
            });
        }

        // Criar preferência de pagamento
        const payment_data = {
            transaction_amount: parseFloat(amount),
            description: `Q-AURA - ${plan}`,
            payment_method_id: 'pix',
            payer: {
                email: email,
                first_name: name.split(' ')[0],
                last_name: name.split(' ').slice(1).join(' ') || name.split(' ')[0],
                identification: {
                    type: 'CPF',
                    number: '00000000000' // Você pode adicionar campo CPF no formulário
                },
                address: {
                    zip_code: '00000000',
                    street_name: 'N/A',
                    street_number: 0,
                    neighborhood: 'N/A',
                    city: 'N/A',
                    federal_unit: 'SP'
                }
            },
            notification_url: `${req.protocol}://${req.get('host')}/api/webhook`,
            metadata: {
                phone: phone,
                plan: plan
            }
        };

        // Criar pagamento
        const payment = await mercadopago.payment.create(payment_data);

        // Retornar dados do pagamento
        res.json({
            success: true,
            payment_id: payment.body.id,
            status: payment.body.status,
            qr_code: payment.body.point_of_interaction.transaction_data.qr_code,
            qr_code_base64: payment.body.point_of_interaction.transaction_data.qr_code_base64,
            ticket_url: payment.body.point_of_interaction.transaction_data.ticket_url,
            amount: payment.body.transaction_amount
        });

    } catch (error) {
        console.error('Erro ao criar pagamento:', error);
        res.status(500).json({ 
            error: 'Erro ao processar pagamento',
            details: error.message 
        });
    }
});

// Rota para verificar status do pagamento
app.get('/api/payment-status/:payment_id', async (req, res) => {
    try {
        const { payment_id } = req.params;
        
        const payment = await mercadopago.payment.get(payment_id);
        
        res.json({
            status: payment.body.status,
            status_detail: payment.body.status_detail,
            payment_id: payment.body.id
        });

    } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
        res.status(500).json({ 
            error: 'Erro ao verificar status',
            details: error.message 
        });
    }
});

// Webhook para notificações do Mercado Pago
app.post('/api/webhook', async (req, res) => {
    try {
        const { type, data } = req.body;

        if (type === 'payment') {
            const payment = await mercadopago.payment.get(data.id);
            
            console.log('Pagamento atualizado:', {
                id: payment.body.id,
                status: payment.body.status,
                email: payment.body.payer.email
            });

            // Aqui você pode:
            // 1. Atualizar banco de dados
            // 2. Enviar email de confirmação
            // 3. Ativar acesso ao WhatsApp Bot
            // 4. Etc.

            if (payment.body.status === 'approved') {
                console.log('✅ Pagamento aprovado!');
                // Implementar lógica de aprovação
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
});
