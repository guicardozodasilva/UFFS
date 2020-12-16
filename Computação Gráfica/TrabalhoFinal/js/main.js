var scene, camera, renderer, controls;

var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,30000);
    camera.position.set(-900,-200,-900);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);
    controls.minDistance = 500;
    controls.maxDistance = 1500;

    criaGround();

    render();

}

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
    var skybox = new THREE.Mesh( skyboxGeo, materialArray );
    scene.add( skybox );  

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