import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="login-footer">

<div class="login-footer__container container">
    <div class="login-footer__section">
        <h6 class="login-footer__h6">Servitae | Tienda en linea especializada | 2023</h6>
    </div>

    <div class="login-footer__section">
        <ul class="login-footer__ul">
            <li class="login-footer__li">
                <a href="#" class="login-footer__a"> Sobre nosotros </a>
            </li>
            <li class="login-footer__li">
                <a href="#" class="login-footer__a"> Blog </a>
            </li>
            <li class="login-footer__li">
                <a href="#" class="login-footer__a"> Contacto </a>
            </li>
        </ul>
    </div>
</div>

</footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

}
