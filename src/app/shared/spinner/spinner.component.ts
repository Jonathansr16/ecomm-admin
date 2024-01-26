import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],

})
export class SpinnerComponent {

  isLoading$ = this.spinerService.getSpinnerState();

  constructor(private readonly spinerService: SpinnerService) {}

}
