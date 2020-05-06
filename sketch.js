
const canvasSketch = require('canvas-sketch');
const {lerp} = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ]
};
  // defining the margin for linear extrapolation
  const margin = 200
  const sketch = () => {
    // The function that creates grids
    const createGrid = () => {
      let count = 30;
      const points = []
      for (let x=0;x<count;x++){
        for (let y=0;y<count;y++){
          //uv coordinates go from 0-1, with 0.5,0.5 being the center of the grid
          let u = count <1? 0.5: x/(count-1);
          let v = count <1? 0.5: y/(count-1);
          points.push({
            radius: Math.abs(0.001 + random.gaussian() * 0.02),
            position: [u,v],
            color: random.pick(palette)
          });
        }
      }
      return points;
    };
    //create instance of the grid, which we'll feed into the canvas in the next step
    const palette = random.pick(palettes)
    random.setSeed(10);
    const points = createGrid().filter(()=>random.value()>0.4);
    console.log(points)

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    //destructure uv coordinates and paint as circles on canvas
    points.forEach(data => {
      const {
        position,
        radius,
        color
      } = data;

      const [u,v] = position
      //increase size of points coordinates to be aware of canvas
      const x = lerp(margin, width-margin,u)
      const y = lerp(margin,height-margin,v);

      // Create each circle
      context.beginPath();
      context.arc(x,y,radius * width,25, Math.PI + (Math.PI * 20) / 2,true);
      context.fillStyle = color;
      context.fill()
      // context.lineWidth = 15;
      // context.stroke()

      
    });
  };
};

canvasSketch(sketch, settings);