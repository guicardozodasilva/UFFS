var scene;
var camera;
var renderer;
var cotoveloRobotico_movimento = true;
var cotoveloRobotico_desligado = 0;
var velocity = 0.1;


var createBracoRobotico = function() {
    var geometry = new THREE.BoxGeometry( 2, 10, 2 );

    red = new THREE.Color(1, 0, 0);
    green = new THREE.Color(0, 1, 0);
    blue = new THREE.Color(0, 0, 1);
    var colors = [red, green, blue];

    for (var i = 0; i < 3; i++) {
        geometry.faces[4 * i].color = colors[i];
        geometry.faces[4 * i+1].color = colors[i];
        geometry.faces[4 * i+2].color = colors[i];
        geometry.faces[4 * i+3].color = colors[i];

    }

    var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: true } );

    // criacao do braco robotico
    bracoRobotico = new THREE.Mesh( geometry, material );
    scene.add(bracoRobotico);

    // criacao do antebraco robotico
    antebracoRobotico = new THREE.Mesh( geometry, material );
    scene.add(antebracoRobotico);

    var geometry2 = new THREE.SphereGeometry(2, 32,32);
    var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    
    // criacao do ombro robotico
    ombroRobotico = new THREE.Mesh(geometry2, material2);
    ombroRobotico.position.y-=5;
    bracoRobotico.add(ombroRobotico);

    // criacao do cotovelo robotico
    cotoveloRobotico = new THREE.Mesh(geometry2, material2);
    cotoveloRobotico.position.y-=5;
    antebracoRobotico.add(cotoveloRobotico);

    // criacao do pivo do ombro robotico
    ombroRobotico_pivo = new THREE.Group();
    ombroRobotico_pivo.position.set(0,0,0);
    ombroRobotico_pivo.add(bracoRobotico);
    
    // criacao do pivo do cotovelo robotico
    cotoveloRobotico_pivo = new THREE.Group();
    cotoveloRobotico_pivo.position.set(0,10,0);
    cotoveloRobotico_pivo.add(antebracoRobotico);

    ombroRobotico_pivo.add(cotoveloRobotico_pivo)
    scene.add(ombroRobotico_pivo);

    bracoRobotico.position.y+=ombroRobotico_pivo.position.x+5;
    antebracoRobotico.position.y+=cotoveloRobotico_pivo.position.x+5;

};

var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.createBracoRobotico();

    camera.position.z = 100;

    render();

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keydown', onKeyDown);  
    document.addEventListener('mousedown', onMouseDown); //metodos de controle do mouser
    document.addEventListener('mouseup', onMouseUp); 
    document.addEventListener('mousemove', onMouseMouse); 
  
};

var render = function() {
    requestAnimationFrame( render );

    if (cotoveloRobotico_desligado >= 0 && cotoveloRobotico_movimento) {
        cotoveloRobotico_pivo.rotation.z = cotoveloRobotico_pivo.rotation.z - toRadians(2.5)*0.5;
        cotoveloRobotico_desligado = cotoveloRobotico_desligado - 2.5;
    }

    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;

var onKeyUp = function(e){

    if (e.keyCode == 32) {
        cotoveloRobotico_movimento = true;
    }

}

var onKeyDown = function(e){
    console.log(e.keyCode);

    if (e.keyCode == 32){ //espaço -> rotação pelo pivo.
        if (cotoveloRobotico_desligado <= 500) {
            cotoveloRobotico_pivo.rotation.z = cotoveloRobotico_pivo.rotation.z + toRadians(2.5)*0.5;
            cotoveloRobotico_desligado = cotoveloRobotico_desligado + 10;
        }
        cotoveloRobotico_movimento = false;
    }
    
}

var cliquePressionado = false; //para controlar o tempo que o cara esta pressionando o botao do mouser

var onMouseDown = function(e){
    cliquePressionado = true;
    //console.log("Apertou Clicou")
}


var onMouseUp = function(e){
    cliquePressionado = false;
  //  console.log("SOltou o clique");
}

var posicaoAtual = { //controla a posição atual
    x: 0,
    y: 0
};

var posicaoMouser = { //controla a posição do mouser
    x: 0,
    y: 0
};

var onMouseMouse = function (e){
    
    if (cliquePressionado){

        var deltaMovimento = {
            x: e.offsetX - posicaoMouser.x,
            y: e.offsetY - posicaoMouser.y,
        }

        if (posicaoAtual.y + deltaMovimento.x <= 100 && posicaoAtual.y + deltaMovimento.x >= (-100)) {
            ombroRobotico_pivo.rotation.y += toRadians(deltaMovimento.x)*0.5;
            if (deltaMovimento.x <= 0) 
                posicaoAtual.y = Math.min(posicaoAtual.y + deltaMovimento.x, -100);
            else 
                posicaoAtual.y = Math.max(posicaoAtual.y + deltaMovimento.x, 100)
        }

        if (posicaoAtual.x+deltaMovimento.y <= 200 && posicaoAtual.x+deltaMovimento.y >= (-200)) {
            ombroRobotico_pivo.rotation.x += toRadians(deltaMovimento.y)*0.5;
            
            if (deltaMovimento.y <= 0) 
                posicaoAtual.x = Math.min(posicaoAtual.x + deltaMovimento.y, -200);
            else 
                posicaoAtual.x = Math.max(posicaoAtual.x + deltaMovimento.y, 200)
        }

    }

    posicaoMouser = {  //nova posição do mouser
        x : e.offsetX,
        y : e.offsetY
    };
    
}

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}