// Ensure ThreeJS is in global scope for the 'examples/'

global.THREE = require("three");
const canvasSketch = require("canvas-sketch");
const random = require('canvas-sketch-util/random')
// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");
const palettes = require('nice-color-palettes');
const eases = require('eases');
const BezierEasing = require('bezier-easing');

const palette = random.pick(palettes)

const settings = {
  // dimensions: [512,512],
  fps: 24,
  duration: 4,
  loop: true,
  // Make the loop animated
  animate: true,

  // Get a WebGL canvas rather than 2D
  context: "webgl",

  attributes: {antialias: true}
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor(`${random.pick(palette)}`, 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();
  camera.position.set(1,1,1);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  // const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  // const geometry = new THREE.SphereGeometry(1, 32, 16);

  // Setup a material
  // const material = new THREE.MeshBasicMaterial({
  //   color: "green",
  //   wireframe: true 
  // });

  const box = new THREE.BoxGeometry(1,1,1);
  
  // Setup a mesh with geometry + material
  for (let i=0;i<40;i++) {
    const mesh = new THREE.Mesh(
      box,
      new THREE.MeshStandardMaterial({
        color: random.pick(palette),
      })
    );
    mesh.position.set(
      random.range(-1,1),
      random.range(-1,1),
      random.range(-1,1)
    );
    mesh.scale.set(
      random.range(-1,1),
      random.range(-1,1),
      random.range(-1,1)
    )
    mesh.scale.multiplyScalar(0.5)
    scene.add(mesh);
    
  }

  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(0,0,4);
  
  const ambient = new THREE.AmbientLight('hsl(0,0%,40%)')
  scene.add(ambient);
  scene.add(light);

  // scene.add(new THREE.AmbientLight('#59314f'))

  // const light = new THREE.PointLight('#45caf7', 1, 15.5);
  // light.position.set(2,2,-4).multiplyScalar(1.5)
  // scene.add(light);


  const easeFn = BezierEasing(0.67,0.03,0.29,0.99) 
  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 2.5;
      
      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;
      
      // Near/Far
      camera.near = -100;
      camera.far = 100;
      
      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());
      
      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ playhead }) {
   
      // controls.update();
     const t = Math.sin(playhead * Math.PI);
      scene.rotation.z = easeFn(t);
      // scene.rotation.x = playhead * Math.PI * 2;
      // scene.rotation.z = playhead * Math.PI * 2;
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      // controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
