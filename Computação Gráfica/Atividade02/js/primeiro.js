var scene;
var camera;
var renderer;
var sphere;
var velocidadeCuboX = 0.5;
var velocidadeCuboY = 0.5;
var velocidadeCuboZ = 0.1;

var criaCubo = function (){

    var geometry = new THREE.BoxGeometry( 10, 10, 10 );
    red = new THREE.Color(1, 0, 0);
    green = new THREE.Color(0, 1, 0);
    blue = new THREE.Color(0, 0, 1);
    var colors = [red, green, blue]; //Constitui as cores.

    for (var i = 0; i < 3; i++){ //Colore as faces do cubo considenrando as faces opostas com a mesma cor
        geometry.faces[4*i].color = colors[i];    
        geometry.faces[4*i+1].color = colors[i];
        geometry.faces[4*i+2].color = colors[i];    
        geometry.faces[4*i+3].color = colors[i];
    }
    
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: true});

    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

};

var render = function (){
    requestAnimationFrame(render);

    //animaCubo(); faz a animacao sozinha

    renderer.render(scene, camera);
}

var animaCubo = function (){
    
    if (cube.position.x >= 50  ||  cube.position.x <=(-65) ) { //GAMBIARA
        console.log("Trocou a posiçao: " + cube.position.x);
        velocidadeCuboX = velocidadeCuboX * -1;
    }
    if (cube.position.y >= 30  ||  cube.position.y <=(-30) ) { //GAMBIARA
        console.log("Trocou a posiçao: " + cube.position.y);
        velocidadeCuboY = velocidadeCuboY * -1;
    }

    if (cube.position.z >= 20  ||  cube.position.z <=(-20) ) { //GAMBIARA
        console.log("Trocou a direção de Z: " + cube.position.z);
        velocidadeCuboZ = velocidadeCuboZ * -1;
    }
    cube.position.x += velocidadeCuboX;
    cube.position.y += velocidadeCuboY;
    cube.position.z += velocidadeCuboZ;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.001;
}


var leDoTeclado = function(e){
    console.log("Usuário apertou a tecla: " + e.keyCode);

    if (e.keyCode == 32){ //tecla " " espaço
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.01;
    }
    if (cube.position.y < 30 && e.keyCode == 38){
        cube.position.y +=velocidadeCuboY;
    }
    if (cube.position.y > -30 && e.keyCode == 40){
        cube.position.y -=velocidadeCuboY;
    }
    if ( cube.position.x >-65 && e.keyCode == 37){
        cube.position.x -=velocidadeCuboX;
    }
    if (cube.position.x <50 && e.keyCode == 39){
        cube.position.x +=velocidadeCuboX;
    }
};

var init = function (){ 
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); // adicionando o renderizador na tela

    camera.position.z = 100;

    criaCubo(); 

    document.addEventListener('keydown', leDoTeclado);

    render();

    renderer.render(scene, camera);

}

window.onload = this.init; 