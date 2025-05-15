export function canvasPopup() {
  const canvas = document.querySelector(".webgl");

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 2;

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const loader = new GLTFLoader();
  let circle;
  loader.load(
    "../../files/modal3d/karkas.glb",
    function (gltf) {
      gltf.scene.scale.set(0.1, 0.1, 0.1);
      scene.add(gltf.scene);
      animate(gltf);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
  loader.load(
    "../../files/modal3d/koleso.glb",
    function (gltf) {
      gltf.scene.scale.set(0.1, 0.1, 0.1);
      circle = gltf.scene;
      scene.add(gltf.scene);
      animate();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // const controls = new OrbitControls(camera, canvas);
  // controls.enableDamping = true;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const clock = new THREE.Clock();

  function animate() {
    const delta = clock.getDelta();
    if (circle) {
      circle.rotation.x += delta;
    }

    // controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}
