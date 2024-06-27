import { Pipe, inject, type PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'pipeSafeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {

  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml{
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
