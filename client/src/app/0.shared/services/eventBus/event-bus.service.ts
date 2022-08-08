import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { EventData } from './event.class';

/*--------------------------------------------------------------
*           'Subject' and 'BehaviorSubject'?
*   BehaviorSubject : 하나의 값을 유지하고 있다. subscribe 하면 즉시 값을 내보낸다.
*   Subject : subscribe에 대한 현재 값을 반환하지 않는다. .next(value) 시에만 출력/반환 된다.
*   https://stackoverflow.com/questions/43348463/what-is-the-difference-between-subject-and-behaviorsubject
--------------------------------------------------------------*/

@Injectable({
    providedIn: 'root'
})
export class EventBusService {

    private subject$ = new Subject();
    

    constructor() { }


    emit(event: EventData) {
        this.subject$.next(event);
    }


    on(eventName: string, unsubscribe$: any, action: any): Subscription {
        return this.subject$.pipe(
            takeUntil<any>(unsubscribe$),
            filter((e: EventData) => e.name === eventName),
            map((e: EventData) => e["value"])).subscribe(action);
    }
}
