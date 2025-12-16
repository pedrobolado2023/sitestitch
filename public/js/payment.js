// Payment handling for Q-AURA
const API_URL = window.location.origin;

// Modal de Pagamento Pix
function showPixModal(paymentData) {
    const modal = document.getElementById('pixModal');
    if (!modal) {
        createPixModal();
    }

    // Atualizar dados do modal
    document.getElementById('qrCodeImage').src = `data:image/png;base64,${paymentData.qr_code_base64}`;
    document.getElementById('pixCode').value = paymentData.qr_code;
    document.getElementById('paymentAmount').textContent = `R$ ${paymentData.amount.toFixed(2)}`;

    // Mostrar modal
    document.getElementById('pixModal').classList.remove('hidden');
    document.getElementById('pixModal').classList.add('flex');

    // Iniciar verificação de pagamento
    startPaymentVerification(paymentData.payment_id);
}

// Criar modal de pagamento Pix
function createPixModal() {
    const modalHTML = `
        <div id="pixModal" class="hidden fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <div class="relative w-full max-w-[900px] overflow-hidden rounded-2xl bg-white dark:bg-[#1c2725] border border-gray-200 dark:border-white/10 shadow-2xl flex flex-col md:flex-row">
                <!-- Close Button -->
                <button onclick="closePixModal()" class="absolute top-4 right-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[20px]">close</span>
                </button>
                
                <!-- Left Column: QR Code -->
                <div class="flex flex-col items-center justify-center bg-gray-50 dark:bg-black/20 p-8 md:w-5/12 border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/5">
                    <h3 class="text-2xl font-bold mb-6 text-center">Pague com Pix</h3>
                    
                    <!-- QR Code -->
                    <div class="relative group cursor-pointer mb-6">
                        <div class="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg"></div>
                        <div class="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg"></div>
                        <div class="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg"></div>
                        <div class="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg"></div>
                        
                        <div class="h-64 w-64 bg-white p-4 rounded-lg shadow-2xl overflow-hidden">
                            <img id="qrCodeImage" src="" alt="QR Code Pix" class="w-full h-full object-contain"/>
                        </div>
                    </div>
                    
                    <p class="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">Escaneie o QR Code com o app do seu banco</p>
                    
                    <!-- Timer -->
                    <div class="flex gap-3 mb-4">
                        <div class="flex flex-col items-center">
                            <div class="flex h-10 w-10 items-center justify-center rounded bg-gray-200 dark:bg-gray-800">
                                <span id="timerMinutes" class="text-primary font-mono text-lg font-bold">14</span>
                            </div>
                            <span class="text-[10px] uppercase text-gray-500 mt-1">Min</span>
                        </div>
                        <span class="text-gray-400 text-xl font-bold mt-1">:</span>
                        <div class="flex flex-col items-center">
                            <div class="flex h-10 w-10 items-center justify-center rounded bg-gray-200 dark:bg-gray-800">
                                <span id="timerSeconds" class="text-gray-900 dark:text-white font-mono text-lg font-bold">59</span>
                            </div>
                            <span class="text-[10px] uppercase text-gray-500 mt-1">Seg</span>
                        </div>
                    </div>
                </div>
                
                <!-- Right Column: Instructions -->
                <div class="flex flex-col p-8 md:w-7/12">
                    <h3 class="text-2xl font-bold mb-2">Valor: <span id="paymentAmount" class="text-primary">R$ 0,00</span></h3>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-6">Acesso instantâneo após confirmação</p>
                    
                    <!-- Pix Code Input -->
                    <div class="mb-6">
                        <label class="block text-sm font-medium mb-2">Pix Copia e Cola</label>
                        <div class="flex gap-2">
                            <input id="pixCode" type="text" readonly class="flex-1 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 text-sm font-mono" value=""/>
                            <button onclick="copyPixCode()" class="h-12 px-6 rounded-lg bg-primary hover:bg-yellow-300 text-black font-bold text-sm transition-all flex items-center gap-2">
                                <span class="material-symbols-outlined text-[18px]">content_copy</span>
                                Copiar
                            </button>
                        </div>
                    </div>
                    
                    <!-- Instructions -->
                    <div class="flex flex-col gap-3">
                        <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Como pagar</p>
                        
                        <div class="flex gap-4 p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5">
                            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-black">
                                <span class="material-symbols-outlined">smartphone</span>
                            </div>
                            <div>
                                <p class="text-sm font-medium">1. Abra o app do seu banco</p>
                                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Procure pela seção Pix</p>
                            </div>
                        </div>
                        
                        <div class="flex gap-4 p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5">
                            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-black">
                                <span class="material-symbols-outlined">qr_code_scanner</span>
                            </div>
                            <div>
                                <p class="text-sm font-medium">2. Escaneie o QR Code ou cole o código</p>
                                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Use a opção "Pix Copia e Cola"</p>
                            </div>
                        </div>
                        
                        <div class="flex gap-4 p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5">
                            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-black">
                                <span class="material-symbols-outlined">check_circle</span>
                            </div>
                            <div>
                                <p class="text-sm font-medium">3. Confirme o pagamento</p>
                                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Acesso liberado automaticamente</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Status -->
                    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-white/5 flex items-center gap-3">
                        <div class="relative flex h-3 w-3">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </div>
                        <p id="paymentStatus" class="text-sm text-gray-600 dark:text-gray-300">Aguardando pagamento...</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Fechar modal
function closePixModal() {
    const modal = document.getElementById('pixModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');

    // Parar verificação de pagamento
    if (window.paymentCheckInterval) {
        clearInterval(window.paymentCheckInterval);
    }
}

// Copiar código Pix
function copyPixCode() {
    const pixCode = document.getElementById('pixCode');
    pixCode.select();
    document.execCommand('copy');

    // Feedback visual
    const button = event.target.closest('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="material-symbols-outlined text-[18px]">check</span> Copiado!';

    setTimeout(() => {
        button.innerHTML = originalText;
    }, 2000);
}

// Verificar status do pagamento
function startPaymentVerification(paymentId) {
    let checkCount = 0;
    const maxChecks = 60; // 5 minutos (5 segundos * 60)

    window.paymentCheckInterval = setInterval(async () => {
        checkCount++;

        if (checkCount >= maxChecks) {
            clearInterval(window.paymentCheckInterval);
            document.getElementById('paymentStatus').textContent = 'Tempo expirado. Tente novamente.';
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/payment-status/${paymentId}`);
            const data = await response.json();

            if (data.status === 'approved') {
                clearInterval(window.paymentCheckInterval);
                document.getElementById('paymentStatus').innerHTML = '<span class="text-green-600 font-bold">✅ Pagamento confirmado!</span>';

                // Redirecionar para página de confirmação após 2 segundos
                setTimeout(() => {
                    window.location.href = '/confirmacao.html';
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao verificar pagamento:', error);
        }
    }, 5000); // Verificar a cada 5 segundos
}

// Timer countdown
function startTimer(minutes = 15) {
    let totalSeconds = minutes * 60;

    const timerInterval = setInterval(() => {
        totalSeconds--;

        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;

        document.getElementById('timerMinutes').textContent = mins.toString().padStart(2, '0');
        document.getElementById('timerSeconds').textContent = secs.toString().padStart(2, '0');

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            closePixModal();
        }
    }, 1000);
}

// Processar formulário de cadastro
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

    // Validação
    if (!data.name || !data.email || !data.phone) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Mostrar loading
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
            // Mostrar modal de pagamento
            showPixModal(result);
            startTimer(15);
        } else {
            alert('Erro ao processar pagamento: ' + (result.error || 'Erro desconhecido'));
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', processPayment);
    }
});
