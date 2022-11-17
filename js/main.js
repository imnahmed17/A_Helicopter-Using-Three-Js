import * as THREE from "/js/three.module.js";

//Main Variables
var _scene, _camera, _renderer, temp=0;
//Mesh Variables
var cockpit, engine, tailPlane, sideWing, propeller, blade1, blade2, windshield;
var wheelProtecR, wheelTireR, wheelAxis, wheelProtecL, wheelTireL, wheelTireB, suspension;
var body, face, hair1, hair2;
//Light Variables
var pointLight, ambientLight;
//Colors
var Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
};

function init() {
    _scene = new THREE.Scene();

    _renderer = new THREE.WebGLRenderer({antialias: true});
    _renderer.setSize(innerWidth, innerHeight);
    _renderer.shadowMap.enabled = true;
    _renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(_renderer.domElement);

    //CAMERA
    _camera = new THREE.PerspectiveCamera(
        75, innerWidth / innerHeight, 0.1, 1000
    );
    const boom = new THREE.Group();
    boom.add(_camera);
    _scene.add(boom);
    _camera.position.set(0, 0, 5);
    _camera.lookAt(0, 0, 0);

    //LIGHTS
    ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    _scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xffffff, 1, 40);
    pointLight.position.set(0, 5, 0);
    pointLight.castShadow = true;
    _camera.add(pointLight);

    //SKYBOX
    var skybox = new THREE.CubeTextureLoader().load(
        [
            "Textures/BG/right.jpg",
            "Textures/BG/left.jpg",
            "Textures/BG/top.jpg",
            "Textures/BG/bottom.jpg",
            "Textures/BG/front.jpg",
            "Textures/BG/back.jpg"
        ]
    );
    _scene.background = skybox;

    //Textures
    var Texture1 = new THREE.TextureLoader().load('./Textures/blade.jpg');
    var Texture2 = new THREE.TextureLoader().load('./Textures/prop.jpg');
    var Texture3 = new THREE.TextureLoader().load('./Textures/cabin.jpg');
    var Texture4 = new THREE.TextureLoader().load('./Textures/engine.jpg');
    var Texture6 = new THREE.TextureLoader().load('./Textures/wind.jpg');

    // Body
    body = new THREE.Mesh(
        new THREE.BoxGeometry(0.45,0.45,0.45), 
        new THREE.MeshStandardMaterial({color: Colors.brown})
    );
    body.position.set(-0.26,0.66,0);
    body.castShadow = true;
	body.receiveShadow = true;
    _scene.add(body);

    // Hair
    hair1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.14,0.12,0.31), 
        new THREE.MeshLambertMaterial({color: Colors.brown})
    );
    hair1.position.set(-0.21,1.11,0);
    hair1.castShadow = true;
    hair1.receiveShadow = true;
    _scene.add(hair1);

    hair2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.27,0.14,0.31), 
        new THREE.MeshLambertMaterial({color: Colors.brown})
    );
    hair2.position.set(-0.38,1.06,0);
    hair2.castShadow = true;
    hair2.receiveShadow = true;
    _scene.add(hair2);

    // Face
    face = new THREE.Mesh(
        new THREE.BoxGeometry(0.3,0.3,0.3), 
        new THREE.MeshLambertMaterial({color: Colors.pink})
    );
    face.position.set(-0.3,0.89,0);
    face.castShadow = true;
    face.receiveShadow = true;
    _scene.add(face);

    // Create the cabin
	cockpit = new THREE.Mesh(
        new THREE.BoxGeometry(2.4,1.5,1.5), 
        new THREE.MeshStandardMaterial({map: Texture3, shading:THREE.FlatShading})
    );
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	_scene.add(cockpit);
    
    // Create the engine
	engine = new THREE.Mesh(
        new THREE.BoxGeometry(0.6,1.5,1.5), 
        new THREE.MeshStandardMaterial({map: Texture4})
    );
	engine.position.x = 1.5;
	engine.castShadow = true;
	engine.receiveShadow = true;
	_scene.add(engine);

    // Create the tail
	tailPlane = new THREE.Mesh(
        new THREE.BoxGeometry(0.5,0.6,0.15), 
        new THREE.MeshStandardMaterial({map: Texture6})
    );
	tailPlane.position.set(-1.2,0.7,0);
	tailPlane.castShadow = true;
	tailPlane.receiveShadow = true;
	_scene.add(tailPlane);

    // Create the wing
	sideWing = new THREE.Mesh(
        new THREE.BoxGeometry(0.9,0.15,3.6), 
        new THREE.MeshStandardMaterial({map: Texture6})
    );
    sideWing.position.set(0,0.45,0);
	sideWing.castShadow = true;
	sideWing.receiveShadow = true;
	_scene.add(sideWing);

    // Wind shield
    windshield = new THREE.Mesh(
        new THREE.BoxGeometry(0.09,0.55,0.6), 
        new THREE.MeshStandardMaterial({color: Colors.white, transparent: true, opacity: 0.3})
    );
    windshield.position.set(0.15,0.81,0);
    windshield.castShadow = true;
    windshield.receiveShadow = true;
    _scene.add(windshield);

    // propeller
	propeller = new THREE.Mesh(
        new THREE.BoxGeometry(0.6,0.3,0.3), 
        new THREE.MeshStandardMaterial({map: Texture2})
    );
    propeller.position.set(1.8, 0, 0);
	propeller.castShadow = true;
	propeller.receiveShadow = true;

    // blades
	blade1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.03,2.4,0.3), 
        new THREE.MeshStandardMaterial({map: Texture1})
    );
	blade1.position.set(0.24,0,0);
	blade1.castShadow = true;
	blade1.receiveShadow = true;

    blade2 = blade1.clone();
    blade2.rotation.x = Math.PI/2;
    blade2.castShadow = true;
    blade2.receiveShadow = true;

	propeller.add(blade1);
    propeller.add(blade2);
    _scene.add(propeller);

    //Wheels
    wheelProtecR = new THREE.Mesh(
        new THREE.BoxGeometry(0.9,0.45,0.3),
        new THREE.MeshStandardMaterial({map: Texture6})
    );
    wheelProtecR.position.set(0.75,-0.6,0.75);
    _scene.add(wheelProtecR);

    wheelTireR = new THREE.Mesh(
        new THREE.BoxGeometry(0.72,0.72,0.12),
        new THREE.MeshStandardMaterial({color: Colors.brownDark})
    );
    wheelTireR.position.set(0.75,-0.84,0.75);

    wheelAxis = new THREE.Mesh(
        new THREE.BoxGeometry(0.3,0.3,0.18),
        new THREE.MeshStandardMaterial({color: Colors.brown})
    );
    wheelTireR.add(wheelAxis);
    _scene.add(wheelTireR);

    wheelProtecL = wheelProtecR.clone();
    wheelProtecL.position.z = -wheelProtecR.position.z ;
    _scene.add(wheelProtecL);

    wheelTireL = wheelTireR.clone();
    wheelTireL.position.z = -wheelTireR.position.z;
    _scene.add(wheelTireL);

    wheelTireB = wheelTireR.clone();
    wheelTireB.scale.set(0.5,0.5,0.5);
    wheelTireB.position.set(-1.5,-0.06,0);
    _scene.add(wheelTireB);

    suspension = new THREE.Mesh(
        new THREE.BoxGeometry(0.12,0.6,0.12),
        new THREE.MeshStandardMaterial({map: Texture6})
    );
    suspension.position.set(-1.35,0.17,0);
    suspension.rotation.z = -0.5;
    _scene.add(suspension);

    document.onkeydown = function (e) {
        if (e.keyCode === 37) {             //LEFT
            boom.rotation.y += 0.05;
        } else if (e.keyCode === 39) {      //RIGHT
            boom.rotation.y -= 0.05;
        } else if (e.keyCode === 38) {       //UP
            boom.rotation.x += 0.05;
        } else if (e.keyCode === 40) {       //DOWN
            boom.rotation.x -= 0.05;
        } else if (e.keyCode === 83) {       //Start
            temp = 1;
        } else if (e.keyCode === 79) {       //Start
            temp = 0;
        }
    }

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if(temp == 1) {
        propeller.rotation.x += 0.4
    }

    _renderer.render(_scene, _camera);
}

init();
