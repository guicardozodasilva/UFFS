var scene;
var camera;
var renderer;
var controls;

var velocity = 0.1;

var ground;

var objLoader;
var textureLoader;

//iluminação
var spotLight;
var ambientLight;
var directionalLight;

var clock = new THREE.Clock();


var mixer;//mixer: THREE.AnimationMixer;
var modelReady = false;
var animationActions = Array();
var activeAction;//: THREE.AnimationAction;
var lastAction;// : THREE.AnimationAction;
var loadFinished = false;

var bouding = [];
var boudingBox = [];
var boudingTree = [];

var objCarregado = [];
var directionObject = [];
var animationsFolder;

var ataque = false;

var guiFunction = function(){
    const gui = new dat.GUI();

    var parametroQualquer;

    param = {
        campoTexto: "Teste Texturas",
        escalaA: 1,
        escalaD: 1,
        cor: "#000000",
        corD: "#000000",
        x:0,
        y:0,
        z:0,
        animais: "",
        walk: function () {
            setAction(animationActions[1]);
        },
        run: function () {
            setAction(animationActions[0]);
        },
        sit: function () {
            setAction(animationActions[3])
        },
        creep: function () {
            setAction(animationActions[5])
        },
        idle: function () {
            setAction(animationActions[4])
        },
        seiNao: function () {
            setAction(animationActions[2])
        }
    };    


    gui.add(param, 'campoTexto').name("nome obj");
    
    var pastaAmb = gui.addFolder("Luz Ambiente");
    var scalep = pastaAmb.add(param, 'escalaA').min(0.1).max(5).step(0.1).name("Luz Ambiente");
    scalep.onChange(function (parametroQualquer){
        ambientLight.intensity = parametroQualquer;
    });
    var colore = pastaAmb.addColor(param, 'cor').name("Cor Obj");
    colore.onChange(function (parametroQualquer){
        ambientLight.color.setHex(parametroQualquer.replace("#", "0x"));

        //cotovelo.material.color.setHex(parametroQualquer.replace("#", "0x"));
    });


    var pastaDir = gui.addFolder("Luz Direcional");
    var scalep = pastaDir.add(param, 'escalaD').min(0).max(5).step(0.1).name("Luz Direc");
    scalep.onChange(function (parametroQualquer){
        ambientLight.intensity = parametroQualquer;
    });
    var colore = pastaDir.addColor(param, 'corD').name("Cor Directional");
    colore.onChange(function (parametroQualquer){
        ambientLight.color.setHex(parametroQualquer.replace("#", "0x"));

        //cotovelo.material.color.setHex(parametroQualquer.replace("#", "0x"));
    });


    var pastaPosicao = gui.addFolder("Posicao");

    var posX = pastaPosicao.add(param, 'x').min(-30).max(30).step(1).name("x");
    posX.onChange(function (parametroQualquer){
        directionalLight.position.x = parametroQualquer;
    });

    var posY = pastaPosicao.add(param, 'y').min(-30).max(30).step(1).name("y");
    posY.onChange(function (parametroQualquer){
        directionalLight.position.y = parametroQualquer;
    });

    var posZ = pastaPosicao.add(param, 'z').min(-30).max(30).step(1).name("z");
    posZ.onChange(function (parametroQualquer){
        objCardirectionalLightregado.position.z = parametroQualquer;
    });
    
    var chGeometry = gui.add(param, 'animais', ['Vaca', 'Ptero' ]).name("Elementos");
    chGeometry.onChange(function(parametroQualquer){
        
        if (parametroQualquer == 'Vaca'){
            camera.lookAt(objCarregado[0].position);
        } else if (parametroQualquer == 'Ptero'){
            
            camera.position.z = objCarregado[1].position.z + 10;
            camera.position.x = objCarregado[1].position.x + 5;
            camera.position.y = objCarregado[1].position.y - 5;

            camera.lookAt(objCarregado[1].position);
        }
        
    });

    animationsFolder = gui.addFolder("Animations");
    
    
   


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
 

    for (i=0; i<7; i++){
        objLoader.load(
            'assets/models/tree.obj', //arquivo que vamos carregar
            function(object){
                
                object.traverse( function ( child ) {
                            if ( child instanceof THREE.Mesh ) {
                                child.material.map = textureLoader.load("assets/textura/Wood.jpg");
                                child.material.shininess = 0;
                               child.castShadow = true;
                               child.receiveShadow = true;
                            }
                        });

                

                object.scale.x =50;
                object.scale.y = 50;
                object.scale.z = 50;

                object.position.z = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
                object.position.x = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
                
                object.position.y = -1;


                //object.rotation.y += 1;

                object.castShadow = true;

            // camera.lookAt(objCarregado.position)

                scene.add(object); 


                let vobH = new THREE.BoxHelper( object, 0xffff00 );
                scene.add(vobH);
                
                object.children[0].geometry.computeBoundingBox();
                boxF = new THREE.Box3().setFromObject(object.children[0]);
                
                boudingTree.push(boxF);

            },//metodo, tudo deu certo
            function( andamento) {
                console.log((andamento.loaded / andamento.total *100) + "% pronto!");
            },//metodo executa enquanto carrega
            function (error){
                console.log("Deu caca: " + error);
            } //metodo deu merda
        );
    }

    
    fbxLoader.load( 'assets/models/Wolf.fbx', function ( object ) {
       objCarregado.push(object);
        object.scale.set(0.25, 0.25, 0.25);
        
        
        mixer = new THREE.AnimationMixer(object);
        
        animationAction = mixer.clipAction(object.animations[0]);
        animationActions.push(animationAction);
        
        animationAction = mixer.clipAction(object.animations[1]);
        animationActions.push(animationAction);
        
        animationAction = mixer.clipAction(object.animations[2]);
        animationAction.setLoop(1, THREE.LoopOnce) ;
        animationActions.push(animationAction);
        
        animationAction = mixer.clipAction(object.animations[3]);
        animationActions.push(animationAction);
        
        animationAction = mixer.clipAction(object.animations[4]);
        animationActions.push(animationAction);

        animationAction = mixer.clipAction(object.animations[5]);
        animationActions.push(animationAction);
       
        animationsFolder.add(param, "idle");
        animationsFolder.add(param, "sit");
        animationsFolder.add(param, "run");
        animationsFolder.add(param, "walk");
        animationsFolder.add(param, "creep");
        animationsFolder.add(param, "seiNao");

        activeAction = animationAction;
        

        object.traverse( function ( child ) {

            if ( child.isMesh ) {

                child.material.map = textureLoader.load("assets/models/Wolf_Body.jpg");

                child.material.shininess = 0;

                child.castShadow = true;
                child.receiveShadow = true;

            }

        } );

       object.rotation.y =  Math.PI;
        object.position.y = -2;

        directionObject.push(new THREE.Vector3(1,1,-1));

       

        
        scene.add( object );
        
        
        const box = new THREE.BoxHelper( object, 0xffff00 );
        scene.add( box );
        bouding.push(box);
        
        boxF = new THREE.Box3().setFromObject(object.children[0]);
        boudingBox.push(boxF);
        // console.log("lobo ");
        // console.log(boxF);
        loadFinished = true;

    } );

    fbxLoader.load(
        'assets/models/Apartament.fbx', //arquivo que vamos carregar
        function(object){
            ap = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/Apartment.jpg");
                            child.material.shininess = 0;
                        }
                    });

            ap.scale.x = 10;
            ap.scale.y = 10;
            ap.scale.z = 10;
            ap.position.z = -3;
            ap.position.x = -50;
            ap.position.y = 0;
            ap.castShadow = true;
            scene.add(ap); 

        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

}


