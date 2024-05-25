import React from "react";

interface Greetings {
  greeting: string
}
const Greeting: React.FC <Greetings> = ({greeting})=> {


  return(
    <>
    <h2>Greetings Component</h2>
    {greeting}
    </>
  )
}

export default Greeting