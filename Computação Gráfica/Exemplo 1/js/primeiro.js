var scene;
var camera;
var renderer;
var sphere;
var velocidadeCuboX = 0.5;
var velocidadeCuboY = 0.5;

var criaCubo = function (){
    var geometria = new THREE.SphereGeometry(5, 32, 32); //responsavel por criar o cubo, eh passado a altura,                                                                 
                                                       //largura e profundidade como parametro.
    var material = new THREE.MeshBasicMaterial({color: "blue"});     

    sphere = new THREE.Mesh(geometria, material);

    scene.add(sphere);
};

var render = function (){
    requestAnimationFrame(render);

    animaCubo();

    renderer.render(scene, camera);
}

var animaCubo = function (){
    if (this.sphere.position.x >= 63 || this.sphere.position.x <= -63) {
        velocidadeCuboX = velocidadeCuboX * -1;
    }

    if (this.sphere.position.y >= 31 || this.sphere.position.y <= -31) {
        velocidadeCuboY = velocidadeCuboY * -1;
    }

    this.sphere.position.x+= velocidadeCuboX;
    this.sphere.position.y+= velocidadeCuboY;

    console.log("Posicao Cubo" + this.sphere.position.x); 
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