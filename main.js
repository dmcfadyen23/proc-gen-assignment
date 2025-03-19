import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var scene;
var camera;
var renderer;

setScene();
var sides = 5;
var size = 4;
var length = 2;
var numGen = 0;
const shapeGroup = new THREE.Group();

addLighting();

let controls = new OrbitControls( camera, renderer.domElement );
renderer.setAnimationLoop(UpdateScene);

function UpdateScene() {
    controls.update();
    renderer.render(scene, camera);
}

function setScene() {
    scene = new THREE.Scene( );

    const ratio = window.innerWidth/window.innerHeight;
    camera = new THREE.PerspectiveCamera(30,ratio,0.1,1000);
    camera.position.set(0,7.5,-30);
    camera.lookAt(0,0,0);

    renderer = new THREE.WebGLRenderer( );
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement );
}



function setDepth(length, shape) {
    const extrudeSettings = {
        depth: length,
        bevelEnabled: true,
        bevelSize: 0,
        bevelOffset: 0,
        bevelThickness: length,
    }


    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var xTranslate = (Math.random()*20)-10;
    var yTranslate = (Math.random()*20)-10;
    var zTranslate = (Math.random()*12)-6;
    geometry.translate(xTranslate, yTranslate, zTranslate);

    var rColor = Math.random()*255;
    var gColor = Math.random()*255;
    var bColor = Math.random()*255;

    const shapeColor = new THREE.Color(Math.random(),Math.random(),Math.random());
    const material = {
        color: shapeColor,
        shininess: 100,
        transparent: true,
        opacity: 0.8,
    }

    const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial(material));
    scene.add(mesh)
}

function addLighting() {
    const cameraLight = new THREE.PointLight(new THREE.Color(1,1,1), 100);
    cameraLight.position.set(0, 0, 10);
    cameraLight.lookAt(0, 0, 0);
    scene.add(cameraLight);

    const ambientLight = new THREE.AmbientLight(new THREE.Color(1,1,1), 0.2);
    scene.add(ambientLight);
}

//Event Listeners
function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
}
window.addEventListener('resize', resize);

function AddShape(event) {
    if (event.keyCode == 32) {
        const shapePath = new THREE.Shape();
        var anglePer = 360/sides;
        
        shapePath.moveTo(size, 0);
        for (let i = 1; i <= sides; i++) {
            shapePath.lineTo( Math.cos(i*anglePer*(Math.PI/180))*size, Math.sin(i*anglePer*(Math.PI/180))*size );
        }
        
        
        // const points = shapePath.getPoints();
        var finalShape = setDepth(length, shapePath);
        // shapeGroup.add(finalShape);
        // numGen += 1;
    }
    
}

window.addEventListener('keydown', AddShape);