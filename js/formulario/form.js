

// ============= ROTAS DE PAGINA ================= // 
function chamaFormulario(pagina) {

    stadoLoaging(true);

    setTimeout(()=>{

        if (pagina === 'index.html') {
           history.go(-1);
            // window.location.href = "Sistema_Cadastro_Produtos/index.html";
        }
        window.location.href = "./page/formulario.html";

        stadoLoaging(false);
    }, 2000 );

};


function chamaHome() {
    stadoLoaging(true)

    setTimeout(()=>{
        window.history.back(); //  = "index.html";

        stadoLoaging(false);
    } , 2000);
    
};


// ================================ OPERACOES CRUD =================================== // 

let itemParaRemover = 0;


// adiciona dados na tabela
function adicionaItem() {

    stadoLoaging(true);

    // pega os dados do formulario
    const {name, preco, statusVenda} = document.querySelector("#formProdutos");


    const fields = [];

    // pega os campos
    fields.push(name.value)
    fields.push(preco.value)
    fields.push(statusVenda.value);

    // verifica campos
    const camposVazios = ValidaCamposVazios(fields);

    if (camposVazios.length > 0) {
        let erros = document.getElementById("erroCampos");
         erros.innerHTML = `
         <div class="col-md-12">
            <div class="alertaCampos"  role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>
                <span class="glyphicon glyphicon-remove"></span>  
                Tem campos sem preenchimentos !!! 
                </strong>
           </div>
         </div>   
         `;

         stadoLoaging(false);
        return;
    };

    // monta o objeto a ser enviado
    const item = {
        id: Math.floor(Math.random() * 65536),
        nome: name.value,
        preco: formatarDinheiro(parseFloat(preco.value)),
        status: statusVenda.value == 1 ? 'VENDIDO': 'PENDENTE'
    };

    // lista de itens
    let listaItens = [];

    // verifica se existe a lista no localStorage
    if (localStorage.getItem('listaItens')) {
        listaItens = JSON.parse(localStorage.getItem('listaItens'));
        listaItens.push(item);
        localStorage.setItem('listaItens', JSON.stringify(listaItens));
    } else {
        listaItens.push(item);
        localStorage.setItem('listaItens', JSON.stringify(listaItens));
    } ;
    limpaForm();
    stadoLoaging(false);
    chamaHome();
   
};

// atualiza tabela de Itens
function AtualizaTabelaItens() {

    stadoLoaging(true);

    // tabela de dados
    let tabelaItens = document.querySelector("#conteudoTabela");
    let listaItens;
    let itens = '';

    if (localStorage.getItem('listaItens')) {
        listaItens = JSON.parse(localStorage.getItem('listaItens'));

        for (let c = 0; c < listaItens.length; c++) {

            const Id = listaItens[c].id;
            itens += 
            `<tr>
                <th scope="row">${ Id }</th>
                    <td>${ listaItens[c].nome }</td>
                    <td>${ listaItens[c].preco }</td>
                    <td>${ listaItens[c].status }</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-md" >
                            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 
                            Editar
                        </button>
                        <button type="button" class="btn btn-danger btn-md" data-dismiss="modal"
                            data-toggle="modal" data-target="#modalExcluir" 
                            onclick="removePorId(${Id})"
                            >
                            <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            Excluir
                        </button>
                    </td>
            </tr>`
        };
      
    };
    // monta a tabela e o html
    tabelaItens.innerHTML = itens.length > 0 ? itens : 'Nenhum produto para mostrar';

    stadoLoaging(false);
};

// remover item por Id
function removePorId(id){

    stadoLoaging(true);
    // monta o elemento e 
    let button = document.createElement('button');
    button.setAttribute('type','button');
    button.setAttribute('id','removeItem');
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#modalSalvar');
    button.style = "display:none";

    let simulaClick = document.getElementById('removeItemClick');
    simulaClick.appendChild(button);


    itemParaRemover = id;
    // simula o click
    button.click();

};

// depois de confirmado para remover
function confirmaRemocao(){

    const list = JSON.parse(localStorage.getItem('listaItens'));
    const item = list.find((itemFind) => itemFind.id === itemParaRemover );
    
    // caso nao tenha retorna 
    if(!item){
        alert("Nenhum item encontrado");

        stadoLoaging(false);
        return ;
    };

    // filtra os dados da lista
    const newList = list.filter((subItem) => subItem.id !== itemParaRemover );
    localStorage.setItem('listaItens', JSON.stringify(newList));

    // atualiza os dados 
    AtualizaTabelaItens();
    stadoLoaging(false);
}

// limpa que iria ser feita
function limpaRemocao(){
    itemParaRemover = 0;
};

// limpa os dados do formulario
function limpaForm() {
    let produto = document.querySelector("#formProdutos");
    produto.name.value = "";
    produto.preco.value = "";
    produto.statusVenda.value = "";
}
