let socket=io();
$('#loginBox').show();
$(`#chatBox`).hide();

$('#btnStart').click(()=>{
    socket.emit('login',{
        username: $('#inpUserName').val(),
        password: $('#inpUserPass').val()
    })
})

socket.on('logged_in',()=>{
    $('#loginBox').hide();
$(`#chatBox`).show();
})

$('#btnSendMsg').click(()=>{
    socket.emit('msg_send',{
        to: $('#inpToUser').val() ,
        msg:$('#inpNewMsg').val()
    })
})

socket.on('msg_rcvd',(data)=>{
    // let x=document.createElement('li');
    // x.innerText=data.msg  ;
    // $('#ulMsgs').append(x);
    $('#ulMsgs').append($(`<li>`).text(
        ` [${data.from}]: ${data.msg} `))
})

socket.on('login_failed',()=>{
    window.alert("Wrong UserName or Password")
})