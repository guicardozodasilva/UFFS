var scene;
var camera;
var renderer;

var velocity = 0.1;

var ground;

var objLoader;
var fbxLoader;
var textureLoader;

//iluminação
var spotLight;
var ambientLight;
var directionalLight;

var girafa;
var panda;
var veado;
var vaca;
var pterodactyl;
var papagaio;
var aguia;
var lenhador;
var arvore1;
var arvore2;

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
        Girafa: () => {olhar(girafa)},   
        Panda: () => {olhar(panda)},
        Veado: () => {olhar(veado)}, 
        Vaca: () => {olhar(vaca)},
        Pterodactil: () => {olhar(pterodactil)},
        Papagaio: () => {olhar(papagaio)},
        Aguia: () => {olhar(aguia)},
        Lenhador: () => {olhar(lenhador)},
        Arvore1: () => {olhar(arvore1)},
        Arvore2: () => {olhar(arvore2)}
    };    

    gui.add(param, 'Girafa');
    gui.add(param, 'Panda');
    gui.add(param, 'Veado');
    gui.add(param, 'Vaca');
    gui.add(param, 'Pterodactil');
    gui.add(param, 'Papagaio');
    gui.add(param, 'Aguia');
    gui.add(param, 'Lenhador');
    gui.add(param, 'Arvore1');
    gui.add(param, 'Arvore2');

    gui.open();
   
};

var criaGround = function (){

    textureLoader = new THREE.TextureLoader();
    groundTexture = textureLoader.load('assets/textura/terrain/grasslight-big.jpg');

    material = new THREE.MeshStandardMaterial({map : groundTexture});
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 20, 20 );
    groundTexture.encoding = THREE.sRGBEncoding;
    groundTexture.anisotropy = 16;
    material.normalMap =  textureLoader.load('assets/textura/terrain/grasslight-big-nm.jpg');
    
    
    ground = new  THREE.Mesh(
        new THREE.PlaneBufferGeometry(1050, 1050, 25),
        material
    );
    ground.receiveShadow = true;    
    ground.rotation.x -= Math.PI / 2;
    ground.position.y=-2;

    scene.add(ground);

};

