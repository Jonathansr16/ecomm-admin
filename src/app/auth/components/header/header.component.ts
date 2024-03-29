import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <div class="acceso-header">
      <div class="acceso-header__container container">
        <div class="acceso-header__body">
          <ng-content selector="acceso-header__title"> </ng-content>
        </div>
      </div>

      <div class="acceso-header__separator">
        <svg
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          xmlns="http://www.w3.org/2000/svg"
          y="0"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
