document.getElementById("fechar").onclick = function(){
    document.getElementById("ajuda").style.display = 'none';
};

/* exibir/ocultar menu quando estiver em um dispositivo móvel */
document.getElementById("exibe-menu").onclick = function(){
    var menu = document.getElementsByClassName("menu-opcoes")[0];
    
    if (menu.style.display == "initial")  
        menu.style.display = "none"; //oculta
    else
        menu.style.display = "initial"; //exibe
};

/* quando eu redimensionar a janela */ 
document.body.onresize = function() {
    var x = window.outerWidth; //pega a largura da janela
    var menu = document.getElementsByClassName("menu-opcoes")[0];
    if(x >= '1000')
        menu.style.display = "initial" //exibe
    else
        menu.style.display = "none"; //oculta
}