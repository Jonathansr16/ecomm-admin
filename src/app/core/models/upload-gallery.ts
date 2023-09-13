export class UploadGallery {

    public image: File;
    public name?: string;
    public url?: string;
    public statusLoading?: boolean;
    public progreso?: number;

    constructor( image: File) {
        this.image= image;
        this.name = image.name;

        this.statusLoading = false;
        this.progreso = 0;
     }
}