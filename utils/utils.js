

// valida campos vazios
function ValidaCamposVazios(lista) {

  const listaVazia = [];

  lista.forEach((item) => {
      if (!item) {
          listaVazia.push(item);
      }
  });
  return listaVazia;
};


// formata dinheiro
function formatarDinheiro(numero){
 
  // formato do País a utilizar
  var formato = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' };
  const numeroFormatado = numero.toLocaleString('pt-BR', formato);

  // retorna com o formato
  return numeroFormatado;
};


// funcao adiciona e remove o loading 
function stadoLoaging(statusLoader){

  const adicionarLoading = true; 

    if(statusLoader === adicionarLoading){
      document.getElementById("loader").style.display = "block";
      document.getElementById("fundoLoading").style.display = "block";
    } else {
      document.getElementById("loader").style.display = "none";
      document.getElementById("fundoLoading").style.display = "none";
    };

}

