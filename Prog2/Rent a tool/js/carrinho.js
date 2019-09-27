var totalProduto1, totalProduto2, totalProduto3, totalPagar;

/*---------------------------------------------------------- Ao carregar a página */

window.onload = function(){
    totalProduto1 = parseInt(document.getElementById("valorUnProduto1").innerHTML.substring(3)) * document.querySelector("#qntProduto1").value; 
    document.getElementById("totalProduto1").innerHTML = 'R$ ' + totalProduto1 + ',00'; 

    totalProduto2 = parseInt(document.getElementById("valorUnProduto2").innerHTML.substring(3)) * document.querySelector("#qntProduto2").value; 
    document.getElementById("totalProduto2").innerHTML =  'R$ ' + totalProduto2 + ',00'; 

    totalProduto3 = parseInt(document.getElementById("valorUnProduto3").innerHTML.substring(3)) * document.querySelector("#qntProduto3").value; 
    document.getElementById("totalProduto3").innerHTML =  'R$ ' + totalProduto3 + ',00'; 

    totalPagar = totalProduto1 + totalProduto2 + totalProduto3; 
    document.getElementById("totalPagar").innerHTML =  'R$ ' + totalPagar + ',00';
};

/*---------------------------------------------------------- Ao alterar a quantidade do produto 1 */

var qntProduto1Old = 1;

document.getElementById("qntProduto1").onchange = function(){
    totalProduto1 = parseInt(document.getElementById("valorUnProduto1").innerHTML.substring(3)) * document.querySelector("#qntProduto1").value; 
    document.getElementById("totalProduto1").innerHTML = 'R$ ' + totalProduto1 + ',00';
    
    var qntProduto1New = document.querySelector("#qntProduto1").value;
    var verificaQntProduto1 = qntProduto1New - qntProduto1Old;
    
    qntProduto1Old = qntProduto1New;
    

    if (verificaQntProduto1 > 0) { //se for mais que 0, significa que aumentou o número de produtos
        totalPagar =  totalPagar + parseInt(document.getElementById("valorUnProduto1").innerHTML.substring(3));
    } else { //se não, significa que diminuiu o número de produtos
        totalPagar =  totalPagar - parseInt(document.getElementById("valorUnProduto1").innerHTML.substring(3));
    }

    document.getElementById("totalPagar").innerHTML =  'R$ ' + totalPagar + ',00';    

};

/*---------------------------------------------------------- Ao alterar a quantidade do produto 2 */

var qntProduto2Old = 1;

document.getElementById("qntProduto2").onchange = function(){
    totalProduto2 = parseInt(document.getElementById("valorUnProduto2").innerHTML.substring(3)) * document.querySelector("#qntProduto2").value; 
    document.getElementById("totalProduto2").innerHTML = 'R$ ' + totalProduto2 + ',00';
    
    var qntProduto2New = document.querySelector("#qntProduto2").value;
    var verificaQntProduto2 = qntProduto2New - qntProduto2Old;
    
    qntProduto2Old = qntProduto2New;
    

    if (verificaQntProduto2 > 0) { //se for mais que 0, significa que aumentou o número de produtos
        totalPagar =  totalPagar + parseInt(document.getElementById("valorUnProduto2").innerHTML.substring(3));
    } else { //se não, significa que diminuiu o número de produtos
        totalPagar =  totalPagar - parseInt(document.getElementById("valorUnProduto2").innerHTML.substring(3));
    }

    document.getElementById("totalPagar").innerHTML =  'R$ ' + totalPagar + ',00';    

};

/*---------------------------------------------------------- Ao alterar a quantidade do produto 3 */

var qntProduto3Old = 1;

document.getElementById("qntProduto3").onchange = function(){
    totalProduto3 = parseInt(document.getElementById("valorUnProduto3").innerHTML.substring(3)) * document.querySelector("#qntProduto3").value; 
    document.getElementById("totalProduto3").innerHTML = 'R$ ' + totalProduto3 + ',00';
    
    var qntProduto3New = document.querySelector("#qntProduto3").value;
    var verificaQntProduto3 = qntProduto3New - qntProduto3Old;
    
    qntProduto3Old = qntProduto3New;
    

    if (verificaQntProduto3 > 0) { //se for mais que 0, significa que aumentou o número de produtos
        totalPagar =  totalPagar + parseInt(document.getElementById("valorUnProduto3").innerHTML.substring(3));
    } else { //se não, significa que diminuiu o número de produtos
        totalPagar =  totalPagar - parseInt(document.getElementById("valorUnProduto3").innerHTML.substring(3));
    }

    document.getElementById("totalPagar").innerHTML =  'R$ ' + totalPagar + ',00';    

};

document.getElementById("retirarLocal").onclick = function() {
    totalPagar =  totalPagar - 20;    
    document.getElementById("totalPagar").innerHTML =  'R$ ' + totalPagar + ',00';
};

document.getElementById("receberCasa").onclick = function() {
    totalPagar =  totalPagar + parseInt('20');    
    document.getElementById("totalPagar").innerHTML =  'R$ ' + totalPagar + ',00';
};