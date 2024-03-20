import React, { useEffect,useMemo,useState } from 'react'
import { io } from 'socket.io-client'
const SocketTwo = () => {

const socket=useMemo(()=>io('http://localhost:3000'));
const [message,setMessage]=useState('');
const [socketId,setSocketId]=useState();
const [room,setRoom]=useState();
const [allMessages,setAllMessages]=useState([]);
const [roomName,setRoomName]=useState()
console.log(allMessages)


const submitHandler=(e)=>{
    e.preventDefault();
    socket.emit('message',{room,message});
    setMessage('')

}

const setRoomHandler=(e)=>{
    e.preventDefault();

    socket.emit('join-room',roomName)
    setRoomName('')
}

useEffect(()=>{
    socket.on('connect',()=>{
        setSocketId(socket.id);
        console.log("user Connected:",socket.id);
    })

    socket.on('welcome',(s)=>{
        console.log(s);
    })
    socket.on('recive-message',(data)=>{
        setAllMessages((message)=>[...message,data])
        console.log(data);
    })
    return () => {
        socket.disconnect();
      };
},[]);




  return (
    <div>
    <h6>{socketId}</h6>


    <form onSubmit={setRoomHandler}>
    <div>
    <input 
    value={roomName}
    placeholder='Room  name'
    onChange={(e)=>setRoomName(e.target.value)}
    />
</div>
<button type='submit'>JOIN</button>
    </form>
    <div><hr/></div>
        <form onSubmit={submitHandler}>

      

        <div>
            <input 
            value={room}
            placeholder='Room...'
            onChange={(e)=>setRoom(e.target.value)}
            />
        </div>
            <div>
                <input
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                placeholder='Message Write here...'
                />
                <button type='submit'>Send</button>
            </div>
        </form>
        <div>
            {
                allMessages.map((data,index)=>{
                    return <p key={index}>{data}</p>
                })
            }
        </div>
    </div>
  )
}

export default SocketTwo