const canvasSketch = require('canvas-sketch');
const createShader = require('canvas-sketch-util/shader');
const glsl = require('glslify');
const palettes = require('nice-color-palettes')
const random = require('canvas-sketch-util/random');

const palette = random.pick(palettes)
// Setup our sketch
const settings = {
  context: 'webgl',
  animate: true
};

// console.log(random.value(0,1))
// Your glsl code
const frag = glsl(/* glsl */`
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  #pragma glslify: 


  void main () {
    // vec3 colorA = sin(time) + vec3(1,0.0,0.0);
    // vec3 colorB = vec3(0.0,1.0,0.0);
    // vec2 center = vUv - 0.5;
    // center.x*=aspect;
    // float dist = length(center);

    // float alpha = smoothstep(0.25075, 0.25, dist);

    // vec3 color = mix(colorA, colorB, vUv.x + vUv.y * sin(time));
    // gl_FragColor = vec4(color,alpha);

      gl_FragColor = vec4(vec3(vUv.x),1.0);
   }
`);

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({
    // Pass along WebGL context
    clearColor: `${random.pick(palette)}`,
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    // Specify additional uniforms to pass down to the shaders
    uniforms: {
      // Expose props from canvas-sketch
      time: ({ time }) => time,
      aspect: ({width,height}) => width/height 
    }
  });
};

canvasSketch(sketch, settings);
