import { Observable, BehaviorSubject } from 'rxjs';

/*--------------------------------------------------------------
*           BehaviorSubject()
* _state$가 값이 저장된 것보다 훨씬 늦게 subscribe 하더도
* behaviorSubject에서 마지막으로 내보낸 값을 항상 직접 가져올 수 있다. 
* https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject
--------------------------------------------------------------*/

/*--------------------------------------------------------------
*           asObservable() 
* state$가 누출되는 것을 방지.
* 이렇게 하면 subscribe만 가능하고 값을 내보낼 수 있는 사용자를 제한함.
* https://stackoverflow.com/questions/36986548/when-to-use-asobservable-in-rxjs
* https://stackoverflow.com/questions/42272821/observable-vs-asobservable
--------------------------------------------------------------*/

export class Store<T> {

	state$: Observable<T>;
	private _state$: BehaviorSubject<T>; 

	protected constructor(initialState: T) {
		this._state$ = new BehaviorSubject(initialState);
		this.state$ = this._state$.asObservable();
	}

	get state(): T {
		return this._state$.getValue();
	}

    
	setState(nextState: T): void {
        /*----------------------------
        *           next()
        * 이 메서드는 숫자, 문자열, 개체 등과 같은 값을 보냅니다.
        * https://www.tutorialspoint.com/rxjs/rxjs_observables.htm
        ----------------------------*/
		this._state$.next(nextState);
	}
}
