import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { OrderListModule } from 'primeng/orderlist';
import { PrimeNGConfig } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { UploadImageDirective } from './directives/upload-image.directive';
import { FileItem } from 'src/app/core/models/file-item.models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadModule,
    OrderListModule,
    ProgressBarModule,
    UploadImageDirective
  ],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
})
export class UploadImageComponent {
  archivos = input.required<FileItem[]>();
  // archivos: FileItem[] = [];
  uploadedFiles: any[] = [];
  totalSize: number = 0;
  isOnBox = false;

  onSelectedFiles(event: Event) {
  const input = event.target as HTMLInputElement;

  if(input.files && input.files.length > 0){

    for(let i =0; i< input.files.length; i++) {
      const file = input.files[i];

     const fileItem = new FileItem(file);
     this.archivos().push(fileItem)
  
    }
  }
  }

  choose(event:any, callback:any) {
    callback();
}




  removeFile(index: number) {
    this.archivos().splice(index, 1)
  }

  testOnBox(event: any) {
    console.log(event);
  }

  drop(event: CdkDragDrop<File[]>) {
    moveItemInArray(this.archivos(), event.previousIndex, event.currentIndex)
  }



}

