import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../0.shared/services/fileService/file.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

    imageSrc:any = '/assets/images/noimage.jpg';

    @ViewChild('fileInput') inputVar: ElementRef;

    uploadForm: FormGroup;

    fileList: any;


    constructor(
        private fb: FormBuilder,
        private fileService: FileService
    ) {
        this.uploadForm = this.fb.group({
            upload_file: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.getFileList();
    }


    // 파일 목록 가져오기
    getFileList() {
        this.fileService.getFileList().subscribe((data:any)=> {
            this.fileList = data.files
        })
    }

    // 파일 선택
    onFileChange(files: FileList) {        
        if (files.length > 0) {
            const file = files[0]

            // 이미지 미리보기
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.imageSrc = reader.result;
            };
        }
    }

    // 업로드
    onSubmit(files: FileList) {
        const formData = new FormData();
        formData.append('upload_file', files[0]);
        // console.log(formData.get('upload_file'))

        this.fileService.fileUpload(formData).subscribe((data: any)=> {
            if(data.message == 'success save') {
                this.imageSrc = '/assets/images/noimage.jpg' // no image
                this.inputVar.nativeElement.value = '' // input 초기화
                this.getFileList();
            }
        })
    }

    // 다운로드
    download(fileName:any) {
        const data = {
            name: fileName
        }
        this.fileService.fileDownload(data).subscribe((data)=> {
            const blob = data; // blob :: binary large object
            saveAs(blob, fileName);
        })
    }
}
