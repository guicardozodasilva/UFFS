var scene;
var camera;
var renderer;
var controls;

var skybox;
var plane;

var objLoader;
var textureLoader;

//iluminação
var spotLight;
var ambientLight;
var directionalLight;

var objCarregado = [];

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
        z:0
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
    
    gui.open();
   
};

var criaGround = function (){

    var materialArray = [];
    var texture_ft = new THREE.TextureLoader().load( 'assets/texture/meadow/meadow_ft.jpg');
    var texture_bk = new THREE.TextureLoader().load( 'assets/texture/meadow/meadow_bk.jpg');
    var texture_up = new THREE.TextureLoader().load( 'assets/texture/meadow/meadow_up.jpg');
    var texture_dn = new THREE.TextureLoader().load( 'assets/texture/meadow/meadow_dn.jpg');
    var texture_rt = new THREE.TextureLoader().load( 'assets/texture/meadow/meadow_rt.jpg');
    var texture_lf = new THREE.TextureLoader().load( 'assets/texture/meadow/meadow_lf.jpg');
      
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
    
    textureLoader = new THREE.TextureLoader();
    planeTexture = textureLoader.load('assets/texture/palco_festa/Tiles074_2K_Color.jpg');
    
    material = new THREE.MeshStandardMaterial({map : planeTexture});
    material.normalMap =  textureLoader.load('assets/texture/palco_festa/Tiles074_2K_Normal.jpg');
    
    plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 10, 10),
        material
    );
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;

    scene.add(plane);

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
    directionalLight.target = plane;

    scene.add(directionalLight);
    scene.add(directionalLight.target);

    scene.add(new THREE.DirectionalLightHelper(directionalLight));

}

var loadObj = function(){
    objLoader = new THREE.OBJLoader();
    fbxLoader = new THREE.FBXLoader();
    textureLoader = new THREE.TextureLoader();
    
    fbxLoader.load( 'assets/models/adam.fbx', function ( object ) {
        objCarregado.push(object);
        object.scale.set(0.25, 0.25, 0.25);

        object.traverse( function ( child ) {

            if ( child.isMesh ) {

                child.material.shininess = 0;
                child.castShadow = true;
                child.receiveShadow = true;

            }

        } );    

        object.position.z = 0;
        object.position.x = 0;
        object.position.y = 0;
        object.rotation.y = 5;
        scene.add( object );

    } );

}

var init = function() {

    scene = new THREE.Scene();

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1;
    const far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(10, 20, -100);

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

    renderer.render(scene,camera);

    requestAnimationFrame(render);

}

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

var stop = false;