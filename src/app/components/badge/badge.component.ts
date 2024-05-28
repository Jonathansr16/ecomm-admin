import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<span class="sidebar-badge" [class.sidebar-badge__wrapper]="badgeNumber() > 10">
  <i class="sidebar-badge__count rounded-full" [class]="badgeClass() ? badgeClass() : 'bg-blue-500 text-white'" [class.sidebar-badge__more-count]="badgeNumber() >10">{{badgeNumber() > 10 ? '+10' : badgeNumber()}}</i>
</span>`,
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {

  badgeNumber = input.required<number>();
  badgeClass = input<string>();
 }
