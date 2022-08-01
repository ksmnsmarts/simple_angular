import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EventBusService } from '../0.shared/services/eventBus/event-bus.service';
import { EventData } from '../0.shared/services/eventBus/event.class';
import { RxjsService } from '../0.shared/store/rxjs.service';

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

    private unsubscribe$ = new Subject<void>();

    rxjsList;

    eventBusBoolean:boolean = false

    constructor(
        private rxjsService: RxjsService,
        private eventBusService: EventBusService
    ) { }

    ngOnInit(): void {

        // store
        this.rxjsService.state$.subscribe((data) => {
            this.rxjsList = data.todoInfo
        })


        // eventBus On
        this.eventBusService.on('eventBus:toggle', this.unsubscribe$, (data:any)=> {
            this.eventBusBoolean == false ? this.eventBusBoolean = true : this.eventBusBoolean = false 
            console.log(`rxjs [data ---eventBus---> ${this.eventBusBoolean}]`)
        })
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
		this.unsubscribe$.complete();
    }


    // eventBus Emit
    eventBusToggle() {
        this.eventBusService.emit(new EventData('eventBus:toggle', ''))
    }
}
