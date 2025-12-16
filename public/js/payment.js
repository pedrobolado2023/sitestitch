// Payment handling for Q-AURA - Checkout Pro (Cartão de Crédito e Pix)
const API_URL = window.location.origin;

async function processPayment(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        plan: formData.get('plan'),
        amount: parseFloat(formData.get('amount'))
    };

    if (!data.name || !data.email || !data.phone) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span> Processando...';

    try {
        const response = await fetch(`${API_URL}/api/create-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            // Redirecionar para o Checkout Pro do Mercado Pago
            // O usuário poderá escolher entre cartão de crédito, Pix e outros métodos
            window.location.href = result.init_point;
        } else {
            alert('Erro ao processar pagamento: ' + (result.error || 'Erro desconhecido'));
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao processar pagamento. Verifique se o servidor está rodando (npm start).');
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
}

function updateAmount() {
    const select = document.getElementById('planSelect');
    const selectedOption = select.options[select.selectedIndex];
    const amount = selectedOption.getAttribute('data-amount');

    document.getElementById('amountInput').value = amount;
    document.getElementById('displayAmount').textContent = `R$ ${parseFloat(amount).toFixed(2).replace('.', ',')}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', processPayment);
    }
});
