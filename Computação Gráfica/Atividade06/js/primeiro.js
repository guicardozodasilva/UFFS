var scene;
var camera;
var renderer;

var velocity = 0.1;

var ground;

var objLoader;
var textureLoader;

var spotLight;

var ovelha;
var pitbull;
var elefante;
var vaca;
var pterodactyl;

var lastLook = null;
var looking = false;

async function olhar(target) {
    if (looking) return;
    looking = true;

    lastLook = target;
    pos = new THREE.Vector3(lastLook.position.x, lastLook.position.y, lastLook.position.z);
    

    while (1) {
        let canbreak=true;

        console.log(pos);

        if (Math.abs(target.position.y-pos.y)>0.01) {
            canbreak = false;
            pos.y=(target.position.y+pos.y)/2;
        }

        if (Math.abs(target.position.x-pos.x)>0.01) {
            canbreak = false;
            pos.x=(target.position.x+pos.x)/2;
        }

        if (Math.abs(target.position.z-pos.z)>0.01) {
            canbreak = false;
            pos.z=(target.position.z+pos.z)/2;
        }

        camera.lookAt(pos);

        renderer.render( scene, camera );

        if (canbreak) break;

        await new Promise(r => setTimeout(r, 25));
    }

    looking = false;
}

var guiFunction = function(){
    const gui = new dat.GUI();

    param = {
        Ovelha: () => {olhar(ovelha)},   
        Pitbull: () => {olhar(pitbull)},
        Elefante: () => {olhar(elefante)}, 
        Vaca: () => {olhar(vaca)},
        Pterodactil: () => {olhar(pterodactil)}
    };    

    gui.add(param, 'Ovelha');
    gui.add(param, 'Pitbull');
    gui.add(param, 'Elefante');
    gui.add(param, 'Vaca');
    gui.add(param, 'Pterodactil');

    gui.open();
   
};

var criaGround = function (){

    textureLoader = new THREE.TextureLoader();
    groundTexture = textureLoader.load('assets/textura/terrain/grasslight-big.jpg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 20, 20 );
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    ground = new  THREE.Mesh(
        new THREE.PlaneGeometry(1050, 1050, 25,25),
        new THREE.MeshBasicMaterial({map : groundTexture})
    );

    ground.rotation.x -= Math.PI / 2;
    ground.position.y=-2;

    scene.add(ground);
};

var loadObj = function(){
    objLoader = new THREE.OBJLoader();
    fbxLoader = new THREE.FBXLoader();
    textureLoader = new THREE.TextureLoader();
 
    fbxLoader.load(
        'assets/models/Sheep.obj', //arquivo que vamos carregar
        function(object){
            ovelha = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0x70929e");
                        }
                    });

            ovelha.scale.x = 3;
            ovelha.scale.y = 3;
            ovelha.scale.z = 3;
            ovelha.position.z = -3;
            ovelha.position.x = -30;
            ovelha.position.y = 8;
            ovelha.castShadow = true;
            scene.add(ovelha); 

        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Pitbull.obj', //arquivo que vamos carregar
        function(object){
            pitbull = object;

            pitbull.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0x0096fa");
                        }
                    });

            pitbull.scale.x = 2;
            pitbull.scale.y = 2;
            pitbull.scale.z = 2;
            pitbull.position.x = -100;
            pitbull.position.z = 10;
            pitbull.position.y = 1;
            pitbull.castShadow = true;
            scene.add(pitbull); 

        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Elephant.obj', //arquivo que vamos carregar
        function(object){
            elefante = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0x439e1a");
                        }
                    });

            elefante.scale.x = 2;
            elefante.scale.y = 2;
            elefante.scale.z = 2;
            elefante.position.y = 0;
            elefante.position.z = -10;
            elefante.position.x = 40;
            elefante.castShadow = true;
            scene.add(elefante); 
            console.log(elefante);
            
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% gpronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Cow.obj', //arquivo que vamos carregar
        function(object){
            vaca = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0x000000");
                        }
                    });

            vaca.scale.x = 3;
            vaca.scale.y = 3;
            vaca.scale.z = 3;
            vaca.position.x = -5;
            vaca.position.z = 7;
            vaca.position.y = 0;
            vaca.castShadow = true;
            scene.add(vaca); 

        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% gpronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Pterodactyl.obj', //arquivo que vamos carregar
        function(object){
            pterodactil = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0x1fad42");
                        }
                    });

            pterodactil.scale.x = 2;
            pterodactil.scale.y = 2;
            pterodactil.scale.z = 2;
            pterodactil.position.z = 7;
            pterodactil.position.x = 0;
            pterodactil.position.y = 78;
            pterodactil.rotation.y = Math.PI*1.4;
            pterodactil.castShadow = true;
            scene.add(pterodactil);    

        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );
}

var init = function() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 180 );

    renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  

    //createACube();

    loadObj();

    camera.position.z = 100;
    camera.position.y = 30;


    //Iluminação 
    //Não se preocupe com essa parte por enquanto, apenas usem :)
    spotLight = new THREE.SpotLight( 0xffffff );
    scene.add(spotLight);
    spotLight.position.set( 100, 100, 100 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 100;
    spotLight.shadow.mapSize.height = 100;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 99;
    spotLight.shadow.camera.fov = 40;

    renderer.shadowMap.enable = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;


    
    scene.add(new THREE.AmbientLight( 0xffffff ));


    criaGround();

    guiFunction();

    render();
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}