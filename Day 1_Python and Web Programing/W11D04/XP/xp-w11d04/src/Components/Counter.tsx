import { useState } from "react";
import React from "react";

const XPcounter :React.FC =()=>{

  const [count, setCount] = useState<number>(0)
  const add =()=>{
    setCount(count +1)
  }
  const decrease = ()=>{
    setCount(count-1)
  }
  return(
    <>
    <h2>XP Counter:</h2>
    {count}
    <button onClick={()=> {add()}}>Add me</button>
    <button  onClick={()=> {decrease()}}>Decrease me</button>
    </>
  )
}

export default XPcounter