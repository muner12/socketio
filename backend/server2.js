
const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const cors=require('cors');

const app=express();
const  server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        methods:['GET','POST'],
        credentials:true
    }
});

io.on('connect',(socket)=>{
    
    socket.emit('welcome',`welcome to the server:${socket.id}`);

    socket.on('message',({room,message})=>{
    console.log({room,message})
     io.to(room).emit('recive-message',message);
    });

    socket.on('join-room',(room)=>{
        socket.join(room);
        console.log(socket.id+" connected to the room:"+room)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      });



})


server.listen(3000,()=>{
    console.log('Server is runnining on : http://localhost:3000');
})