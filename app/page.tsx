'use client'
import { useEffect, useRef, MouseEvent, useState } from "react"
import Image from "next/image";
import Pencil from '../Assests/pen.png'
import Eraser from '../Assests/eraser.png'

export default function Home() {
  const [canvasReady, setCanvasReady] = useState(false);
  const canvasRef = useRef(null);
  const [selectedColor, setselectedColor] = useState('black')
  const [coord, setcoord] = useState({
    x:0,
    y:0
  })
  const [black, setblack] = useState(false)
  const [blue, setblue] = useState(false)
  const [green, setgreen] = useState(false)
  const [red, setred] = useState(false)

  const [draw, setdraw] = useState(false)
  const [pen, setpen] = useState(false)
  const [erase, seterase] = useState(false)
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

  const selectPen =()=>{
    setpen(true)
    setblack(true);
    seterase(false);
  }

  const handleStart=(e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>)=>{
    if(pen){
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      setdraw(true);
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    }
    
  }    
  
  const startDraw=(e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>)=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    if(draw){
      ctx.lineWidth = 5;
      ctx.strokeStyle = selectedColor;
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }

    if(erase){
      ctx.beginPath();
      ctx.lineWidth = 35;
      ctx.lineCap = 'round';
      ctx.globalCompositeOperation = 'destination-out'; // Set the eraser mode
      ctx.moveTo(offsetX, offsetY);
      
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  }
  
  const handleStop =(e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>)=>{
    if(pen){
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.closePath()
      setdraw(false)
    }
  }

  const eraseStart =()=>{
    setpen(false);
    seterase(true);
    setblack(false);
    setblue(false);
    setgreen(false);
    setred(false);
  }

  const clearAll =()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  const getcursor =()=>{
    if(!pen && !erase){
      return ''
    }
    if(pen){
      return 'canvas-pen'
    }

    if(erase){
      return 'cursor-eraser'
    }
  }
  
  const selectColorStyle =(color: string)=>{
    if(!erase){
      setselectedColor(color)
      if(color == "black"){
        setblack(true)
        setblue(false)
        setgreen(false)
        setred(false)
      }
      if(color == "blue"){
        setblack(false)
        setblue(true)
        setgreen(false)
        setred(false)
      }
      if(color == "green"){
        setblack(false)
        setblue(false)
        setgreen(true)
        setred(false)
      }
      if(color == "red"){
        setblack(false)
        setblue(false)
        setgreen(false)
        setred(true)
      }

    }
  }

  return ( 
    <div className='w-100 h-auto bg-white text-black'>
       <div className='flex'>
          <div className='m-5'>
            <button className={`border-slate-600 border-2 p-2 rounded ${pen ? 'bg-slate-500 text-white' : ''}`} onClick={selectPen}> <Image
             src={Pencil}
             alt="Pencil"
             width={20}
             height={20}/> 
            </button>
          </div>
          <div className='m-5'>
            <button className={`border-slate-600 border-2 p-2 rounded ${erase ? 'bg-slate-500 text-white' : ''}`} onClick={eraseStart}><Image
             src={Eraser}
             alt="Eraser"
             width={20}
             height={20}/> 
            </button>
          </div>
          <div className="flex m-5 items-center">
            <button className={`bg-black mx-2 rounded-full ${black ? 'w-10 h-10 brd' : 'w-8 h-8'} `} onClick={() => selectColorStyle('black')}></button>
            <button className={`bg-blue-500 mx-2 rounded-full ${blue ? 'w-10 h-10 brd' : 'w-8 h-8'} `} onClick={() => selectColorStyle('blue')}></button>
            <button className={`bg-green-500 mx-2 rounded-full ${green ? 'w-10 h-10 brd' : 'w-8 h-8'} `} onClick={() => selectColorStyle('green')}></button>
            <button className={`bg-red-500 mx-2 rounded-full ${red ? 'w-10 h-10 brd' : 'w-8 h-8'} `} onClick={() => selectColorStyle('red')}></button>
          </div>
          <div className="m-5">
            <button className='border-slate-600 border-2 p-2 hover:bg-yellow-200 rounded' onClick={clearAll}>Reset</button>
          </div>
       </div>

       <div className="flex justify-center">
        <canvas 
          className={`w-screen h-screen bg-slate-200 ${getcursor()}`}   
          ref={canvasRef} 
          onMouseDown={(e) => handleStart(e)}
          onMouseMove={(e) => startDraw(e)}
          onMouseUp={(e) => handleStop(e)}    
        ></canvas>
       </div>
    </div>
  )
}
