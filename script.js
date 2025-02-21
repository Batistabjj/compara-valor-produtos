// Função para buscar produtos na API do Mercado Livre
async function buscarProdutos(termoDeBusca) {
    try {
        // Faz a requisição para a API do Mercado Livre usando o termo de busca passado
        const resposta = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${termoDeBusca}`);
        
        // Converte a resposta da API em formato JSON
        const dados = await resposta.json();
        
        // Chama a função exibirProdutos passando os resultados da API
        exibirProdutos(dados.results);
    } catch (erro) {
        // Caso ocorra algum erro na requisição, exibe no console
        console.error("Erro ao buscar produtos:", erro);
    }
}

// Função para exibir os produtos na tela
function exibirProdutos(produtos) {
    // Pega o elemento HTML onde os produtos serão exibidos
    const container = document.getElementById("resultado"); // Alterado para "resultado"
    
    // Limpa os resultados anteriores de produtos, caso haja
    container.innerHTML = "";

    // Itera pelos produtos recebidos e exibe no máximo 5 produtos
    produtos.slice(0, 50).forEach(produto => { 
        // Cria um novo elemento "div" para cada produto
        const item = document.createElement("div");
        
        // Adiciona uma classe CSS "produto" para estilizar cada item
        item.classList.add("produto");
        
        // Insere o HTML dentro da div do produto com as informações
        item.innerHTML = `
            <img src="${produto.thumbnail}" alt="${produto.title}"> <!-- Exibe a imagem do produto -->
            <h3>${produto.title}</h3> <!-- Exibe o título do produto -->
            <p>Preço: ${formatarPreco(produto.price)}</p> <!-- Exibe o preço formatado do produto -->
        `;
        
        // Adiciona a div do produto ao container
        container.appendChild(item);
    });
}

// Função para formatar o preço no padrão brasileiro
function formatarPreco(preco) {
    // Formata o preço para o formato monetário em reais (BRL)
    return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Evento para buscar produtos ao clicar no botão
document.getElementById("buscar").addEventListener("click", () => {
    // Pega o valor inserido no campo de pesquisa
    const termo = document.getElementById("search").value; // Alterado para "search"
    
    // Chama a função para buscar os produtos com o termo inserido
    buscarProdutos(termo);
});
