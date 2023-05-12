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
const parent = new THREE.Object3D();

// load the house glb file
gltfLoader.load(
  'Portfolio 2.0 English.glb',
  function (gltf) {
    houseMesh = gltf.scene;
    houseMesh.scale.set(0.05, 0.05, 0.05);

    // load the screen glb file
    gltfLoader.load(
      'Face/Face.glb',
      function (gltf) {
        screenMesh = gltf.scene;
        screenMesh.scale.set(0.15, 0.15, 0.15);

        // add the screen as a child of the parent
        parent.add(screenMesh);

        // add the house as a child of the parent
        parent.add(houseMesh);

        // set the position of the screen relative to the house
        screenMesh.position.set(0, 0.8, -1.75);

        // create a vector to store the camera's position
        var cameraPosition = new THREE.Vector3();

        // create a quaternion to store the rotation of the screen
        var screenRotation = new THREE.Quaternion();

        // render loop to update the screen rotation based on the camera's position
        function render() {
          requestAnimationFrame(render);

          // get the camera's position
          cameraPosition.copy(camera.position);

          // set the screen to look at the camera
          screenMesh.lookAt(cameraPosition);

          // get the rotation of the screen
          screenRotation.copy(screenMesh.quaternion);

          // update the rotation of the screen relative to the house
          screenRotation.multiply(houseMesh.quaternion);

          // set the rotation of the screen
          screenMesh.setRotationFromQuaternion(screenRotation);

          // render the scene
          renderer.render(scene, camera);
        }

        // start the render loop
        render();
      },
    );
  },
);



scene.add(parent);

const overlay = document.querySelector("#overlay");
const closeBtns = document.querySelectorAll(".close-btn");

closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    overlay.style.display = "none";
  }
});




function onDocumentMouseDown(event) {
  raycaster.far = 100;
  event.preventDefault();
  raycaster.setFromCamera({ x: (event.clientX / window.innerWidth) * 2 - 1, y: -(event.clientY / window.innerHeight) * 2 + 1 }, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  intersects.forEach((intersect) => {
    if (intersect.object.material.name === 'Material.003') {
      overlay.style.display = 'block';
      document.getElementById('popup-material-003').style.display = 'block';
      setTimeout(function() {
        overlay.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 10);
      // Check if pointer lock is active
      if (document.pointerLockElement !== null) {
        // Exit pointer lock
        document.exitPointerLock();
      }
    } else if (intersect.object.material.name === 'Material.0031') {
      overlay.style.display = 'block';
      document.getElementById('popup-material-0031').style.display = 'block';
      setTimeout(function() {
        overlay.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 10);
      // Check if pointer lock is active
      if (document.pointerLockElement !== null) {
        // Exit pointer lock
        document.exitPointerLock();
      }
    } else if (intersect.object.material.name === 'Material.0032') {
      overlay.style.display = 'block';
      document.getElementById('popup-material-0032').style.display = 'block';
      setTimeout(function() {
        overlay.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 10);
      // Check if pointer lock is active
      if (document.pointerLockElement !== null) {
        // Exit pointer lock
        document.exitPointerLock();
      }
    }
  });
}


document.addEventListener('mousedown', function(event) {
  const isInsidePopup003 = event.target.closest('#popup-material-003') !== null;
  const isInsidePopup004 = event.target.closest('#popup-material-0031') !== null;
  const isInsidePopup005 = event.target.closest('#popup-material-0032') !== null;
  if (!isInsidePopup003 && !isInsidePopup004 && !isInsidePopup005) {
    overlay.style.display = 'none';
    document.getElementById('popup-material-003').style.display = 'none';
    document.getElementById('popup-material-0031').style.display = 'none';
    document.getElementById('popup-material-0032').style.display = 'none';
    overlay.style.transform = 'translate(-50%, -50%) scale(0.1)';
  }
});


// Add event listener to the overlay
overlay.addEventListener('click', function(event) {
  // Check if the clicked element is a close button
  if (event.target.classList.contains('button')) {
    // Exit pointer lock
    document.exitLockPointer();
    // Hide the overlay
    overlay.style.display = 'none';
  }
});

document.addEventListener('mousedown', onDocumentMouseDown, false);



//bare for lys
var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 0.6, -1.40);
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
  






//zoom funksjon
var cameraOrientation = new THREE.Vector3(0, 0, -1);
var zoomSpeed = 0.1;
var maxZoom = 2; // Maksimalt tillatt zoomnivå
var minZoom = 1; // Minimum tillatt zoomnivå

function onMouseWheel(event) {
  var zoomDelta = event.deltaY > 0 ? -1 : 1;
  var zoomAmount = zoomDelta * zoomSpeed;

  // Sjekk om det nye zoomnivået er innenfor det tillatte området
  var newZoom = camera.zoom + zoomAmount;
  if (newZoom > maxZoom || newZoom < minZoom) {
    return; // Ikke oppdater zoomnivået hvis det er utenfor det tillatte området
  }

  // Oppdater kameraets zoomnivå og projeksjonsmatrise
  camera.zoom = newZoom;
  camera.updateProjectionMatrix();
}

document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('wheel', onMouseWheel, false);

}
lockPointer ();


const popup003 = document.getElementById("popup-material-003");
const popup0031 = document.getElementById("popup-material-0032");
const popup0032 = document.getElementById("popup-material-0031");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const back = document.getElementById("back");
const forward = document.getElementById("forward");

arrowLeft.addEventListener("click", () => {
  popup003.style.display = "none";
  popup0032.style.display = "block";
  overlay.classList.add("active");
});

arrowRight.addEventListener("click", () => {
  popup003.style.display = "none";
  popup0031.style.display = "block";
  overlay.classList.add("active");
});

back.addEventListener("click", () => {
  popup0032.style.display = "none";
  popup0031.style.display = "none";
  popup003.style.display = "block";
  overlay.classList.remove("active");
});

forward.addEventListener("click", () => {
  popup0031.style.display = "none";
  popup0032.style.display = "none";
  popup003.style.display = "block";
  overlay.classList.remove("active");
});


