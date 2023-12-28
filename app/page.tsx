'use client'
import { useEffect, useRef, MouseEvent, useState } from "react"

export default function Home() {
  const [canvasReady, setCanvasReady] = useState(false);
  const canvasRef = useRef(null);
  const [coord, setcoord] = useState({
    x:0,
    y:0
  })

  const [draw, setdraw] = useState(false)
  useEffect(() => {
    setCanvasReady(true); // Set canvasReady to true once the component mounts
  }, []);

  useEffect(() => {
    if (canvasReady) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Use ctx to draw on the canvas
      // For example:
      // ctx.fillStyle = 'blue';
      // ctx.fillRect(10, 10, 100, 100);
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;

      // Cleanup or other operations
    }
  }, [canvasReady]);

  
  const handleStart=(e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>)=>{
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      setdraw(true);
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    
  }    
  
  const startDraw=(e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>)=>{
    if(draw){
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
  
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  }
  
  const handleStop =(e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>)=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.closePath()
    setdraw(false)
  }

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
        <canvas 
          className="w-screen h-screen bg-slate-200"   
          ref={canvasRef} 
          onMouseDown={(e) => handleStart(e)}
          onMouseMove={(e) => startDraw(e)}
          onMouseUp={(e) => handleStop(e)}    
        ></canvas>
       </div>
    </div>
  )
}
