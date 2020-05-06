
const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

  const sketch = () => {
    // The function that creates grids
    const createGrid = () => {
      let count = 3;
      const points = []
      for (let x=0;x<count;x++){
        for (let y=0;y<count;y++){
          //uv coordinates go from 0-1, with 0.5,0.5 being the center of the grid
          let u = count <1? 0.5: x/(count-1);
          let v = count <1? 0.5: y/(count-1);
          points.push([u,v]);
        }
      }
      return points;
    };
    //create instance of the grid, which we'll feed into the canvas in the next step
    const points = createGrid();
    console.log(points)

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    //destructure uv coordinates and paint as circles on canvas
    points.forEach(([u,v]) => {
      //increase size of points coordinates to be aware of canvas
      const x = u * width;
      const y = v * height;

      // Create each circle
      context.beginPath();
      context.arc(x,y,200,0, Math.PI *2,false);
      context.strokeStyle = 'yellow';
      context.lineWidth = 5;
      context.stroke()

      
    });
  };
};

canvasSketch(sketch, settings);