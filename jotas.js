// Função para carregar produtos do localStorage e exibi-los na página
function carregarProdutos() {
    const listaProdutos = document.getElementById('listaProdutos');
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // Limpa a lista atual para evitar duplicações
    listaProdutos.innerHTML = '';

    // Adiciona cada produto à lista
    produtos.forEach((produto) => {
        const li = document.createElement('li');
        const imgTag = produto.imagem ? `<img src="${produto.imagem}" alt="${produto.nome}" style="width: 50px; height: 50px;">` : '';
        li.innerHTML = `
            ${imgTag}
            <span>${produto.nome}</span>
            <button onclick="removerProduto('${produto.nome}')">Remover</button>
            <button onclick="comprarProduto('${produto.nome}')">Comprar</button>
        `;
        listaProdutos.appendChild(li);
    });
}

// Função para adicionar um novo produto ao localStorage
function adicionarProduto() {
    const inputProduto = document.getElementById('produto');
    const inputImagem = document.getElementById('imagemUrl');
    const novoProduto = inputProduto.value.trim();
    const novaImagem = inputImagem.value.trim() || ""; // Deixa a imagem vazia se não for fornecida

    if (novoProduto) {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.push({ nome: novoProduto, imagem: novaImagem });
        localStorage.setItem('produtos', JSON.stringify(produtos));

        inputProduto.value = ''; // Limpa o campo de entrada do produto
        inputImagem.value = ''; // Limpa o campo de entrada da imagem
        esconderImagem(); // Esconde a imagem ao adicionar
        carregarProdutos(); // Atualiza a lista exibida
    }
}

// Função para mostrar a imagem a partir da URL inserida
function mostrarImagem() {
    const inputImagem = document.getElementById('imagemUrl');
    const preview = document.getElementById('preview');
    
    if (inputImagem.value) {
        preview.src = inputImagem.value; // Define a imagem do preview
        preview.style.display = 'block'; // Exibe a imagem
    } else {
        esconderImagem(); // Esconde a imagem se o campo estiver vazio
    }
}

// Função para esconder a imagem de pré-visualização
function esconderImagem() {
    const preview = document.getElementById('preview');
    preview.style.display = 'none'; // Esconde a imagem
}

// Função para remover um produto da lista e do localStorage
function removerProduto(nome) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos = produtos.filter(produto => produto.nome !== nome); // Remove o produto pelo nome
    localStorage.setItem('produtos', JSON.stringify(produtos));

    carregarProdutos(); // Atualiza a lista exibida
}

// Função para remover todos os produtos do localStorage e da lista
function removerTodosProdutos() {
    localStorage.removeItem('produtos'); // Remove todos os produtos do localStorage
    carregarProdutos(); // Atualiza a lista exibida para limpar
}

// Função para simular a compra de um produto
function comprarProduto(nome) {
    alert(`Você comprou: ${nome}`);
}

// Carrega a lista de produtos ao iniciar a página
window.onload = carregarProdutos;
