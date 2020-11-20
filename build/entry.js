fetch('./log.js').then(r=>{return r.text()}).then(t=>{
  // "t"にimport.jsのファイル内容が格納されているので
  eval(t); //その内容を実行する
});


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersectedObject, mouseOn;

camera.position.z = 450;
camera.position.y = 100;
camera.position.x = 0;
camera.lookAt(new THREE.Vector3());

renderer.setSize(window.innerWidth, window.innerHeight);

// Plane
//var planeGeo = new THREE.PlaneGeometry(1000, 1000);
//var planeMat = new THREE.MeshBasicMaterial({ color: 'gray' });
//planeMat.side = THREE.DoubleSide;
//var plane = new THREE.Mesh(planeGeo, planeMat);
//plane.rotation.x += 1.5708;
///scene.add(plane);

// Objects
var ReceiveData = 0; ////
var Data = 0; ////
var octahedronGeo = new THREE.OctahedronGeometry(100, 0);
var sphereGeo = new THREE.SphereGeometry(5, 32, 32);
var bigsphereGeo = new THREE.SphereGeometry(500, 32, 32);
var cubeGeo = new THREE.BoxGeometry(100, 50, 100);
var cylinderGeo = new THREE.CylinderGeometry(50, 50, 50, 8); // top,bottom,height,segment
var cylinderGeoEdges = new THREE.EdgesGeometry( cylinderGeo ); // 斜線の除去
var bigsphereGeoEdges = new THREE.EdgesGeometry( bigsphereGeo ); // 斜線の除去

var Mat = new THREE.LineBasicMaterial( { color: 0xff8844 } );
var taroMat = new THREE.MeshBasicMaterial({ color: 0xff8844, transparent: true, opacity: 0.8, });
var hanakoMat = new THREE.MeshBasicMaterial({ color: 0xff8844, transparent: true, opacity: 0.8, });
var jammerMat = new THREE.MeshBasicMaterial({ color: 'blue', transparent: true, opacity: 0.7, });
var jammerMat1 = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true, });

var taro = new THREE.LineSegments(cylinderGeoEdges, Mat);
var taro1 = new THREE.Mesh(cylinderGeo, taroMat);
var hanako = new THREE.LineSegments(cylinderGeoEdges, Mat);
var hanako1 = new THREE.Mesh(cylinderGeo, hanakoMat);
var jammer = new THREE.Mesh(octahedronGeo, jammerMat);
var jammer1 = new THREE.Mesh(octahedronGeo, jammerMat1);
var bigsphere = new THREE.LineSegments( bigsphereGeoEdges, Mat );

taro.position.y = 25
taro.position.x = -255
taro1.position.y = 25
taro1.position.x = -255
hanako.position.y = 25
hanako.position.x = 255
hanako1.position.y = 25
hanako1.position.x = 255
jammer.position.y = 25
jammer.position.x = 0
jammer1.position.y = 25
jammer1.position.x = 0
scene.add(taro);
scene.add(taro1);
scene.add(hanako);
scene.add(hanako1);
scene.add(jammer);
scene.add(jammer1);
scene.add(bigsphere);

// パケット
//頂点座標の配列
const points = [];
const points1 = [];
const line = [];
const line1 = [];
points.push(new THREE.Vector3(-255,25,0));
points.push(new THREE.Vector3(-245,25,0));
points1.push(new THREE.Vector3(255,25,0));
points1.push(new THREE.Vector3(245,25,0));
//頂点座標の配列からBufferGeometryを生成
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const geometry1 = new THREE.BufferGeometry().setFromPoints(points1);
const material = new THREE.LineBasicMaterial( {linewidth: 10} );

for(var c=0; c<1000; c++) {
  line[c] = new THREE.Line(geometry,material);
  line1[c] = new THREE.Line(geometry1,material);
//  scene.add(line[c]);
//  scene.add(line1[c]);
}

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
  ctx.fillStyle = 'rgba(243, 152, 0, 0.3)';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //
  ctx.fillStyle = "white"; // 文字色
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
const canvasWidth = 700;
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
  { x: 0, y: 160, z: 0 }
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
  { x: -255, y: 80, z: 0 }
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
  { x: 255, y: 80, z: 0 }
);

/*
const canvasRect3Texture = new THREE.CanvasTexture(
  createCanvasForTexture(canvasWidth, canvasHeight, ReceiveData + '/1000', 120)
);
createSprite(
  canvasRect3Texture,
  {
    x: scaleMaster,
    y: scaleMaster * (canvasHeight / canvasWidth),
    z: scaleMaster,
  },
  { x: 255, y: -30, z: 0 }
);

const canvasRect4Texture = new THREE.CanvasTexture(
  createCanvasForTexture(canvasWidth, canvasHeight, Data + '/1000', 120)
);
createSprite(
  canvasRect4Texture,
  {
    x: scaleMaster,
    y: scaleMaster * (canvasHeight / canvasWidth),
    z: scaleMaster,
  },
  { x: -255, y: -30, z: 0 }
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
  taro1.rotation.y += 0.01;
  hanako.rotation.y += 0.01;
  hanako1.rotation.y += 0.01;
  if(count > 0) {
    if(data[j][2] == "169.254.229.153") {
      scene.add(line[j]);
    }
    line[j].position.x += 10;
    if(line[j].position.x >= 250) {
      scene.remove(line[j]);
    }
    if(data[j][2] == "169.254.155.219") {
      scene.add(line1[j]);
    }
    line1[j].position.x -= 10;
    if(line1[j].position.x <= -250) {
      scene.remove(line1[j]);
    }


    /*
    if(data[j][2] == "169.254.155.219") {
      if(line[j--].position.x <= 255) {
        line[j--].position.x += 15;
      }
      else { scene.remove(line[j]); }
    }
    */
    //if(line1.position.x >= -255 && data[j][2] == "169.254.155.219") { line1.position.x -= 15;}
    //else { line[j].position.x = -255; line1[j].position.x = 255; ReceiveData += 1; }
  }
  // レンダリング
  renderer.render(scene, camera);
}
