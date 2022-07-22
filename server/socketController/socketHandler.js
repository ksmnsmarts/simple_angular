module.exports = function (socketNameSpace, socket, app) {

    // join room
    socket.on('join:room', async (data) => {
        if (socket.roomName) {
            console.log("\n 속해 있던 방이 있으면 해당 room 탈퇴");
            socket.leave(socket.roomName);
        }

        socket.roomName = data.roomName;
        socket.userName = data.userName;

        console.log("\n client ---> server  [join:room]");
        socket.join(data.roomName);

        const roomData = {
            roomName: socket.roomName,
            message: '[ ' + socket.userName + ' ]' + '님이 입장하셨습니다.'
        }

        console.log("\n server ---> client  [join:message]");
        socketNameSpace.to(socket.roomName).emit('join:message', roomData)
    });


    // 자신 포함 자신이 속한 room에 메세지 전송
    socket.on('message:send', (data) => {
        console.log("\n client ---> server  [message:send]");
        data.userName = socket.userName

        console.log("\n server ---> client  [message:receive]");
        socketNameSpace.to(socket.roomName).emit('message:receive', data)
    })


    // 자신 포함 모든 room에 메세지 전송
    socket.on('message:sendAll', (data) => {
        console.log("\n client ---> server  [message:sendAll]");
        socketNameSpace.emit('message:receive', data)
    })


    // disconnect
    socket.on('disconnect', async () => {
        const roomData = {
            roomName: socket.roomName,
            message: '[ ' + socket.userName + ' ]' + '님이 퇴장하셨습니다.'
        }

        console.log("\n ---> disconnect", roomData.message);
        socketNameSpace.to(socket.roomName).emit('disconnect:message', roomData)
    });



    // socket.on('set:room', (roomInfo)=> {
    //     socket.leave(socket.roomName);
    //     socket.join(roomInfo.roomName);
    //     socket.roomName = roomInfo.roomName	
    //     console.log('소켓 아이디 (사용자 ID와 비슷)-------------------')
    //     console.log(socket.id)
    //     console.log('소켓 룸 목록------------------------')
    //     console.log(socketNameSpace.adapter.rooms)
    //     console.log('소켓 룸 목록 중 름 안에 참가한 아이디 검색----------')
    //     console.log(socketNameSpace.adapter.rooms.get(roomInfo.roomName))
    //     console.log('-------------------------')
    // })
};
