const SELECT = document.querySelector("#seleksi");
const SCORE = document.querySelector("#score");
const PLAY_BUTTON = document.querySelector("#play-button");
const GAMEOVER = document.querySelector("#gameover");
const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

scene.add(new THREE.DirectionalLight(0xffffff, 0.8));
scene.add(new THREE.AmbientLight(0xffffbb, 0.5));

const randomInRange = (from, to, convertInt = false) => {
  let x = Math.random() * (to - from);

  if (convertInt) return Math.floor(x + from);
  return x + from;
};

let colorArr = [0xff0000,0x00ff00,0x0000ff,0xffff00,0x00ffff,0xff00ff];
const creatediamond = (color = Math.random() * 0xffffff) => {
  const diamond = new THREE.Mesh(
    new THREE.OctahedronGeometry(3),
    new THREE.MeshPhysicalMaterial({ color: color })
  );
  diamond.reflectivity = 1;
  diamond.click = false;
  diamond.name = "diamond";
  diamond.coupleColor = color;
  diamond.position.x = randomInRange(-20, 20);
  diamond.position.y = randomInRange(-20, 20);
  return diamond;
};

const sizes = {
  width: 0.9 * window.innerWidth,
  height: 0.9 * window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 50);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const rayCast = new THREE.Raycaster();
const mouse = new THREE.Vector2();
mouse.x = mouse.y = -1;

let gameOver = true;
let selected = [];
let spawnSpeed = 0.005;
let bufferSpeed = 0;
let objectCount = 0;
let colorTemp = 0x000000;

PLAY_BUTTON.addEventListener("click", () => {
  gameOver = false;
  selected = [];
  spawnSpeed = 0.005;
  bufferSpeed = 0;
  objectCount = 0;

  for (; scene.children.length > 2; ) {
    scene.remove(scene.children[2]);
  }

  PLAY_BUTTON.disabled = true;
  SCORE.innerHTML = 0;
  GAMEOVER.style.display = "none";
});

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

canvas.addEventListener("click", (e) => {
  if (!gameOver) {
    mouse.x = (e.offsetX / sizes.width) * 2 - 1;
    mouse.y = -(e.offsetY / sizes.height) * 2 + 1;
    rayCast.setFromCamera(mouse, camera);
    let items = rayCast.intersectObjects(scene.children, false);
    let selectFirstItem = true;
    items.forEach((item) => {
      if (item.object.visible && !item.object.click && selectFirstItem) {
        selected.push(item.object);
        item.object.material.color.set(0xffffff);
        item.object.click = true;
        selectFirstItem = false;
      }
      else if (item.object.visible && item.object.click){
        item.object.material.color.set(selected[0].coupleColor);
        selected.pop(item.object);
        item.object.click = false;
        selectFirstItem = true;
      }
    });

    if (selected.length == 2) {
      if (selected[0].coupleColor == selected[1].coupleColor) {
        // console.log("cocok");
        objectCount-=2;
        selected.forEach((select) => {
          select.visible = false;
          select.material.color.set(select.coupleColor);
          select.click = false;
        });
        SCORE.innerHTML++;
      } else {
        // console.log("salah");
        selected.forEach((select) => {
          select.material.color.set(select.coupleColor);
          select.click = false;
        });
      }
      selected = [];
    }
  }
});

const mainLoop = () => {
  if (!gameOver) bufferSpeed += spawnSpeed;
    if (bufferSpeed >= 1) {
    let diamond = creatediamond(colorArr[randomInRange(0,5,true)]);
    scene.add(diamond);
    objectCount++;

    bufferSpeed = 0;
    spawnSpeed += 0.0002;
  }

  if (objectCount>10) {
    gameOver = true;
    PLAY_BUTTON.disabled = false;
    GAMEOVER.style.display = "block";
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(mainLoop);
};

mainLoop();