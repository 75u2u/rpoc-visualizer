var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersectedObject, mouseOn;

camera.position.z = 300;
camera.position.y = 150;
camera.position.x = 0;
camera.lookAt(new THREE.Vector3());

renderer.setSize(window.innerWidth, window.innerHeight);

// Plane
var planeGeo = new THREE.PlaneGeometry(1000, 1000);
var planeMat = new THREE.MeshBasicMaterial({ color: 'gray' });
planeMat.side = THREE.DoubleSide;
var plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x += 1.5708
scene.add(plane);

// Objects
var cubeGeo = new THREE.BoxGeometry(100, 50, 100);
var taroMat = new THREE.MeshBasicMaterial({ color: 'orange' });
var hanakoMat = new THREE.MeshBasicMaterial({ color: 'orange' });
var jammerMat = new THREE.MeshBasicMaterial({ color: 'red' });
var taro = new THREE.Mesh(cubeGeo, taroMat);
var hanako = new THREE.Mesh(cubeGeo, hanakoMat);
var jammer = new THREE.Mesh(cubeGeo, jammerMat);

taro.position.y = 25
hanako.position.y = 25
jammer.position.y = 25
taro.position.x = -155
hanako.position.x = 155
jammer.position.x = 0
scene.add(taro);
scene.add(hanako);
scene.add(jammer);

var onMouseMove = function (e) {
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);
  if (!intersects[0]) {
    intersectedObject = null
  }
  if (intersects[0] && intersects[0].object !== intersectedObject) { 
      intersectedObject = intersects[0].object
  }
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

var onMouseDown = function (e) {
  console.log(intersectedObject)
};

var onKeyUp = function (e) {
  console.log(e.keyCode)
};

var animate = function () {
  controls.update;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();

var windowResizeHandler = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHandler();

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('keyup', onKeyUp, false);
window.addEventListener('resize', windowResizeHandler);

document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);




// ここからがSprite関係

// svgファイルのtextureを作成
const createTexture = (filePath) => {
  return new THREE.TextureLoader().load(filePath);
};
// spriteを作成し、sceneに追加
const createSprite = (texture, scale, position) => {
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(scale.x, scale.y, scale.z);
  sprite.position.set(position.x, position.y, position.z);

  scene.add(sprite);
};

const createCanvasForTexture = (canvasWidth, canvasHeight, text, fontSize) => {
  // 貼り付けるcanvasを作成。
  const canvasForText = document.createElement('canvas');
  const ctx = canvasForText.getContext('2d');
  ctx.canvas.width = canvasWidth;
  ctx.canvas.height = canvasHeight;
  // R, G, B, 透過率
  ctx.fillStyle = 'rgba(0, 0, 255, 0.6)';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //
  ctx.fillStyle = 'white';
  ctx.font = `${fontSize}px Modern`;
  ctx.fillText(
    text,
    // x方向の余白/2をx方向開始時の始点とすることで、横方向の中央揃えをしている。
    (canvasWidth - ctx.measureText(text).width) / 2,
    // y方向のcanvasの中央に文字の高さの半分を加えることで、縦方向の中央揃えをしている。
    canvasHeight / 2 + ctx.measureText(text).actualBoundingBoxAscent / 2
  );
  return canvasForText;
};

//
const canvasWidth = 500;
const canvasHeight = 200;
const scaleMaster = 100;
const canvasRectTexture = new THREE.CanvasTexture(
  createCanvasForTexture(canvasWidth, canvasHeight, 'Jammer', 120)
);
createSprite(
  canvasRectTexture,
  {
    x: scaleMaster,
    y: scaleMaster * (canvasHeight / canvasWidth),
    z: scaleMaster,
  },
  { x: 0, y: 80, z: 0 }
);

const canvasRect1Texture = new THREE.CanvasTexture(
  createCanvasForTexture(canvasWidth, canvasHeight, 'Taro', 120)
);
createSprite(
  canvasRect1Texture,
  {
    x: scaleMaster,
    y: scaleMaster * (canvasHeight / canvasWidth),
    z: scaleMaster,
  },
  { x: -150, y: 80, z: 0 }
);

const canvasRect2Texture = new THREE.CanvasTexture(
  createCanvasForTexture(canvasWidth, canvasHeight, 'Hanako', 120)
);
createSprite(
  canvasRect2Texture,
  {
    x: scaleMaster,
    y: scaleMaster * (canvasHeight / canvasWidth),
    z: scaleMaster,
  },
  { x: 150, y: 80, z: 0 }
);


/*
const wideImageTexture = createTexture(
  'https://dummyimage.com/200x100/4a9e62/fff.png'
);
createSprite(
  wideImageTexture,
  { x: 30, y: 30, z: 30 },
  { x: 20, y: 20, z: 20 }
);
createSprite(wideImageTexture, { x: 60, y: 30, z: 3 }, { x: 70, y: 20, z: 20 });
*/