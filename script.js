// script.js

// Mock de alimentos (exemplo sem imagens)
const alimentosMock = [
    {
        id: 1,
        nome: 'Pão integral (próximo ao vencimento)',
        doador: 'Padaria Pão Quente',
        local: 'Centro',
        validade: '2025-03-25'
    },
    {
        id: 2,
        nome: 'Frutas diversas (banana, maçã)',
        doador: 'Mercado Frutal',
        local: 'Zona Sul',
        validade: '2025-03-22'
    },
    {
        id: 3,
        nome: 'Leite longa vida (lote próximo)',
        doador: 'Laticínios Vale Verde',
        local: 'Zona Norte',
        validade: '2025-04-01'
    }
];

// Função para exibir alimentos (combina mock + cadastrados) sem imagens
function carregarAlimentos() {
    const container = document.getElementById('lista-alimentos');
    if (!container) return;

    container.innerHTML = '';

    const alimentosCadastrados = JSON.parse(localStorage.getItem('foodloop_alimentos')) || [];
    const todosAlimentos = [...alimentosMock, ...alimentosCadastrados];

    if (todosAlimentos.length === 0) {
        container.innerHTML = '<p style="text-align:center;">Nenhum alimento disponível no momento.</p>';
        return;
    }

    todosAlimentos.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-alimento';
        // Sem a tag de imagem
        card.innerHTML = `
            <div class="info">
                <h3>${item.nome}</h3>
                <p><strong>Doador:</strong> ${item.doador}</p>
                <p><strong>Local:</strong> ${item.local}</p>
                <p class="validade"><strong>Validade:</strong> ${new Date(item.validade).toLocaleDateString('pt-BR')}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Função para exibir saudação e link condicional no cabeçalho (agora para doador)
function exibirSaudacao() {
    const userArea = document.getElementById('user-area');
    if (!userArea) return;

    const nomeUsuario = localStorage.getItem('foodloop_user');
    const tipoUsuario = localStorage.getItem('foodloop_user_tipo');

    if (nomeUsuario) {
        let html = `<span class="saudacao">Olá, ${nomeUsuario}!</span>`;

        // Se for DOADOR, adiciona link para cadastrar alimento
        if (tipoUsuario === 'doador') {
            html += `<a href="cadastro-alimento.html" class="link-doador">Cadastrar Alimentos</a>`;
        }

        // Botão de logout
        html += `<a href="#" id="logout" style="margin-left:1rem; color:#F97316;">Sair</a>`;

        userArea.innerHTML = html;

        document.getElementById('logout')?.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('foodloop_user');
            localStorage.removeItem('foodloop_user_tipo');
            window.location.reload();
        });
    } else {
        userArea.innerHTML = '<a href="cadastro.html" class="btn-cadastro" id="btn-cadastro">Cadastre-se</a>';
    }
}

// Função de busca (simulação de IA) sem imagens
function setupBusca() {
    const btnBusca = document.getElementById('btn-busca');
    if (!btnBusca) return;

    btnBusca.addEventListener('click', function() {
        const termo = document.getElementById('busca').value.toLowerCase().trim();
        const resultadosDiv = document.getElementById('resultados-busca');
        if (termo === '') {
            resultadosDiv.innerHTML = '<p style="color:#F97316;">Digite algo para buscar.</p>';
            return;
        }

        const alimentosCadastrados = JSON.parse(localStorage.getItem('foodloop_alimentos')) || [];
        const todosAlimentos = [...alimentosMock, ...alimentosCadastrados];

        const resultados = todosAlimentos.filter(item =>
            item.nome.toLowerCase().includes(termo) ||
            item.doador.toLowerCase().includes(termo)
        );

        if (resultados.length === 0) {
            resultadosDiv.innerHTML = '<p>Nenhum alimento encontrado. Tente outro termo.</p>';
        } else {
            let html = '<h3>Resultados da busca com IA:</h3><div class="grid-alimentos">';
            resultados.forEach(item => {
                html += `
                    <div class="card-alimento">
                        <div class="info">
                            <h3>${item.nome}</h3>
                            <p><strong>Doador:</strong> ${item.doador}</p>
                            <p><strong>Local:</strong> ${item.local}</p>
                            <p class="validade"><strong>Validade:</strong> ${new Date(item.validade).toLocaleDateString('pt-BR')}</p>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            resultadosDiv.innerHTML = html;
        }
    });
}

// Inicializa busca quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    setupBusca();
});
