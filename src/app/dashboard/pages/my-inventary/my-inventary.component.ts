import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-inventary',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './my-inventary.component.html',
  styleUrl: './my-inventary.component.scss',
})
export class MyInventaryComponent { }
