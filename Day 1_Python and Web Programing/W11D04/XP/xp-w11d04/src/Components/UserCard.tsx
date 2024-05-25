import { useState, useEffect } from "react";
import React from "react";

interface Card{
  name: string
  age?: number | string
}

const UserCard: React.FC <Card>=({name, age = `age not provided`}) =>{

  return(
    <>
    <h2>UserCard Component</h2>
    {name} {age}
    </>
  )
}

export default UserCard