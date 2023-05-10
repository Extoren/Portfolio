let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// oppdater kameraets sideforhold når størrelsen på vinduet endres
window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let gltfLoader = new THREE.GLTFLoader();
// define a variable to hold the child object
var screenMesh;

// load the house glb file
gltfLoader.load(
  'Portfolio 2.0 English.glb',
  function (gltf) {
    houseMesh = gltf.scene;
    houseMesh.scale.set(0.05, 0.05, 0.05);

    // load the screen glb file
    gltfLoader.load(
      'Screen 1.3.glb',
      function (gltf) {
        screenMesh = gltf.scene;
        screenMesh.scale.set(0.92, 0.92, 0.92);

        // add the screen as a child of the house
        houseMesh.add(screenMesh);

        // set the position of the screen relative to the house
        screenMesh.position.set(0, 2, -3);
      },
    );

    scene.add(houseMesh);
  },
);

// define a function to set the color of the child object
function setColor() {
  // generate random RGB values
  var r = Math.random();
  var g = Math.random();
  var b = Math.random();

  // set the color of the child object
  if (screenMesh) {
    screenMesh.traverse(function (node) {
      if (node.isMesh) {
        node.material.color.setRGB(r, g, b);
      }
    });
  }
}

// call setColor every second
setInterval(setColor, 1000);







//bare for lys
var ambientLight = new THREE.AmbientLight(0xffffff, 1);
ambientLight.position.set(0, 1000, 500);
scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(0, 00, -0);
scene.add(pointLight);


camera.position.z = 0; //How close
camera.position.y = 1; //Up and down
camera.position.x = 0; //right or left


let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let cameraX = 0;
let cameraZ = 0;

function onKeyDown(event) {
  switch (event.keyCode) {
    case 87: // W
      moveForward = true;
      break;
    case 83: // S
      moveBackward = true;
      break;
    case 68: // A
      moveLeft = true;
      camera.position.x -= 1; // flytt kameraet til venstre langs x-aksen
      break;
    case 65: // D
      moveRight = true;
      camera.position.x += 1; // flytt kameraet til høyre langs x-aksen
      break;
  }
}

function onKeyUp(event) {
  switch (event.keyCode) {
    case 87: // W
      moveForward = false;
      break;
    case 83: // S
      moveBackward = false;
      break;
    case 68: // A
      moveLeft = false;
      break;
    case 65: // D
      moveRight = false;
      break;
  }
}

function animate() {
  requestAnimationFrame(animate);

  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);

  //beveg høyre og venstre basert på kamera retning
  if (moveLeft || moveRight) {
    const directionFactor = cameraDirection.z >= 0 ? 1 : -1;
    cameraX += (moveLeft ? -0.05 : 0.05) * directionFactor;
  }

  //beveg fram og tilbake basert på kamera retning
  if (moveForward || moveBackward) {
    const directionFactor = cameraDirection.x >= 0 ? 1 : -1;
    cameraX += (moveForward ? 0.05 : -0.05) * directionFactor;
  }

  camera.position.x = cameraX;
  camera.position.z = cameraZ;

  renderer.render(scene, camera);
}




document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

animate();






// mus locker
function lockPointer() {
  var pointerLockElement = document.getElementById('pointer-lock');

  pointerLockElement.addEventListener('click', function() {
    pointerLockElement.requestPointerLock = pointerLockElement.requestPointerLock || pointerLockElement.mozRequestPointerLock || pointerLockElement.webkitRequestPointerLock;
    pointerLockElement.requestPointerLock();
  }, false);

  document.addEventListener('pointerlockchange', onPointerLockChange, false);
  document.addEventListener('mozpointerlockchange', onPointerLockChange, false);
  document.addEventListener('webkitpointerlockchange', onPointerLockChange, false);

  function onPointerLockChange() {
    if (document.pointerLockElement === pointerLockElement || document.mozPointerLockElement === pointerLockElement || document.webkitPointerLockElement === pointerLockElement) {
      document.addEventListener('mousemove', onMouseMove, false);
      mouseLocked = true;
    } else {
      document.removeEventListener('mousemove', onMouseMove, false);
      mouseLocked = false;
    }
  }


  var cameraOrientation = new THREE.Vector3(0, 0, -1);
var zoomSpeed = 0.1; // Adjust this value to change the speed of the zoom

function onMouseMove(event) {
  var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
  var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

  if (mouseLocked) {
    // Calculate the new rotation angles and position for the camera based on mouse movements
    var rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), -movementY * 0.002);
    var rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), -movementX * 0.002);
    var rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3().crossVectors(cameraOrientation, camera.up), -movementY * 0.002);

    cameraOrientation.applyMatrix4(rotationX);
    cameraOrientation.applyMatrix4(rotationY);
    cameraOrientation.applyMatrix4(rotationZ);

    camera.lookAt(camera.position.clone().add(cameraOrientation));
  }
}


//zoom function
var cameraOrientation = new THREE.Vector3(0, 0, -1);
var zoomSpeed = 0.1;
var maxZoom = 2; // The maximum allowed zoom level
var minZoom = 1; // The minimum allowed zoom level

function onMouseWheel(event) {
  var zoomDelta = event.deltaY > 0 ? -1 : 1;
  var zoomAmount = zoomDelta * zoomSpeed;

  // Check if the new zoom level is within the allowed range
  var newZoom = camera.zoom + zoomAmount;
  if (newZoom > maxZoom || newZoom < minZoom) {
    return; // Do not update the zoom level if it's outside the allowed range
  }

  // Update the camera's zoom level and projection matrix
  camera.zoom = newZoom;
  camera.updateProjectionMatrix();
}

document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('wheel', onMouseWheel, false);

}
lockPointer ();
