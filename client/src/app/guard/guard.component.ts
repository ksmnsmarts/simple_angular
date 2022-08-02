import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-guard',
    templateUrl: './guard.component.html',
    styleUrls: ['./guard.component.scss']
})
export class GuardComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }


    // 토큰 생성
    addToken() {
        console.log(`token [set token]`)
        localStorage.setItem('token', 'tokenValue');
    }


    // 토큰 삭제
    removeToken() {
        console.log(`token [remove token]`)
        localStorage.removeItem('token');
    }

}
