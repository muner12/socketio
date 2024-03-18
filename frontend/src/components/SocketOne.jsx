
import React, { useEffect,useMemo,useState } from 'react'
import {io} from 'socket.io-client';
export const SocketOne = () => {
    const [message,setMessage]=useState('')
    const socket=useMemo(()=>{return io('http://localhost:3000');
  },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        socket.emit('message',message);
    }
    
  
    useEffect(()=>{
  
      socket.on('connect',()=>{
        console.log("connected user",socket.id);
      });
  
      socket.on('welcom',(s)=>{
        console.log(s);
      })
  
      socket.on('recive-message',(data)=>{
        console.log(data);
  
      })
  
    },[])
  

    return (
        <div>
          <form onSubmit={handleSubmit}>
            <input placeholder='Enter message...' value={message} onChange={(e)=>setMessage(e.target.value)} name='message'/>
            <button type='submit'>Send</button>
          </form>
        </div>
      )
}
