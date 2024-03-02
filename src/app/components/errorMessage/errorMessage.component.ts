import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>errorMessage works!</p>`,
  styleUrl: './errorMessage.component.scss',
})
export class ErrorMessageComponent { }
