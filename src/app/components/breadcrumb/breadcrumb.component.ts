
import { Component, Input } from '@angular/core';
import {Router, RouterModule } from '@angular/router';

import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';


@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  public title: string = 'Dashboard';

  @Input() breadcrumbHomeItem: BreadcrumbItem = {};
  @Input() breadcrumbItems: BreadcrumbItem[] = [];
  constructor( 
    private router: Router,
   
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

  
  }
}
