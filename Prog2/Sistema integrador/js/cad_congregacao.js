
document.getElementById("form-cadastro").onsubmit = validaCadastro;

var contErros = 0;

function mostraErro(idErro, mensagem){
	idErro.style.display = "block";
	idErro.innerHTML = mensagem;
	contErros++;
}

function ocultaErro(idErro){
	idErro.style.display = "none";
}

function validaCadastro(){

	contErros = 0;
 /*
	// validação do campo nome
	campo = document.getElementById("nome");
	erro = document.getElementById("msg-nome")
	if(campo.value == "")
		mostraErro(erro, "Por favor digite o Nome");		
	else
		ocultaErro(erro);*/
	
	
	// validação do campo cnpj
	campo = document.getElementById("cnpj");
	erro = document.getElementById("msg-cnpj")
	if(!validarCNPJ(campo.value))
		mostraErro(erro, "CNPJ inválido");		
	else
		ocultaErro(erro);

	/*
		// validação do campo endereco
	campo = document.getElementById("endereco");
	erro = document.getElementById("msg-endereco");
	if(campo.value == "")
		mostraErro(erro, "Por favor digite o Endereço completo");
	else
		ocultaErro(erro);
		
	// validação do campo bairro
	campo = document.getElementById("bairro");
	erro = document.getElementById("msg-bairro");
	if(campo.value == "")
		mostraErro(erro, "Por favor digite o Bairro completo");
	else
		ocultaErro(erro);
	
	// validação do campo cidade
	campo = document.getElementById("cidade");
	erro = document.getElementById("msg-cidade");
	if(campo.value == "")
		mostraErro(erro, "Por favor digite a Cidade completa");
	else
		ocultaErro(erro); */
	
	// validação do campo estado
	campo = document.getElementById("estado");
	erro = document.getElementById("msg-estado");
	if(campo.value == "")
		mostraErro(erro, "Por favor selecione um Estado");
	else
		ocultaErro(erro);

	// validação do campo email
	campo = document.getElementById("email");
	erro = document.getElementById("msg-email");
	if((campo.value == "") || (campo.value.indexOf("@") == -1))
		mostraErro(erro, "Por favor digite o E-mail");		
	else
		ocultaErro(erro);

	/*
		// validação do campo telefone
	campo = document.getElementById("telefone");
	erro = document.getElementById("msg-telefone");
	if(campo.value == "")
		mostraErro(erro, "Por favor digite o Telefone");
	else
		ocultaErro(erro);	*/

	if(contErros > 0)
		return false;
	else
		alert("Cadastro realizado com sucesso"); // será removido futuramente
}

function validarCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}