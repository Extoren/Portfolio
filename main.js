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
  'Portfolio 2.5.glb',
  function (gltf) {
    houseMesh = gltf.scene;
    houseMesh.scale.set(0.85, 0.90, 0.80);

    // load the screen glb file
    gltfLoader.load(
      'Face/Face.glb',
      function (gltf) {
        screenMesh = gltf.scene;
        screenMesh.scale.set(0.00, 0.00, 0.00);

        // add the screen as a child of the parent
        parent.add(screenMesh);

        // add the house as a child of the parent
        parent.add(houseMesh);

        // set the position of the screen relative to the house
        screenMesh.position.set(0, 0.6, -1.50);

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
    if (intersect.object.material.name === 'Glass') {
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
    } else if (intersect.object.material.name === 'Glass.001') {
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
    } else if (intersect.object.material.name === 'Glass.002') {
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
var pointLight1 = new THREE.PointLight(0xffffff, 0.5);
pointLight1.position.set(0, 2, 0);
scene.add(pointLight1);

var pointLight2 = new THREE.PointLight(0xffffff, 0.5);
pointLight2.position.set(6, 2, 0);
scene.add(pointLight2);

var pointLight0 = new THREE.PointLight(0xffffff, 1);
pointLight0.position.set(10, 2, 0);
scene.add(pointLight0);

var pointLight0 = new THREE.PointLight(0xffffff, 1);
pointLight0.position.set(14, 2, 0);
scene.add(pointLight0);

var pointLight0 = new THREE.PointLight(0xffffff, 0.5);
pointLight0.position.set(-6, 2, 0);
scene.add(pointLight0);

var pointLight0 = new THREE.PointLight(0xffffff, 1);
pointLight0.position.set(-10, 2, 0);
scene.add(pointLight0);

var pointLight0 = new THREE.PointLight(0xffffff, 1);
pointLight0.position.set(-14, 2, 0);
scene.add(pointLight0);









// Set the proximity threshold for triggering the action
let proximityThreshold = 6; // Adjust this value as needed

// Set the movement speed for the smooth transition
let movementSpeed = 0.005; // Adjust this value as needed

// Set the closed and open positions of the doors
let closedPositionX = 0; // Adjust this value to match the closed position
let openPositionX = 3; // Adjust this value for right Door Handle
let openPositionX2 = -3; //Adjust this value for Left Door Handle

// Create an object to store the previous camera position
let prevCameraPosition = camera.position.clone();

// Create a variable to keep track of whether the door has been closed
let doorClosed = false;

function checkProximityToObjectsByMaterials(materialNames) {
  // Get the camera's position
  var cameraPosition = camera.position;

  // Iterate through all objects in the scene
  scene.traverse(function (object) {
    // Check if the object has a material with one of the specified names
    if (object.material && materialNames.includes(object.material.name)) {
      // Calculate the distance between the previous camera position and the object
      var prevDistance = prevCameraPosition.distanceTo(object.position);

      // Calculate the distance between the current camera position and the object
      var currentDistance = cameraPosition.distanceTo(object.position);
      
      // Check if the camera is within the proximity threshold of the object
      if (currentDistance <= proximityThreshold) {
        // Calculate the movement distance for the smooth transition based on the current distance
        var movementDistance = movementSpeed * currentDistance;

        // Calculate the movement direction based on the current and previous distances
        var movementDirection = prevDistance < currentDistance ? 1.5 : -1;

        // Calculate the new x position of the object
        var newX = object.position.x + movementDirection * movementDistance;

        // Clamp the new x position to be within the closed and open positions
        newX = Math.min(Math.max(newX, closedPositionX), openPositionX);

        // If the camera is within the proximity threshold and the door was previously closed, open the door
        if (currentDistance <= proximityThreshold && doorClosed) {
          newX = openPositionX;
          doorClosed = false;
        }

        // If the camera is outside the proximity threshold, close the door
        if (currentDistance > proximityThreshold) {
          newX = closedPositionX;
          doorClosed = true;
        }

        // Set the new position of the object
        object.position.x = newX;
      }
    }
  });

  // Update the previous camera position for the next iteration
  prevCameraPosition.copy(cameraPosition);
}

function checkProximityToObjectsByMaterialsTwo(materialNames) {
  // Get the camera's position
  var cameraPosition = camera.position;

  // Iterate through all objects in the scene
  scene.traverse(function (object) {
    // Check if the object has a material with one of the specified names
    if (object.material && materialNames.includes(object.material.name)) {
      // Calculate the distance between the previous camera position and the object
      var prevDistance = prevCameraPosition.distanceTo(object.position);

      // Calculate the distance between the current camera position and the object
      var currentDistance = cameraPosition.distanceTo(object.position);
      
      // Check if the camera is within the proximity threshold of the object
      if (currentDistance <= proximityThreshold) {
        // Calculate the movement distance for the smooth transition based on the current distance
        var movementDistance = movementSpeed * currentDistance;

        // Calculate the movement direction based on the current and previous distances
        var movementDirection = prevDistance < currentDistance ? 1.5 : -1;

        // Calculate the new x position of the object
        var newY = object.position.z + movementDirection * movementDistance;

        // Clamp the new x position to be within the closed and open positions
        newY = Math.min(Math.max(newY, openPositionX2), closedPositionX);

        // If the camera is within the proximity threshold and the door was previously closed, open the door
        if (currentDistance <= proximityThreshold && doorClosed) {
          newY = closedPositionX;
          doorClosed = true;
        }

        // If the camera is outside the proximity threshold, close the door
        if (currentDistance > proximityThreshold) {
          newY = openPositionX2;
          doorClosed = false;
        }

        // Set the new position of the object
        object.position.z = newY;
      }
    }
  });

  // Update the previous camera position for the next iteration
  prevCameraPosition.copy(cameraPosition);
}

// Call this function in your render loop or wherever appropriate to check proximity continuously
function checkProximityContinuously() {
  // Update the raycaster to check for intersections with objects
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);

  // Perform the proximity check for objects with the specified materials
  var materialsToCheck = ["Airlock Doors Right", "Right Button Lights", "Right Panels"];
  checkProximityToObjectsByMaterials(materialsToCheck);

  var materialsToCheckTwo = ["Airlock Doors Left"];
  checkProximityToObjectsByMaterialsTwo(materialsToCheckTwo);

  // Call this function in your render loop or appropriate event listener
  // to continuously check proximity as the camera moves
  requestAnimationFrame(checkProximityContinuously);
}

// Start checking proximity continuously
checkProximityContinuously();










// Define the minimum and maximum x-axis values that the camera can move within
const MIN_X = -14.5;
const MAX_X = 19;

// Set the initial camera position
camera.position.z = 0; // How close
camera.position.y = 1; // Up and down
camera.position.x = 0; // Right or left

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let cameraX = 0;
let cameraZ = 0;

// Define the speed at which the camera moves
const CAMERA_SPEED = 0.1;

function onKeyDown(event) {
  switch (event.keyCode) {
    case 87: // W
      moveForward = true;
      break;
    case 83: // S
      moveBackward = true;
      break;
    case 68: // A
      moveRight = true;
      break;
    case 65: // D
      moveLeft = true;
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
      moveRight = false;
      break;
    case 65: // D
      moveLeft = false;
      break;
  }
}

function updateCameraPosition() {
  // Calculate the new camera position based on user input
  if (moveLeft && cameraX > MIN_X) {
    cameraX -= CAMERA_SPEED;
  }
  if (moveRight && cameraX < MAX_X) {
    cameraX += CAMERA_SPEED;
  }

  // Apply the limits to the camera position
  cameraX = Math.max(Math.min(cameraX, MAX_X), MIN_X);

  // Smoothly update the camera position using requestAnimationFrame
  camera.position.x += (cameraX - camera.position.x) * 0.1;

  // Request the next frame
  requestAnimationFrame(updateCameraPosition);
}


// Start the update loop
requestAnimationFrame(updateCameraPosition);


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








