var extrato = [];
if (localStorage.getItem("extrato")) {
  extrato = JSON.parse(localStorage.getItem("extrato"));
}



function extratoHTML() {
  var total = 0;
  let valorInput;
  let extrato = JSON.parse(localStorage.getItem("extrato"));
  let tabela = document.querySelector("#tabela tbody");
  
  document.querySelectorAll(".container-tabela-3").forEach((element) => {
    element.remove();
  });
  if (extrato.length === "") {
    document.getElementById("form-extrato").tabela.innerHTML = `
    <tr>
    <td class="nenhuma-transacao"> Nenhuma transação cadastrada</td>
    </tr>
    `
    console.log(extrato.length === "");
    }

  if  (extrato != null) {
    tabela.innerHTML = extrato.map((extrato) => {
      return (
      `
      <tr class="container-tabela-2">
        <td class="corpo-tabela simbolo">+</td>
        <td class="corpo-tabela">`+ extrato.nomeMercadoria + `</td>
        <td class="corpo-tabela">${formatterCurrency(Number(extrato.valorMercadoria))}</td>
      </tr>
      `
      )
    }).join("");


    for (i = 0; i < extrato.length; i++) {
      if (extrato[i].selecaoMercadoria == "compra") {
        document.getElementsByClassName("simbolo")[i].innerHTML = "-";
      } else {
        document.getElementsByClassName("simbolo")[i].innerHTML = "+";
      }
    }

    for (produto in extrato) {
      if (extrato[produto].selecaoMercadoria == "compra") {
        valorInput = extrato[produto];
        total -= Number(extrato[produto].valorMercadoria);
      } else {
        total += Number(extrato[produto].valorMercadoria);
      }
    }
     if (extrato.length > 0) {
      document.querySelector("#tabela tfoot").innerHTML = `
        <tr class="valor-total">
          <td>Total</td>
          <td>${formatter.format(total)}</td>
        </tr>
        `
        document.querySelector("#tabela tfoot").innerHTML += `
        <tr>
          <td class="status-tabela">${Math.sign(total) > 0 ? "[LUCRO]" : "[PREJUÍZO]"}</td>
        </tr>
        `
    }
  }
}


  function formatterCurrency(value) {
    const valueFormat = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return valueFormat;
  }

  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
  
  function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e){  
    var sep = 0;  
    var key = '';  
    var i = j = 0;  
    var len = len2 = 0;  
    var strCheck = '0123456789';  
    var aux = aux2 = '';  
    var whichCode = (window.Event) ? e.which : e.keyCode;  
    if (whichCode == 13 || whichCode == 8) return true;  
    key = String.fromCharCode(whichCode); // Valor para o código da Chave  
    if (strCheck.indexOf(key) == -1) return false; // Chave inválida  
    len = objTextBox.value.length;  
    for(i = 0; i < len; i++)  
        if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;  
    aux = '';  
    for(; i < len; i++)  
        if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);  
    aux += key;  
    len = aux.length;  
    if (len == 0) objTextBox.value = '';  
    if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;  
    if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;  
    if (len > 2) {  
        aux2 = '';  
        for (j = 0, i = len - 3; i >= 0; i--) {  
            if (j == 3) {  
                aux2 += SeparadorMilesimo;  
                j = 0;  
            }  
            aux2 += aux.charAt(i);  
            j++;  
        }  
        objTextBox.value = '';  
        len2 = aux2.length;  
        for (i = len2 - 1; i >= 0; i--)  
        objTextBox.value += aux2.charAt(i);  
        objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);  
    }  
    return false;  
  } 

  function deletaLocalStorage() {
    let mercadorias = document.querySelectorAll('.container-tabela-2')
    let totais = document.querySelectorAll('.valor-total')
    let status = document.querySelectorAll('.status-tabela')


    if (confirm("Deseja remover os dados da tabela?")) {

      mercadorias.forEach((element) => {
        element.remove();
      })

      totais.forEach((element) => {
        element.remove();
      })
      status.forEach((element) => {
        element.remove();
      })
      
      extrato = []
      localStorage.setItem('extrato', JSON.stringify(extrato))
      alert("Transações excluídas");
    }
    else{
      alert("Exclusões canceladas");
    }
    }

    let linkExcluir = document.getElementById("limpar");
    linkExcluir.addEventListener("click", deletaLocalStorage)
      

function validacao(event) {
  event.preventDefault();
  var operacao = document.getElementById("operacao").value;
  var mercadoriaFormulario = document.getElementById("mercadoria").value;
  var valorFormulario = document.getElementById("valor").value;


  
  if(mercadoriaFormulario == "") {
    alert("Preencha o nome da mercadoria");
    document.getElementById("mercadoria").focus();
    return false;
  }

  if(valorFormulario == "") {
    alert("Preencha o valor");
    document.getElementById("valor").focus();
    return false;
  }

  extrato.push(
    {
      "selecaoMercadoria": operacao,
      "nomeMercadoria": mercadoriaFormulario,
      "valorMercadoria": valorFormulario
      .replaceAll(".", "")
      .replaceAll(",", "."),
    }
  );

  let extratoString = JSON.stringify(extrato);
  localStorage.setItem("extrato", extratoString);
  extratoHTML();
  event.target.reset()
}