var loadObj = function(){
    objLoader = new THREE.OBJLoader();
    fbxLoader = new THREE.FBXLoader();
    textureLoader = new THREE.TextureLoader();

    fbxLoader.load(
        'assets/models/Giraffe.fbx', //arquivo que vamos carregar
        function(object){
            girafa = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/Giraffe_UV.png");
                            child.material.shininess = 0;
                        }
                    });

            girafa.scale.x = 0.1;
            girafa.scale.y = 0.1;
            girafa.scale.z = 0.1;
            girafa.position.z = -3;
            girafa.position.x = -50;
            girafa.position.y = 15;
            girafa.castShadow = true;
            scene.add(girafa); 

        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Panda.fbx', //arquivo que vamos carregar
        function(object){
            panda = object;

            panda.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/Panda_UV.png");
                            child.material.shininess = 0;
                        }
                    });

            panda.scale.x = 0.06;
            panda.scale.y = 0.06;
            panda.scale.z = 0.06;
            panda.position.x = -115;
            panda.position.z = 30;
            panda.position.y = 0;
            panda.castShadow = true;
            scene.add(panda); 

        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Deer.fbx', //arquivo que vamos carregar
        function(object){
            veado = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UV_Deer.png");
                            child.material.shininess = 0;
                        }
                    });

            veado.scale.x = 0.06;
            veado.scale.y = 0.06;
            veado.scale.z = 0.06;
            veado.position.y = 0;
            veado.position.z = 1;
            veado.position.x = 110;
            veado.rotation.y -= 1;
            veado.castShadow = true;
            scene.add(veado); 
            console.log(veado);
            
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% gpronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Cow.fbx', //arquivo que vamos carregar
        function(object){
            vaca = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UVCow.png");
                            child.material.shininess = 0;
                        }
                    });

            vaca.scale.x = 0.1;
            vaca.scale.y = 0.1;
            vaca.scale.z = 0.1;
            vaca.position.x = -5;
            vaca.position.z = 30;
            vaca.position.y = 0;
            vaca.rotation.y += 1;
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
        'assets/models/Pterodactyl.fbx', //arquivo que vamos carregar
        function(object){
            pterodactil = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UV Pterodactyl.png");
                            child.material.shininess = 0;
                        }
                    });

            pterodactil.scale.x = 0.05;
            pterodactil.scale.y = 0.05;
            pterodactil.scale.z = 0.05;
            pterodactil.position.z = -20;
            pterodactil.position.x = 15;
            pterodactil.position.y = 90;
            pterodactil.rotation.y -= 1.25;
            pterodactil.rotation.x -= 0.85;
            pterodactil.rotation.z -= 0.15;
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

    fbxLoader.load(
        'assets/models/Parrot.fbx', //arquivo que vamos carregar
        function(object){
            papagaio = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/Parrot_UV.png");
                            child.material.shininess = 0;
                        }
                    });

            papagaio.scale.x = 0.01;
            papagaio.scale.y = 0.01;
            papagaio.scale.z = 0.01;
            papagaio.position.x = 12.5;
            papagaio.position.z = 0;
            papagaio.position.y = 20.5;
            papagaio.castShadow = true;
            scene.add(papagaio);    

        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/Eagle.fbx', //arquivo que vamos carregar
        function(object){
            aguia = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/eagle/default_Base_Color.png");
                            child.material.shininess = 0;
                        }
                    });

            aguia.scale.x = 3;
            aguia.scale.y = 3;
            aguia.scale.z = 3;
            aguia.position.x = 20;
            aguia.position.z = 0;
            aguia.position.y = 45;
            aguia.castShadow = true;
            scene.add(aguia);    

        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/lenhador.fbx', //arquivo que vamos carregar
        function(object){
            lenhador = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/UVLenhador.png");
                            child.material.shininess = 0;
                        }
                    });

            lenhador.scale.x = 0.03;
            lenhador.scale.y = 0.03;
            lenhador.scale.z = 0.03;
            lenhador.position.x = 40;
            lenhador.position.z = 30;
            lenhador.position.y = 10;
            lenhador.rotation.y -= 0.85;
            scene.add(lenhador);    

        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    objLoader.load(
        'assets/models/tree.obj', //arquivo que vamos carregar
        function(object){
            arvore1 = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/Wood.jpg");
                        }
                    });

            arvore1.scale.x = 50;
            arvore1.scale.y = 50;
            arvore1.scale.z = 50;
            arvore1.position.x = 40;
            arvore1.position.z = -30;
            arvore1.position.y = 1;
            scene.add(arvore1);    

        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    objLoader.load(
        'assets/models/tree.obj', //arquivo que vamos carregar
        function(object){
            arvore2 = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/Wood.jpg");
                        }
                    });

            arvore2.scale.x = 40;
            arvore2.scale.y = 40;
            arvore2.scale.z = 40;
            arvore2.position.x = 60;
            arvore2.position.z = 55;
            arvore2.position.y = 1;
            scene.add(arvore2);    

        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

}

var iluminacaoDirectional = function(){
    //corPixel = corPixel * corLuzDirecional * intensidade * tetha ... (integração das cores do ambeinte).

    directionalLight = new THREE.DirectionalLight(0xffffff, 1, 1000);
    directionalLight.position.y = 250;
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.left = 1000;
    directionalLight.shadow.camera.bottom = 1000;
    directionalLight.shadow.camera.right = -1000
    directionalLight.shadow.camera.top = -1000;

    directionalLight.target = ground;

    scene.add(directionalLight);
    scene.add(directionalLight.target);

    scene.add(new THREE.DirectionalLightHelper(directionalLight));

}


var iluminacaoSpot = function(){
    //corPixel = corPixel * corLuzDirecional * intensidade * tetha ... (integração das cores do ambeinte).

    spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.angle = 0.5;
    spotLight.position.y = 25;
    spotLight.position.z = 60;
    spotLight.castShadow = true;

    spotLight.shadow.distance = 30;
    spotLight.shadow.penumbra = 30;
    spotLight.shadow.angle = 25;
        

    spotLight.target.position.set(5,20,0);

    scene.add(spotLight);

    spotLight.intensity = 0;


    helperSpot = new THREE.SpotLightHelper(spotLight);
    scene.add(helperSpot);

}

var init = function() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 180 );
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  

    criaGround();

    guiFunction();

    loadObj();

    iluminacaoDirectional();

    scene.fog = new THREE.Fog( 0xcce0ff, 200, 500 );
   
    ambientLight = new THREE.AmbientLight( 0x888888 );
    ambientLight.intensity = 1;

    scene.add(ambientLight);

    camera.position.z = 100;
    camera.position.y = 20;

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