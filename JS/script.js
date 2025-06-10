// Login Simples
function fazerLogin() {
    const user = document.getElementById('usuario').value;
    const pass = document.getElementById('senha').value;
    if (user && pass) {
        document.getElementById('login').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        carregarProdutos();
        carregarCarrinho();
    } else {
        alert('Informe usuário e senha!');
    }
}

// Carregar produtos do catálogo
async function carregarProdutos() {
    const res = await fetch('https://fakestoreapi.com/products');
    const produtos = await res.json();
    const container = document.getElementById('produtos');
    container.innerHTML = '';

    produtos.forEach(produto => {
        const div = document.createElement('div');
        div.className = 'produto';
        div.innerHTML = `
      <img src="${produto.image}" alt="${produto.title}">
      <p><strong>${produto.title}</strong></p>
      <p>R$ ${produto.price.toFixed(2)}</p>
      <button class="btn">Adicionar</button>
    `;

        // Botão com Event Listener (sem risco de erro)
        const botao = div.querySelector('button');
        botao.addEventListener('click', () => {
            adicionarAoCarrinho(produto.id, produto.title, produto.price);
        });

        container.appendChild(div);
    });
}


// Carrinho com localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function adicionarAoCarrinho(id, nome, preco) {
    carrinho.push({ id, nome, preco });
    salvarCarrinho();
    carregarCarrinho();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    carregarCarrinho();
}

function carregarCarrinho() {
    const container = document.getElementById('itens-carrinho');
    container.innerHTML = '';
    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.preco;
        const div = document.createElement('div');
        div.className = 'carrinho-item';
        div.innerHTML = `
          <p>${item.nome}</p>
          <p>R$ ${item.preco.toFixed(2)}</p>
          <button class="btn" onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        container.appendChild(div);
    });
    document.getElementById('total').innerText = total.toFixed(2);
}

// Finalizar compra
function finalizarCompra() {
    document.getElementById('app').classList.add('hidden');
    document.getElementById('checkout').classList.remove('hidden');
}

function confirmarCompra() {
    alert('Compra confirmada! Obrigado.');
    carrinho = [];
    salvarCarrinho();
    location.reload(); // Reinicia
}