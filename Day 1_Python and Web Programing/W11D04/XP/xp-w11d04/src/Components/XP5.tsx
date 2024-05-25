import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const GetUsers: React.FC = ()=>{
const [posts, setPost] = useState <Post[]>([]) //difficult in understanding that you need to define the interface type in the state

useEffect(()=>{
const fetchData = async ()=>{
await fetchPost()}
fetchData()
}, [])

const fetchPost = async()=>{
    try {
    const response = await axios.get <Post[]>(
      'https://jsonplaceholder.typicode.com/posts'
    )
    setPost(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

  return(
    <>
    <h2>Get Posts Component</h2>
  <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  )
}

export default GetUsers