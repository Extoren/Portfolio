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
let houseMesh;
let screenMesh;
const raycaster = new THREE.Raycaster();
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.set(-0, 1, -2.5);
scene.add(cubeMesh);

const parent = new THREE.Object3D();

// load the house glb file
gltfLoader.load(
  'Portfolio 2.0 English.glb',
  function (gltf) {
    houseMesh = gltf.scene;
    houseMesh.scale.set(0.05, 0.05, 0.05);

    // load the screen glb file
    gltfLoader.load(
      'Screen 1.glb',
      function (gltf) {
        screenMesh = gltf.scene;
        screenMesh.scale.set(0.05, 0.05, 0.05);

        // add the screen as a child of the parent
        parent.add(screenMesh);

        // add the house as a child of the parent
        parent.add(houseMesh);

        // set the position of the screen relative to the house
        screenMesh.position.set(0, 0, -0);
      },
    );
  },
);

scene.add(parent);

function onDocumentMouseDown(event) {
  raycaster.far = 100;
  event.preventDefault();
  raycaster.setFromCamera({ x: (event.clientX / window.innerWidth) * 2 - 1, y: -(event.clientY / window.innerHeight) * 2 + 1 }, camera);
  const intersects = raycaster.intersectObjects([houseMesh, screenMesh, cubeMesh, ...houseMesh.children]);
  if (intersects.length > 0) {
    intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
    if (intersects[0].object == screenMesh) {
      screenMesh.children.forEach(function (child) {
        child.material.color.setHex(Math.random() * 0xffffff);
      });
    }
  }
  console.log(screenMesh.children);
}

document.addEventListener('mousedown', onDocumentMouseDown, false);







//bare for lys
var pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(0, 2, -0);
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






function lockPointer() {
  var customCircle = document.getElementById('custom-circle');

  customCircle.addEventListener('mousedown', function(event) {
    event.stopPropagation();
    document.body.requestPointerLock();
  }, false);

  document.addEventListener('pointerlockchange', onPointerLockChange, false);
  document.addEventListener('mozpointerlockchange', onPointerLockChange, false);
  document.addEventListener('webkitpointerlockchange', onPointerLockChange, false);

  function onPointerLockChange() {
    if (document.pointerLockElement === document.body || document.mozPointerLockElement === document.body || document.webkitPointerLockElement === document.body) {
      document.addEventListener('mousemove', onMouseMove, false);
      mouseLocked = true;
    } else {
      document.removeEventListener('mousemove', onMouseMove, false);
      mouseLocked = false;
    }
  }

  function onMouseMove(event) {
    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
  
    if (mouseLocked) {
      var crosshair = document.getElementById('custom-crosshair');
      var crosshairRect = crosshair.getBoundingClientRect();
      var centerX = crosshairRect.left + crosshairRect.width / 2;
      var centerY = crosshairRect.top + crosshairRect.height / 2;
      var distance = Math.sqrt(Math.pow(event.clientX - centerX, 2) + Math.pow(event.clientY - centerY, 2));
  
      if (distance <= crosshairRect.width / 2) {
        var rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), -movementY * 0.002);
        var rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), -movementX * 0.002);
        var rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3().crossVectors(cameraOrientation, camera.up), -movementY * 0.002);
  
        cameraOrientation.applyMatrix4(rotationX);
        cameraOrientation.applyMatrix4(rotationY);
        cameraOrientation.applyMatrix4(rotationZ);
  
        camera.lookAt(camera.position.clone().add(cameraOrientation));
      }
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


