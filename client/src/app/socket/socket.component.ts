import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocketService } from '../0.shared/services/socket/socket.service';


@Component({
    selector: 'app-socket',
    templateUrl: './socket.component.html',
    styleUrls: ['./socket.component.scss']
})
export class SocketComponent implements OnInit, OnDestroy {

    private socket;

    joinRoomForm: FormGroup;
    messageForm: FormGroup;

    roomInfo = [];
    message = [];

    userName: string;

    flag:boolean = false;


    constructor(
        private fb: FormBuilder,
        private socketService: SocketService,
    ) {
        this.socket = this.socketService.socket;

        this.joinRoomForm = this.fb.group({
            roomName: [''],
            userName: ['']
        });

        this.messageForm = this.fb.group({
            message: [''],
        });

    }

    ngOnInit(): void {
        this.socket.on('join:user', (data: any) => {
            console.log('server ---> client  [join:user]');
            this.roomInfo.push(data)
        })


        this.socket.on('message:receive', (data: any) => {
            console.log('server ---> client  [message:receive]');
            this.message.push(data)
        })

        this.socket.on('disconnect:user', (data: any) => {
            console.log('server ---> client  [disconnect:user]');
            this.roomInfo.push(data)
        })
    }

    ngOnDestroy() {
        this.socket.close()
    }


    // 룸 참가
    joinRoom(): void {
        const data = {
            roomName: this.joinRoomForm.value.roomName,
            userName: this.joinRoomForm.value.userName,
        }

        this.userName = this.joinRoomForm.value.userName

        console.log('client ---> server  [join:room]');
        this.socket.emit('join:room', data);

        this.joinRoomForm.reset();

        this.flag = true;
    }

    // 같은 room에 있는 사람에게 메시지 전송
    sendMessage(): void {
        const data = {
            message: this.messageForm.value.message,
        }

        console.log('client ---> server  [message:send]');
        this.socket.emit('message:send', data);

        this.messageForm.reset();
    }


    sendMessageAll(): void {
        const data = {
            userName: this.userName,
            message: this.messageForm.value.message,
        }

        console.log('client ---> server  [message:sendAll]');
        this.socket.emit('message:sendAll', data);

        this.messageForm.reset();
    }

}


