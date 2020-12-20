var scene;
var camera;
var renderer;
var controls;

var skybox;

var objLoader;
var textureLoader;

//iluminação
var spotLight;
var ambientLight;
var directionalLight;

var mixer;//mixer: THREE.AnimationMixer;
var modelReady = false;
var animationActions = Array();
var activeAction = THREE.AnimationAction;
var lastAction = THREE.AnimationAction;

var objCarregado = [];
var directionObject = [];
var animationsFolder;

var vanguard;

var clock = new THREE.Clock();

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
        default: function () {
            vanguard.position.x = 0;
            vanguard.position.y = 0;
            vanguard.position.z = 0;
            setAction(animationActions[0])
        },
        samba: function () {
            vanguard.position.x = 0; 
            vanguard.position.y = 0;
            vanguard.position.z = 0;
            setAction(animationActions[1])
        },
        bellydancing: function () {
            vanguard.position.x = 0;
            vanguard.position.y = 0;
            vanguard.position.z = 0;
            setAction(animationActions[2])
        },
        goofy_running: function () {
            vanguard.position.x = 0;
            vanguard.position.y = 0;
            vanguard.position.z = 0;
            setAction(animationActions[3])
        },
        look_around: function () {
            vanguard.position.x = 0;
            vanguard.position.y = 0;
            vanguard.position.z = 0;
            setAction(animationActions[4])
        },
        sleeping_idle: function () {
            vanguard.position.x = 0;
            vanguard.position.y = 0;
            vanguard.position.z = 0;
            setAction(animationActions[5])
        },
        jazz_dancing: function () {
            vanguard.position.x = 0;
            vanguard.position.y = 0;
            vanguard.position.z = 0;
            setAction(animationActions[6])
        },
        breakdance_freezes: function () {
            vanguard.position.x = -100;
            vanguard.position.y = -40;
            vanguard.position.z = 25;
            setAction(animationActions[7])
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
    });


    var pastaDir = gui.addFolder("Luz Direcional");
    var scalep = pastaDir.add(param, 'escalaD').min(0).max(5).step(0.1).name("Luz Direc");
    scalep.onChange(function (parametroQualquer){
        ambientLight.intensity = parametroQualquer;
    });
    var colore = pastaDir.addColor(param, 'corD').name("Cor Directional");
    colore.onChange(function (parametroQualquer){
        ambientLight.color.setHex(parametroQualquer.replace("#", "0x"));
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

    animationsFolder = gui.addFolder("Animations");
    
    gui.open();
   
};

var criaGround = function (){

    var materialArray = [];
    var texture_ft = new THREE.TextureLoader().load( 'assets/texture/sky/sky_ft.jpg');
    var texture_bk = new THREE.TextureLoader().load( 'assets/texture/sky/sky_bk.jpg');
    var texture_up = new THREE.TextureLoader().load( 'assets/texture/sky/sky_up.jpg');
    var texture_dn = new THREE.TextureLoader().load( 'assets/texture/sky/sky_dn.jpg');
    var texture_rt = new THREE.TextureLoader().load( 'assets/texture/sky/sky_rt.jpg');
    var texture_lf = new THREE.TextureLoader().load( 'assets/texture/sky/sky_lf.jpg');
      
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

    for (var i = 0; i < 6; i++)
       materialArray[i].side = THREE.BackSide;
    var skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
    skybox = new THREE.Mesh( skyboxGeo, materialArray );
    scene.add( skybox );

}

var iluminacaoDirectional = function(){

    directionalLight = new THREE.DirectionalLight(0xffffff, 1, 1000);
    directionalLight.position.y = 250;
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.left = 1000;
    directionalLight.shadow.camera.bottom = 1000;
    directionalLight.shadow.camera.right = -1000
    directionalLight.shadow.camera.top = -1000;

    directionalLight.target = skybox;

    scene.add(directionalLight);
    scene.add(directionalLight.target);

    scene.add(new THREE.DirectionalLightHelper(directionalLight));

}

var loadObj = function(){
    objLoader = new THREE.OBJLoader();
    fbxLoader = new THREE.FBXLoader();
    textureLoader = new THREE.TextureLoader();

    fbxLoader.load(
        'assets/models/airplane.fbx', //arquivo que vamos carregar
        function(object){
            airplane = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.shininess = 0;
                        }
                    });

            airplane.scale.x = 0.5;
            airplane.scale.y = 0.5;
            airplane.scale.z = 0.5;
            airplane.position.y = -33;
            airplane.castShadow = true;
            scene.add(airplane); 

        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load( 'assets/models/vanguard_t_choonyung.fbx', function ( object ) {

        object.scale.set(0.25, 0.25, 0.25);
        mixer = new THREE.AnimationMixer(object);
        vanguard = object;

        let animationAction = mixer.clipAction(object.animations[0]);
        animationActions.push(animationAction);
        animationsFolder.add(param, "default");
        activeAction = animationActions[0];

        scene.add( object );

        //add an animation from another file
        fbxLoader.load('assets/animations/samba.fbx', function (object) {
            
            console.log("loaded samba");

            let animationAction = mixer.clipAction(object.animations[0]);
            animationActions.push(animationAction);    
            animationsFolder.add(param, "samba");

            fbxLoader.load('assets/animations/bellydancing.fbx', function (object) {
            
                console.log("loaded Bellydancing");
    
                let animationAction = mixer.clipAction(object.animations[0]);
                animationActions.push(animationAction);    
                animationsFolder.add(param, "bellydancing");

                fbxLoader.load('assets/animations/goofy_running.fbx', function (object) {
            
                    console.log("loaded goofy running");
        
                    let animationAction = mixer.clipAction(object.animations[0]);
                    animationActions.push(animationAction);    
                    animationsFolder.add(param, "goofy_running");

                    fbxLoader.load('assets/animations/look_around.fbx', function (object) {
            
                        console.log("loaded look around");
            
                        let animationAction = mixer.clipAction(object.animations[0]);
                        animationActions.push(animationAction);    
                        animationsFolder.add(param, "look_around");

                        fbxLoader.load('assets/animations/sleeping_idle.fbx', function (object) {
            
                            console.log("loaded sleeping_idle");
                
                            let animationAction = mixer.clipAction(object.animations[0]);
                            animationActions.push(animationAction);    
                            animationsFolder.add(param, "sleeping_idle");

                            fbxLoader.load('assets/animations/jazz_dancing.fbx', function (object) {
            
                                console.log("loaded jazz_dancing");
                    
                                let animationAction = mixer.clipAction(object.animations[0]);
                                animationActions.push(animationAction);    
                                animationsFolder.add(param, "jazz_dancing");

                                fbxLoader.load('assets/animations/breakdance_freezes.fbx', function (object) {
            
                                    console.log("loaded breakdance_freezes");
                                    
                                    let animationAction = mixer.clipAction(object.animations[0]);
                                    animationActions.push(animationAction);    
                                    animationsFolder.add(param, "breakdance_freezes");
                                } );
                                
                            } );

                        } );

                    } );

                } );
            
            
            } );

        } );
        
    } );

}

const setAction = function(toAction) {

    if (toAction == activeAction)
        console.log("me, eh igual");

    if (toAction != activeAction) {
        lastAction = activeAction;
        activeAction = toAction;
        lastAction.stop();
        activeAction.reset();
        activeAction.play();
    }
}

var init = function() {

    scene = new THREE.Scene();

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1;
    const far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(10, 100, -200);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);

    criaGround();

    guiFunction();

    loadObj();

    iluminacaoDirectional();
    ambientLight = new THREE.AmbientLight( 0x888888 );
    ambientLight.intensity = 1;
    scene.add(ambientLight);

    render();

}

var render = function() {

    requestAnimationFrame(render);

    let delta = clock.getDelta(); //pegando o offset do clock

    if(typeof mixer != "undefined"){ //faz a animação avançar de quadro (frame)
        mixer.update(delta); //
    }

    renderer.render(scene,camera);

}

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

var stop = false;