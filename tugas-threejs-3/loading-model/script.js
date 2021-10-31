var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });

camera.position.z += 4;
camera.position.y += 3;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0xffffff);

renderer.setSize(window.innerWidth, 0.9*window.innerHeight);

window.addEventListener("resize", function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  camera.aspect = this.window.innerWidth / this.window.innerHeight;
  camera.updateProjectionMatrix();
});

var controls = new THREE.OrbitControls(camera, renderer.domElement);

let shiba;
let loader = new THREE.GLTFLoader().load("shiba/scene.gltf", function (result) {
  shiba = result.scene.children[0];
  shiba.castShadow = true;
  scene.add(shiba);
});

const hlight = new THREE.AmbientLight(0x404040, 25);
scene.add(hlight);

function updateScene() {
  renderer.render(scene, camera);
  requestAnimationFrame(updateScene);
}

updateScene();