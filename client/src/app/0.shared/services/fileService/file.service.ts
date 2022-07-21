import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient
    ) { }

    // 파일 목록 가져오기
    getFileList() {
        return this.http.get('/api/v1/file/getFileList');
    }

    // 파일 업로드
    fileUpload(file: any) {
        return this.http.post('/api/v1/file/upload', file);
    }

    // 파일 다운로드
    fileDownload(data: any) {
        return this.http.get('/api/v1/file/download', {params: data, responseType: 'blob'});
    }
    
}
