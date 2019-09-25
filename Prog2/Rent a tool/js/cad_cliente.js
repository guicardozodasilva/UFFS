document.getElementById("perfilP").onclick = function(){
    document.getElementById("empresa").disabled = false;
    document.getElementById("mensagem-empresa").innerHTML = "Entre em contato para estabelecer uma parceria";
};

document.getElementById("perfilC").onclick = function(){
    document.getElementById("empresa").value = "";
    document.getElementById("empresa").disabled = true;
    document.getElementById("mensagem-empresa").innerHTML = "";
};

document.getElementById("form-cadastro").onsubmit = validaCadastro;

var contErros = 0;

function mostraErro(idErro, mensagem) {
    idErro.style.display = "block";
    idErro.innerHTML = mensagem;
    contErros++;
}

function validaCadastro() {

    contErros = 0;

    // campo nome
    var campo = document.getElementById("nome");
    var erro = document.getElementById("msg-nome");
    if((campo.value == "") || (campo.value.indexOf(" ") == -1)) //verifica se o campo está em branco ou se não há espaço entre o que foi digitado (oq significa que não foi escrito o nome completo).  
            mostraErro(erro, "Por favor, digite o nome completo")
    else
        erro.style.display = "none";

    // campo email
    var campo = document.getElementById("email");
    var erro = document.getElementById("msg-email");
    if((campo.value == "") || (campo.value.indexOf("@") == -1)) 
            mostraErro(erro, "Por favor, digite o email")
    else
        erro.style.display = "none";

    // campo endereço
    var campo = document.getElementById("endereco");
    var erro = document.getElementById("msg-endereco");
    if((campo.value == "") || (campo.value.indexOf(" ") == -1)) 
            mostraErro(erro, "Por favor, digite o endereço")
    else
        erro.style.display = "none";

    // campo endereço
    var campo = document.getElementById("bairro");
    var erro = document.getElementById("msg-bairro");
    if(campo.value == "") 
            mostraErro(erro, "Por favor, selecione um bairro")
    else
        erro.style.display = "none";

    // campo perfil
    /* var campo = document.getElementById("perfil");
    var erro = document.getElementById("msg-perfil");
    if(campo.checked == false) 
            mostraErro(erro, "Por favor, selecione um perfil")
    else
        erro.style.display = "none";
    */
   
    // campo empresa
    var campo = document.getElementById("empresa");
    var erro = document.getElementById("msg-empresa");
    if((campo.disabled == false) && (campo.value == "")) 
            mostraErro(erro, "Por favor, digite a empresa")
    else
        erro.style.display = "none";

    // campo login
    var campo = document.getElementById("login2");
    var erro = document.getElementById("msg-login");
    if((campo.value == 0) || (campo.value.length < 6)) 
            mostraErro(erro, "Insira um login com pelo menos 6 caracteres")
    else
        erro.style.display = "none";

    // campo senha
    var campo = document.getElementById("senha");
    var erro = document.getElementById("msg-senha");
    if((campo.value == 0) || (campo.value.length < 6)) 
            mostraErro(erro, "Insira uma senha com pelo menos 6 caracteres")
    else
        erro.style.display = "none";

    // campo repita a senha
    var campo = document.getElementById("senha2");
    var anterior = document.getElementById("senha");
    var erro = document.getElementById("msg-senha2");
    if((campo.value != anterior.value))
        mostraErro(erro, "As senhas não coincidem, verifique")
    else
        erro.style.display = "none";

    // campo concordo
    var campo = document.getElementById("concordo");
    var erro = document.getElementById("msg-concordo");
    if((campo.checked == false))
        mostraErro(erro, "É necessário aceitar os termos de uso do site")
    else
        erro.style.display = "none";
        
    if(contErros > 0)
        return false;
    else 
        alert("Cadastro realizado com sucesso"); // será removido futuramente

}