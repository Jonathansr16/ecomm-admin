import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { UploadGallery } from 'src/app/core/models/upload-gallery';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss'],
  providers: [MessageService]

})
export class DropZoneComponent {

  @Input() arrayImages: any[] = [];

  constructor(private messageService: MessageService){}

  onUpload(event: FileUploadEvent) {
    for(let file of event.files) {
        
        this.arrayImages.push(file)
        
    }

    this.messageService.add({severity: 'info', summary: 'archivo cargado con exito!', detail: ''});

  }



  }

