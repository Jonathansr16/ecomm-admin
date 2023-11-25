import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterNoImage'
})
export class FilterNoImagePipe implements PipeTransform {

    transform(images: any[]): string {
        
        if(!images) {
            return 'assets/img/icon_producto.png';
        }

        if(images.length > 0) {
          return  images[0].src   
        } else {
            return 'assets/img/icon_producto.png';
        }


        
    }
}