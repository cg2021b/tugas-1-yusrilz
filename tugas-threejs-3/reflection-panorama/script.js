const createSphere = (
    radius,
    heightSeg,
    widthSeg,
    color = Math.random() * 0xffffff,
    position = [0, 0, 0]
  ) => {
    const cube = new THREE.Mesh(
      new THREE.SphereGeometry(radius, heightSeg, widthSeg),
      new THREE.MeshPhongMaterial({ color: color })
    );
  
    cube.position.x = position[0];
    cube.position.y = position[1];
    cube.position.z = position[2];
    return cube;
  };

//========== Canvas
const canvas = document.querySelector("canvas.webgl");

//========== Buat Scene
const scene = new THREE.Scene();
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  "cubemap/posx.png",
  "cubemap/negx.png",
  "cubemap/posy.png",
  "cubemap/negy.png",
  "cubemap/posz.png",
  "cubemap/negz.png",
]);
scene.background = texture;

//========== Create Lighting
scene.add(new THREE.DirectionalLight(0xffffff, 0.8));
scene.add(new THREE.AmbientLight(0xd1fff0, 0.9));

//========== Create Geometry

// Create cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
  format: THREE.RGBFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
});

// Create cube camera
const cubeCamera = new THREE.CubeCamera(1, 100000, cubeRenderTarget);
cubeCamera.position.set(0, 0, 0);
scene.add(cubeCamera);

const reflectSphere = new THREE.Mesh(
  new THREE.SphereGeometry(200, 150, 150),
  new THREE.MeshLambertMaterial({
    color: 0xffffff,
    envMap: cubeRenderTarget.texture,
  })
);
reflectSphere.position.set(0, 0, 0);
scene.add(reflectSphere);

// ====== Sizing
const sizes = {
  width: 0.9 * window.innerWidth,
  height: 0.9 * window.innerHeight,
};

//========= Pengaturan Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  2000
);
camera.position.set(0, 400, 800);

const orbitControls = new THREE.OrbitControls(camera, canvas);
orbitControls.target.set(0, 5, 0);
orbitControls.enableZoom = false;
orbitControls.dampingFactor = 0.5;
orbitControls.enableDamping = true;
orbitControls.enableRotate = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antiAlias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ================== Interaction
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
  reflectSphere.visible = false;
  cubeCamera.update(renderer, scene);
  reflectSphere.visible = true;
  orbitControls.update();
  window.requestAnimationFrame(mainLoop);
};

mainLoop();