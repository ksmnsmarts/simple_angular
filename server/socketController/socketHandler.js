module.exports = function (socketEx, socket, app) {
	const dbModels = global.DB_MODELS;

	// join room
	socket.on('join:room', async (data) => {
        if(socket.roomName) {
            console.log("\n 속해 있던 room 탈퇴");
            socket.leave(socket.roomName);
        }
        
        console.log("\n client ---> server  [join:room]");
        socket.roomName = data.roomName;
        socket.userName = data.userName;
        socket.join(data.roomName);

        const roomData = {
            roomName: socket.roomName,
            userName: '[ ' + socket.userName + ' ]' + '님이 입장하셨습니다.'
        }

        console.log("\n server ---> client  [join:user]");
        socketEx.to(socket.roomName).emit('join:user', roomData)
	});

    // 자신 포함 자신이 속한 room에 메세지 전송
    socket.on('message:send', (data)=> {
        console.log("\n client ---> server  [message:send]");
        data.userName = socket.userName

        console.log("\n server ---> client  [message:receive]");
        socketEx.to(socket.roomName).emit('message:receive', data)
    })

    // 자신 포함 모든 room에 메세지 전송
    socket.on('message:sendAll', (data)=> {
        console.log("\n client ---> server  [message:sendAll]");
        socketEx.emit('message:receive', data)
    })

	// disconnect
	socket.on('disconnect', async function () {
        const roomData = {
            roomName: socket.roomName,
            userName: '[ ' + socket.userName + ' ]' + '님이 퇴장하셨습니다.'
        }

		console.log("\n ---> disconnect", roomData.userName);
        socketEx.to(socket.roomName).emit('disconnect:user', roomData)
	});

    // socket.on('set:room', (roomInfo)=> {
    //     socket.leave(socket.roomName);
    //     socket.join(roomInfo.roomName);
    //     socket.roomName = roomInfo.roomName	
    //     console.log('소켓 아이디 (사용자 ID와 비슷)-------------------')
    //     console.log(socket.id)
    //     console.log('소켓 룸 목록------------------------')
    //     console.log(socketEx.adapter.rooms)
    //     console.log('소켓 룸 목록 중 름 안에 참가한 아이디 검색----------')
    //     console.log(socketEx.adapter.rooms.get(roomInfo.roomName))
    //     console.log('-------------------------')
    // })


    
};
