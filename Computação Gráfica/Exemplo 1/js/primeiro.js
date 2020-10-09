var scene;
var camera;
var renderer;
var cube;
var velocidadeCuboX = 0.5;
var velocidadeCuboY = 0.5;

var criaCubo = function (){
    var geometria = new THREE.BoxGeometry(10, 10, 10); //responsavel por criar o cubo, eh passado a altura,                                                                 
                                                       //largura e profundidade como parametro.
    var material = new THREE.MeshBasicMaterial({color: "blue"});     

    cube = new THREE.Mesh(geometria, material);

    scene.add(cube);
};

var render = function (){
    requestAnimationFrame(render);

    animaCubo();

    renderer.render(scene, camera);
}

var animaCubo = function (){
    if (this.cube.position.x >= 60 || this.cube.position.x <= -60) {
        velocidadeCuboX = velocidadeCuboX * -1;
    }

    if (this.cube.position.y >= 30 || this.cube.position.y <= -30) {
        velocidadeCuboY = velocidadeCuboY * -1;
    }

    this.cube.position.x+= velocidadeCuboX;
    this.cube.position.y+= velocidadeCuboY;

    console.log("Posicao Cubo" + this.cube.position.x); 
}

var init = function (){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); // adicionando o renderizador na tela

    camera.position.z = 100;

    criaCubo();

    render();

    renderer.render(scene, camera);
}

window.onload = this.init; 