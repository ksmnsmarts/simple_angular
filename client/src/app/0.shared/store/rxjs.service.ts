import { Injectable } from '@angular/core';
import { Store } from './store';


class InitRxjsInfo {
    todoInfo = []; // {_id: '', checked: false}
}



@Injectable({
    providedIn: 'root'
})
export class RxjsService extends Store<any>{

    constructor(
    ) {
        super(new InitRxjsInfo());
    }

    setTodoInfo(data: any): void {
        this.setState({
            ...this.state, ...data
        });
    }

    addRxjs(data: any) {
        this.state.todoInfo.push(data)
    }

    removeRxjs(data: any) {

        const filter = this.state.todoInfo.filter(item=> item.todo != data.todo)
        this.setState({
            ...this.state, todoInfo: filter
        });
    }
}
