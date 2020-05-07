
const canvasSketch = require('canvas-sketch');
const {lerp} = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 1125,2436]
};
  // defining the margin for linear extrapolation
  const margin = 50
  const sketch = () => {
    // The function that creates grids
    const createGrid = () => {
      let count = 50;
      const points = []
      for (let x=0;x<count;x++){
        for (let y=0;y<count;y++){
          //uv coordinates go from 0-1, with 0.5,0.5 being the center of the grid
          let u = count <1? 0.5: x/(count-1);
          let v = count <1? 0.5: y/(count-1);
          const radius = Math.abs(random.noise2D(u,v)) * 0.2
          points.push({
            radius,
            position: [u,v],
            color: random.pick(palette),
            rotation: Math.abs(random.noise2D(u,v))
          });
        }
      }
      return points;
    };
    //create instance of the grid, which we'll feed into the canvas in the next step
    const palette = random.pick(palettes)
    // random.setSeed(10);
    const points = createGrid().filter(()=>random.value()>0.5);
    console.log(points)

  return ({ context, width, height }) => {
    context.fillStyle = '#e1bb80';
    context.fillRect(0, 0, width, height);

    //destructure uv coordinates and paint as circles on canvas
    points.forEach(data => {
      const {
        position,
        radius,
        color,
        rotation
      } = data;

      const [u,v] = position
      //increase size of points coordinates to be aware of canvas
      const x = lerp(margin, width-margin,u)
      const y = lerp(margin,height-margin,v);

      // Create each circle
      // context.beginPath();
      // context.arc(x,y,radius * width,0, Math.PI* 2,true);
      // context.fillStyle = color;
      // context.fill()
      // // context.lineWidth = 15;
      // // context.stroke()

      // Create text
      context.save(); //store state of canvas
      context.fillStyle = color;
      context.font = `${radius * width}px "Arial"`;
      context.translate(x,y) // translate to grid coordinate
      context.rotate(rotation) //rotate canvas by 1 radian
      context.fillText('=',0,0) // draw
      
      context.restore(); //restore canvas state

      
    });
  };
};

canvasSketch(sketch, settings);