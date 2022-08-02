import { Injectable } from '@angular/core';
import { Store } from './store';


class InitDataInfo {
    userProfile
}



@Injectable({
    providedIn: 'root'
})
export class DataService extends Store<any>{

    constructor(
    ) {
        super(new InitDataInfo());
    }

    setUserProfile(data: any): void {
        this.setState({
            ...this.state, ...data
        });
    }

}
