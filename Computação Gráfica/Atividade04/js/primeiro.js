var scene;
var camera;
var renderer;

var create = function() {
    
    const geometryCircleBuffer = new THREE.CircleBufferGeometry(7, 24, Math.PI * 0.25, Math.PI * 1.5);
    const geometryIcosahedron = new THREE.IcosahedronBufferGeometry(7);
    const geometryOctahedron = new THREE.OctahedronBufferGeometry(7);
    const geometryGround = new THREE.PlaneBufferGeometry(100,100, 10);

    const materialCircleBuffer = new THREE.MeshBasicMaterial( { color: 'red' } );
    const materialIcosahedron = new THREE.MeshBasicMaterial( { color: 'blue' } );
    const materialOctahedron = new THREE.MeshBasicMaterial( { color: 'magenta' } );
    const materialGround = new THREE.MeshBasicMaterial( { color: 'green' } );

    circleBuffer = new THREE.Mesh(geometryCircleBuffer, materialCircleBuffer);
    icosahedron = new THREE.Mesh(geometryIcosahedron, materialIcosahedron);
    octahedron = new THREE.Mesh(geometryOctahedron, materialOctahedron);
    ground = new THREE.Mesh(geometryGround, materialGround);

    scene.add(circleBuffer);
    scene.add(icosahedron);
    scene.add(octahedron);
    scene.add(ground);
    
    circleBuffer.position.x = 15;
    circleBuffer.position.y = 15;
    circleBuffer.position.z = 10;

    icosahedron.position.x = -1;
    icosahedron.position.y = -5;
    icosahedron.position.z = 0;

    octahedron.position.x = -25;
    octahedron.position.y = 20;
    octahedron.position.z = 9;

    ground.rotation.x = - Math.PI / 2; // rotaciona para que ela fique paralela ao eixo X
    ground.position.y -= 30; // Posiciona o ground abaixo da nossa figura.

};

var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.create();

    camera.position.z = 100;

    render();

    document.addEventListener('keydown', onKeyDown); 
    document.addEventListener('keyup', onKeyUp);
  
};

var render = function() {

    requestAnimationFrame( render );

    renderer.render( scene, camera );

};

var onKeyDown = function(e){

    if (e.keyCode == 32){ //espaço
        camera.rotateY(toRadians(10))
    }

    if (e.keyCode == 81){ //Q
        camera.position.z += 1
    }

    if (e.keyCode == 65){ //A
        camera.position.z -= 1
    }

    if (e.keyCode == 38){ //Up
        camera.position.y += 1
    }

    if (e.keyCode == 40){ //Down
        camera.position.y -= 1
    }

    if (e.keyCode == 39){ //direita
        camera.position.x += 1
    }

    if (e.keyCode == 37){ //esquerda
        camera.position.x -= 1
    }

}

window.onload = this.init;

function toRadians(angle) {

    return angle * (Math.PI / 180);
    
}