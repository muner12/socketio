const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const cors=require('cors');

const app=express();
const port=3000

const corsOption={
    origin:'http://localhost:5173',
    method:['POST','GET'],
    credentials:true,
    optionSuccessStatus:200
}

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

io.on('connect',(socket)=>{

    console.log("connected",socket.id);
    socket.emit('welcom',`welcom to Server:${socket.id}`);

    socket.on('message',(data)=>{
        console.log(data);
        io.emit('recive-message',data);
    })
});

app.use(cors(corsOption));
server.listen(port,()=>console.log(`Server is listning on port:${port}`))

