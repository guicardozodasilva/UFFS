var formCadastro = document.getElementById("form-cadastro");
formCadastro.onsubmit = validaCadastro;

var contErros = 0;

function mostraErro(idErro, mensagem) {
  var erroElement = document.getElementById(idErro);
  if (erroElement.classList.contains('msg-erro')) {
    erroElement.classList.add('block');
    erroElement.classList.remove('msg-erro');
    erroElement.innerHTML = mensagem;
    contErros++;
  }
}

function ocultaErro(idErro) {
  var erroElement = document.getElementById(idErro);
  if (erroElement.classList.contains('block')) {
    erroElement.classList.add('msg-erro');
    erroElement.classList.remove('block');
  }
}

function validaCadastro(event) {
  event.preventDefault();
	contErros = 0;

	campo = document.getElementById("cnpj");
	if (!validarCNPJ(campo.value)) {
    mostraErro("msg-cnpj", "CNPJ inválido");
  } else {
    ocultaErro("msg-cnpj");
  }

	campo = document.getElementById("uf");
	if (campo.value == "") {
    mostraErro("msg-uf", "Por favor selecione um Estado");
  } else {
		ocultaErro("msg-uf");
  }

	campo = document.getElementById("email");
	if ((campo.value == "") || (campo.value.indexOf("@") == -1)) {
		mostraErro("msg-email", "Por favor digite o E-mail");
  } else {
    ocultaErro("msg-email");
  }

  if (contErros > 0) return false;

  formCadastro.submit();
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
