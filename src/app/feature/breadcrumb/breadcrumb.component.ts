import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, map } from 'rxjs';
import { BreadcrumbItem, BreadcrumbService } from 'src/app/core/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  public title: string = 'Dashboard';

  breadcrumbs: BreadcrumbItem[] = [];
  constructor( 
    private router: Router,
    private breadcrumbService: BreadcrumbService
    ) {

    // this.getData();


  }


  // getData() {

  //   this.router.events
  //     .pipe(
  //       filter(( e ): e is ActivationEnd => e instanceof ActivationEnd),
  //       filter( (e: ActivationEnd) => e.snapshot.firstChild === null),
  //       map( (e: ActivationEnd) => e.snapshot.data)
  //     )
  //     .subscribe( data => {

  //       console.log(data)

  //     });
  // }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.home = { icon: 'pi pi-home', routerLink: 'dashboard/home'};
    // this.items = [
    // { label: 'Computer', icon: 'pi pi-save' },
    // { label: 'Notebook' },
    // { label: 'Accessories' },
    //  { label: 'Backpacks' },
    //  { label: 'Item' }];

    this.breadcrumbs = this.breadcrumbService.getBreadcrumbs();

  }
}
