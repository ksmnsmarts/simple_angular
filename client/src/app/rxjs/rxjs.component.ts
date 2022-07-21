import { Component, OnInit } from '@angular/core';
import { RxjsService } from '../0.shared/store/rxjs.service';

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

    rxjsList;

    constructor(
        private rxjsService: RxjsService
    ) { }

    ngOnInit(): void {

        this.rxjsService.state$.subscribe((data) => {
            this.rxjsList = data.todoInfo
        })
    }

}
