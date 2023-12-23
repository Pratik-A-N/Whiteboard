'use client'
import { useEffect, useRef, MouseEvent } from "react"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Create a variable to hold the canvas 2D rendering context
  let ctx: CanvasRenderingContext2D | null;

  // This useEffect runs after the component is mounted
  useEffect(() => {
    // Get the canvas element using the ref
    const canvas = canvasRef.current;

    // Check if the canvas exists
    if (canvas) {
      // Get the 2D rendering context of the canvas
      ctx = canvas.getContext('2d');

      // Check if the rendering context exists
      if (ctx) {
        // Set initial stroke style (color) and line width for drawing
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
      }
    }
  }, []);

  // This function starts drawing when the mouse button is pressed down
  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    // Check if the rendering context exists
    if (ctx) {
      // Begin a new drawing path
      ctx.beginPath();

      // Move the "pen" to the starting position on the canvas
      ctx.moveTo(e.clientX, e.clientY);
    }
  };

  // This function continues drawing as the mouse moves
  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    // Check if the rendering context exists
    if (ctx) {
      // Draw a line to the current mouse position
      ctx.lineTo(e.clientX, e.clientY);

      // Render the line on the canvas
      ctx.stroke();
    }
  };

  return (
    <div className='w-100 h-auto bg-white text-black'>
       <div className='flex'>
          <div className='m-5'>
            <button className='border-slate-600 border-2 p-2 hover:bg-yellow-200 rounded'>Pencil</button>
          </div>
          <div className='m-5'>
            <button className='border-slate-600 border-2 p-2 hover:bg-yellow-200 rounded'>Eraser</button>
          </div>
       </div>

       <div className="flex justify-center">
        <canvas className='border-slate-600 border-2'
          ref={canvasRef}
          width={800}
          height={600}
          onMouseDown={startDrawing} // Start drawing when mouse button is pressed down
          onMouseMove={draw} // Draw as the mouse moves
          onMouseUp={() => (ctx ? ctx.closePath() : null)} // Close the drawing path when mouse button is released
          onMouseOut={() => (ctx ? ctx.closePath() : null)} 
        ></canvas>
       </div>
    </div>
  )
}
