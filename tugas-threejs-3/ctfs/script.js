const randomInRange = (from, to, convertInt = false) => {
    let x = Math.random() * (to - from);
  
    if (convertInt) return Math.floor(x + from);
    return x + from;
  };
  
  //========== Texture Loader
  const textureLoader = new THREE.TextureLoader();
  const brickTexture = textureLoader.load("stone.jpg");
  
  const createCube = (
    width,
    height,
    depth,
    color = Math.random() * 0xffffff,
    position = [0, 0, 0]
  ) => {
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(depth, height, width),
      new THREE.MeshPhongMaterial({ color: color, map: brickTexture })
    );
  
    cube.position.x = position[0];
    cube.position.y = position[1];
    cube.position.z = position[2];
    return cube;
  };
  
  const createPlane = (width, height, color = Math.random() * 0xffffff) => {
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshPhongMaterial({
        color: color,
        side: THREE.DoubleSide,
        shininess: 0,
      })
    );
    return plane;
  };

//========== Canvas
const canvas = document.querySelector("canvas.webgl");

//========== Buat Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ff00);
scene.fog = new THREE.FogExp2(0xa7a69d, 0.005);

//========== Create Lighting
const dirLight1 = new THREE.DirectionalLight(0xffffff);
dirLight1.position.set(-700, 700, 100);
dirLight1.castShadow = true;

dirLight1.shadow.mapSize.width = 1024;
dirLight1.shadow.mapSize.height = 512;

dirLight1.shadow.camera.near = 100;
dirLight1.shadow.camera.far = 1200;

dirLight1.shadow.camera.left = -1000;
dirLight1.shadow.camera.right = 1000;
dirLight1.shadow.camera.top = 350;
dirLight1.shadow.camera.bottom = -350;

scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0xffffff);
dirLight2.position.set(-1, -1, -1);
scene.add(dirLight2);

const dirLight3 = new THREE.DirectionalLight(0xffffff, 0.2);
dirLight3.position.set(1500, 900, 100);
dirLight3.castShadow = true;

dirLight3.shadow.mapSize.width = 1024;
dirLight3.shadow.mapSize.height = 512;

dirLight3.shadow.camera.near = 100;
dirLight3.shadow.camera.far = 1200;

dirLight3.shadow.camera.left = -1000;
dirLight3.shadow.camera.right = 1000;
dirLight3.shadow.camera.top = 350;
dirLight3.shadow.camera.bottom = -350;

scene.add(dirLight3);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

//=========== Create Geometry
ground = createPlane(16000, 16000, 0x00ff00);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

for (let i = 1; i <= 25; i++) {
  for (let j = 1; j <= 25; j++) {
    let positionX = -400 + 70 * i;
    let positionZ = -400 + j * 70;
    let sizeX = randomInRange(10, 15, true);
    let sizeY = randomInRange(20, 30, true);
    let sizeZ = randomInRange(10, 15, true);
    const geo = createCube(sizeX, sizeY, sizeZ);
    geo.castShadow = true;
    geo.receiveShadow = false;
    geo.position.x = positionX;
    geo.position.z = positionZ;
    geo.position.y += 0.5 * sizeY;
    scene.add(geo);
  }
}

// ====== Sizing
const sizes = {
  width: 0.9 * window.innerWidth,
  height: 0.9 * window.innerHeight,
};

//========= Pengaturan Camera
camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  4000
);
camera.position.set(0, 60, 130);

controls = new THREE.MapControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 100;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

//============= Render
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//=========== Interactive Action
// Sizing canvas
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = 0.9 * window.innerWidth;
  sizes.height = 0.9 * window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const mainLoop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(mainLoop);
};

mainLoop();