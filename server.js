const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server);

let users = {
    'aakash': 'akki'
}
app.use('/', express.static(__dirname + '/public'))
server.listen(4664, () => {
    console.log('server started on http://localhost:4664');
})


let socketmap={};
function helper( s , u)
{
 s.join(u);
 s.emit('logged_in');
 socketmap[s.id]=u;
 console.log(socketmap)

}
io.on('connection', (socket) => {
    console.log('connect id:' + socket.id);

    // socket.on('msg_send',(data)=>{
    //     io.emit('msg_rcvd',data)   // send to everyone 
    // socket.broadcast.emit('msg_rcvd',data)     send as broadcast, show only on others
    // socket.emit()  just to that particular socket

    socket.on('login', (data) => {
        if (users[data.username]) {
            if (users[data.username] == data.password) {
                helper(socket,data.username)  
            }
            else {
                socket.emit('login_failed');
            }
        }
        else {
            users[data.username] = data.password;
            helper(socket,data.username)

        }

        // console.log(users);
    })

    socket.on('msg_send', (data) => {
        data.from=socketmap[socket.id]
        if (data.to) {
            io.to(data.to).emit('msg_rcvd', data);
        }
        else {
            socket.broadcast.emit('msg_rcvd', data);
        }
    })
})

