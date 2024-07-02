export class FileItem {
    public file: File;
    public name: string;
    public objectURL: string;
    public progress: number;
    public isLoading: boolean;

    constructor(file: File) {
        this.file = file;
        this.name = file.name;
        this.objectURL = URL.createObjectURL(file);
        this.isLoading = false;
        this.progress = 0;
    }
}