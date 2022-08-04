import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { DataService } from '../../store/data.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient,
        private dataService: DataService
    ) { }

    // 유저 정보 가져오기
    // https://www.learnrxjs.io/learn-rxjs/operators/utility/do
    getUserProfile() {
		return this.http.get('/api/v1/user/getUserProfile')
		.pipe(
			tap({ 
				next: (res: any) => {
					this.dataService.setUserProfile(res);
					return res.result = true;
				},
                error: (error)=>{
                    console.log(error);
                }
			})
		);
	}    
}
