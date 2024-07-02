import { Directive, ElementRef, HostListener, Renderer2, inject, input, output } from '@angular/core';
import { FileItem } from 'src/app/core/models/file-item.models';

@Directive({
  selector: '[appUploadImage]',
  standalone: true,
})
export class UploadImageDirective {

  files = input.required<FileItem[]>();
  mouseOnBox = output<boolean>();
  elementRef = inject(ElementRef);
  private element: HTMLElement = this.elementRef.nativeElement;
  renderer2 = inject(Renderer2);


  @HostListener('dragover', ['$event'])
  onDragEnter(event: any) {
    this.mouseOnBox.emit(true);
    this._prevent( event );
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: any) {
    this.mouseOnBox.emit( false );
  }

  @HostListener('drop', ['$event'])
  onDrop(event: any){

    const transferencia = this._getTransfer( event );

    if ( !transferencia ) return;

    this._extractFiles(transferencia.files);
    this._prevent( event );

    this.mouseOnBox.emit( false );


  }
  // onDragEnter(event: any) {
  //   this.renderer2.listen(this.element, 'dragover', (e: Event) => {
  //     this.mouseOnBox.emit(true);
  //     e.preventDefault();
  //     e.stopPropagation();
  //   });
  // }


  // onDragLeave(event: any) {
  //   this.renderer2.listen(this.element, 'dragleave', (e) => {
  //     this.mouseOnBox.emit(false);
  //   });
  // }

  // onDrop(event: any) {
  //   this.renderer2.listen(this.element, 'drop', (e: Event) => {

  //     const transferencia = this._getTransfer(event);

  //     e.preventDefault();
  //     e.stopPropagation();
  //     this._extractFiles(transferencia.files);

  //     this.mouseOnBox.emit(false);

  //   });
  // }


  private _getTransfer(event: any) {
    return event.dataTransfer || event.originalEvent.dataTransfer;

  }

  private _extractFiles(fileList: FileList) {

    for (const item in Object.getOwnPropertyNames(fileList)) {
      const fileTemp = fileList[item];

      if (this.fileValid(fileTemp)) {
        const newFile = new FileItem(fileTemp);
        this.files().push(newFile);
      }
    }

    console.log(this.files())
  }

  //* validaciones
  private fileValid(file: File): boolean {

    if (!this._fileIsDropped(file.name) && this.isImage(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  private _prevent( event: any ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileIsDropped(nameFile: string): boolean {

    for (const archivo of this.files()) {
      if (archivo.name === nameFile) {
       console.log('El archivo' + nameFile+ 'Ya fue agregado')
        return true
      }
    }

    return false;
  }

  private isImage(typeFile: string): boolean {
    return (typeFile === '' || typeFile === undefined) ? false : typeFile.startsWith('image');
  }

  ngOnInit(): void {
    // this.onDragEnter(event);
    // this.onDragLeave(event);
    // this.onDrop(event);
  }



}
