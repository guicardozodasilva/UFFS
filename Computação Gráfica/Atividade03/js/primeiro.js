var scene;
var camera;
var renderer;

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
    pivotOmbroRobotico = new THREE.Group();
    pivotOmbroRobotico.position.set(0,0,0);
    pivotOmbroRobotico.add(bracoRobotico);
    scene.add(pivotOmbroRobotico);
    bracoRobotico.position.y+=pivotOmbroRobotico.position.x+5;

    // criacao do pivo do cotovelo robotico
    pivotCotoveloRobotico = new THREE.Group();
    pivotCotoveloRobotico.position.set(0,0,0);
    pivotCotoveloRobotico.add(antebracoRobotico);
    scene.add(pivotCotoveloRobotico);
    antebracoRobotico.position.y+=pivotCotoveloRobotico.position.x+5;

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

    document.addEventListener('keydown', onKeyDown ); 

    document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    document.addEventListener('mouseup', onMouseUp ); 
    document.addEventListener('mousemove', onMouseMouse ); 
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;

var onKeyDown = function(e){
    console.log(e.keyCode);
    if(e.keyCode == 37){
        bracoRobotico.position.x-=velocity;
    }
    if (e.keyCode == 32){ //espaço -> rotação pelo pivo.
        
        console.log("Z: "+ pivot.rotation.z);
        if (pivot.rotation.z > 1.7 || pivot.rotation.z < -1){
            rotationVelocity*=-1;
        }
        pivot.rotation.z+=rotationVelocity; 
       // pivo.rotation.y+=0.1;
    }
    if (e.keyCode == 187){ // +
        bracoRobotico.scale.x+=0.1;
        bracoRobotico.scale.y+=0.1;
        bracoRobotico.scale.z+=0.1;
    }
    if (e.keyCode == 189){ // -
        bracoRobotico.scale.x-=0.1;
        bracoRobotico.scale.y-=0.1;
        bracoRobotico.scale.z-=0.1;
    }
}


var posicaoMouser = { //controla a posição do mouser
    x: 0,
    y: 0
};

var cliquePressionado = false; //para controlar o tempo que o cara esta pressionando o botao do mouser

var onMouseDown = function(e){
    cliquePressionado = true;
    //console.log("Apertou Clicou")
}


var onMouseUp = function(e){
    cliquePressionado = false;
  //  console.log("SOltou o clique");
}


var onMouseMouse = function (e){
    if (cliquePressionado){

        var deltaMovimento = {
            x: e.offsetX - posicaoMouser.x,
            y: e.offsetY - posicaoMouser.y,
        }

        //cube.position.x += deltaMovimento.x*0.01;
        //cube.position.y += deltaMovimento.y*0.01*-1;

        bracoRobotico.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
        bracoRobotico.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
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