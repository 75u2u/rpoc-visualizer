var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersectedObject, mouseOn;

camera.position.z = 400;
camera.position.y = 250;
camera.position.x = 0;
camera.lookAt(new THREE.Vector3());

renderer.setSize(window.innerWidth, window.innerHeight);

// Plane
var planeGeo = new THREE.PlaneGeometry(1000, 1000);
var planeMat = new THREE.MeshBasicMaterial({ color: 'gray' });
planeMat.side = THREE.DoubleSide;
var plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x += 1.5708;
///scene.add(plane);

// Objects
var ReceiveData = 0; ////
var Data = 0; ////
var sphereGeo = new THREE.SphereGeometry(5, 32, 32);
var sphere1Geo = new THREE.SphereGeometry(40, 32, 32);
var cubeGeo = new THREE.BoxGeometry(100, 50, 100);
var cylinderGeo = new THREE.CylinderGeometry(50, 50, 50, 8); // top,bottom,height,segment

var taroMat = new THREE.MeshNormalMaterial();
var hanakoMat = new THREE.MeshNormalMaterial();
var jammerMat = new THREE.MeshBasicMaterial({ color: 'blue' });
var packetMat = new THREE.MeshNormalMaterial();

var taro = new THREE.Mesh(cylinderGeo, taroMat);
var hanako = new THREE.Mesh(cylinderGeo, hanakoMat);
var jammer = new THREE.Mesh(sphere1Geo, jammerMat);
var packet= new THREE.Mesh(sphereGeo, packetMat);

taro.position.y = 25
taro.position.x = -205
hanako.position.y = 25
hanako.position.x = 205
jammer.position.y = 25
jammer.position.x = 0
packet.position.y = 25
packet.position.x = -205
scene.add(taro);
scene.add(hanako);
scene.add(jammer);
scene.add(packet);
/*
//頂点座標の配列
const points = [];
points.push(new THREE.Vector3(-205,25,0));
points.push(new THREE.Vector3(-200,25,0));
//頂点座標の配列からBufferGeometryを生成
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial();
const line = new THREE.Line(geometry,material);
scene.add(line);
*/
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


// Sprite関係
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
  { x: -205, y: 80, z: 0 }
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
  { x: 205, y: 80, z: 0 }
);

const canvasRect3Texture = new THREE.CanvasTexture(
  createCanvasForTexture(canvasWidth, canvasHeight, ReceiveData + '/100', 120)
);
createSprite(
  canvasRect3Texture,
  {
    x: scaleMaster,
    y: scaleMaster * (canvasHeight / canvasWidth),
    z: scaleMaster,
  },
  { x: 205, y: 30, z: 80 }
);

const canvasRect4Texture = new THREE.CanvasTexture(
  createCanvasForTexture(canvasWidth, canvasHeight, Data + '/100', 120)
);
createSprite(
  canvasRect4Texture,
  {
    x: scaleMaster,
    y: scaleMaster * (canvasHeight / canvasWidth),
    z: scaleMaster,
  },
  { x: -205, y: 30, z: 80 }
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

f();

function f() {
  requestAnimationFrame(f);
  taro.rotation.y += 0.01;
  hanako.rotation.y += 0.01;
  if(packet.position.x <= 205) { packet.position.x += 5; line.position.x += 5; }
  //if(line.position.x <= 205) { packet.position.x += 5; line.position.x += 5; }
  else { packet.position.x = -205; line.position.x = -205; ReceiveData += 1; }
  // レンダリング
  renderer.render(scene, camera);
}

var count = 0; //カウントの初期値
var timerID = setInterval('countup()',1000); //1秒毎にcountup()を呼び出し

function countup() {
  count++;
  //document.form_count.counter.value = count;
  document.getElementById('time').innerHTML = count;
}