const setAction = function(toAction) {
    if (toAction != activeAction) {
        lastAction = activeAction
        activeAction = toAction
        lastAction.stop()
        activeAction.reset()
        activeAction.play()
    }
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
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFShadowMap;
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // camControls = new THREE.FirstPersonControls(camera);
    // camControls.lookSpeed = 0.08;
    // camControls.movementSpeed = 1;
    // camControls.noFly = true;
    // camControls.lookVertical = true;
    // camControls.constrainVertical = true;
    // camControls.verticalMin = 1.0;
    // camControls.verticalMax = 2.0;
    // camControls.lon = -150;
    // camControls.lat = 120;



    
    
    criaGround();
    
    guiFunction();
    
    loadObj();
   
    iluminacaoDirectional();
    //iluminacaoSpot();
    
    scene.fog = new THREE.Fog( 0xcce0ff, 200, 500 );
   
    ambientLight = new THREE.AmbientLight( 0x888888 );
    ambientLight.intensity = 1;



    //pixel = objeto.pixel[][] * ambiente.color * intensidade

    scene.add(ambientLight);


    camera.position.z = 100;
    camera.position.y = 20;

    render();
    
    


    document.addEventListener('keydown', onKeyDown );
    document.addEventListener('keyup', onKeyUp ); 

   // document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    //document.addEventListener('mouseup', onMouseUp ); 
    //document.addEventListener('mousemove', onMouseMouse ); 
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    let delta = clock.getDelta(); //pegando o offset do clock

    if(typeof mixer != "undefined"){ //faz a animação avançar de quadro (frame)
        mixer.update(delta); //
    }

    if (caminhandoF){ //andando para frente
        objCarregado[0].position.z += (ataque ? 0.1 : (correr ? 0.8 : 0.3) )*directionObject[0].z;
        // camera.position.z += (ataque ? 0.1 : (correr ? 0.8 : 0.3) )*directionObject[0].z;

    }else if (caminhandoA) { //andando para traz
        objCarregado[0].position.z -= 0.2*directionObject[0].x*directionObject[0].z;
        // camera.position.z -= 0.2*directionObject[0].x*directionObject[0].z;
    }
    else if (caminhandoE) { //andando para traz
        objCarregado[0].position.x += 0.2*directionObject[0].x*directionObject[0].z;
        // camera.position.x += 0.2*directionObject[0].x*directionObject[0].z;
    }
    else if (caminhandoD) { //andando para traz
        objCarregado[0].position.x -= 0.2*directionObject[0].x*directionObject[0].z;
        // camera.position.x -= 0.2*directionObject[0].x*directionObject[0].z;
    }

   // camControls.update(delta);

 if (loadFinished)
    for(i=0; i< 7; i++) { //arvores
        if (boudingTree[i].intersectsBox(boudingBox[0])){
            
            //detecção mias fina do elemento.
            console.log("Funfa");
            setAction(animationActions[3]);
        }
    }
    
    
    bouding.forEach(a => { //fazer a caixinha acompanha
        a.update();
    });


     if (loadFinished) //translada a o box do meu elemento
        boudingBox[0].setFromObject(objCarregado[0].children[0]);


    controls.update();    
    
    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;
var luz = false;
var caminhandoF = false;
var caminhandoA = false;
var caminhandoE = false;
var caminhandoD = false;
var correr = false;

var apertando = false;

var onKeyUp = function(e){
    console.log("parou de apertar "+ e.keyCode);
    if (e.keyCode == 87){ //tecla W
        setAction(animationActions[2]);    
        caminhandoF = false;
    }
    if (e.keyCode == 83){ //tecla S
        setAction(animationActions[2]);
        caminhandoA = false;
    }
    if (e.keyCode == 65){ //tecla A
        setAction(animationActions[2]);
        caminhandoE = false;
    }
    if (e.keyCode == 68){//tecla D
        setAction(animationActions[2]);
        caminhandoD = false;
    }
}

var onKeyDown = function(e){
    console.log(e.keyCode);
    if(e.keyCode == 67){ //tecla C
        correr = !correr;
    }

    // if(e.keyCode == 65){ //tecla A
    //     ataque = !ataque;
    //     console.log("ataque: "+ ataque);
    // }

    if(e.keyCode == 87){ //tecla W
        
        if (ataque)
            setAction(animationActions[5]);
        else
            if (correr)
                setAction(animationActions[0]); //animação de correr
            else 
                setAction(animationActions[1]); //animação caminhando
        
        caminhandoF = true;
    }
    if(e.keyCode == 83){ //tecla S
        setAction(animationActions[1]);
        caminhandoA = true;
    }
    if(e.keyCode == 65){ //tecla A
        caminhandoE = true;
    }
    if(e.keyCode == 68){ //tecla D
       caminhandoD = true;
    }

    if (e.keyCode == 32){ //espaço -> rotação pelo pivo.
       
        if (objCarregado[0].rotation.y == 0){
            objCarregado[0].rotation.y = Math.PI;
            directionObject[0].z = -1;
        } else {
            objCarregado[0].rotation.y = 0;
            directionObject[0].z = 1;
        }
       

        
    }
    if (e.keyCode == 76){
        luz = !luz;
        if (luz)
            spotLight.intensity = 1;
        else
            spotLight.intensity = 0;
         
    }
    if(e.keyCode == 87){
        spotLight.target = objCarregado[1];
        helperSpot.update();
    }
    if(e.keyCode == 83){
        spotLight.target = objCarregado[1];
        helperSpot.update();
    }

    if(e.keyCode == 27){
       // controls.activeLook = !controls.activeLook;
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

       //camera.rotation.x += toRadians(deltaMovimento.y*0.5)*0.1;
        camera.rotation.y += toRadians(deltaMovimento.x*0.1)*0.1;
      
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

var stop = false;