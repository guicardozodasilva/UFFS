document.getElementById("perfilP").onclick = function(){
    document.getElementById("empresa").disabled = false;
    document.getElementById("mensagem-empresa").innerHTML = "Entre em contato para estabelecer uma parceria";
};

document.getElementById("perfilC").onclick = function(){
    document.getElementById("empresa").value = "";
    document.getElementById("empresa").disabled = true;
    document.getElementById("mensagem-empresa").innerHTML = "";
};

