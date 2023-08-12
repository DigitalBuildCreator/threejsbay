import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.125.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.125.0/examples/jsm/controls/OrbitControls.js';
import { createSimpleGrid } from './grid.js'; // Make sure the path is correct!
import { addOriginAxes } from './origin.js'; // Make sure the path is correct!

let scene, camera, renderer, cube, controls, circle;

function createGradientTexture(colorTop, colorBottom) {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 2;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, colorTop);
    gradient.addColorStop(1, colorBottom);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return new THREE.CanvasTexture(canvas);
}

function createRadialGradientTexture(centerColor, outerColor) {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, centerColor);
    gradient.addColorStop(1, outerColor);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return new THREE.CanvasTexture(canvas);
}

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = createGradientTexture('#ADD8E6', '#FFFFFF');

    // Camera
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.x = 30;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: for softer shadow
    document.body.appendChild(renderer.domElement);

    const originAxes = addOriginAxes();
    scene.add(originAxes);

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    scene.add(cube);

    // createSimpleGrid(1 spacing, B spacing, extension length)
    const grid = createSimpleGrid(30, 30, 5);
    scene.add(grid);

    // Ground Circle with Radial Gradient
    // const circleGeometry = new THREE.CircleBufferGeometry(100, 32);
    // const circleMaterial = new THREE.MeshPhongMaterial({
    //     map: createRadialGradientTexture('rgba(255, 255, 255, 1)', 'rgba(173, 216, 230, 0)'),
    //     transparent: true,
    //     shininess: 0 // To reduce the shiny effect
    // });
    
    // circle = new THREE.Mesh(circleGeometry, circleMaterial);
    // circle.rotation.x = -Math.PI / 2;
    // circle.position.y = -0.6;
    // circle.receiveShadow = true;  // Circle will receive shadows
    // scene.add(circle);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(2, 4, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 100;
    scene.add(directionalLight);

    // OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();
