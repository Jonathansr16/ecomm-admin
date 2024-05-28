import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MelyAskResult } from '@mely/interfaces/mely-ask.interface';
import { MelyService } from '@mely/mely.service';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { combineLatest, forkJoin, switchMap, tap } from 'rxjs';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { AccordionModule } from 'primeng/accordion';
import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { PaginatorModule } from 'primeng/paginator';

const DEFAULT_DURATION = 0.35;


@Component({
  selector: 'app-asks',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MenuModule,
    ToastModule,
    AccordionModule,
    PaginatorModule
  ],
  templateUrl: './asks.component.html',
  styleUrl: './asks.component.scss',
  animations: [
    trigger('isActivo', [
      state(
        'true',
        style({ height: AUTO_STYLE, visibility: 'visible', opacity: 1 })
      ),
      state(
        'false',
        style({ height: '0px', visibility: 'hidden', opacity: 0 })
      ),
      transition('false => true', animate(DEFAULT_DURATION + 's ease')),
      transition('true => false', animate(DEFAULT_DURATION + 's ease')),
    ]),
  ],
  providers: [
    MessageService
  ]
})
export default class AsksComponent {
  paginationParams: PaginationParams = {
    page: 0,
    rows: 10,
    first: 0,
  };

  totalAsk = 0;
  idsProducts: string[] = [];



  sort: {
    fields: string;
    types: 'ASC' | 'DESC';
  } = {
    fields: 'date_created',
    types: 'DESC'
  }

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  melyService = inject(MelyService);

  questions: MelyAskResult[] = [];

  items: MenuItem[] = [
    {
      label: 'Filtrar por:',
      items: [
        {
          label: 'Todas las preguntas'
        }, 

        {
          label: 'Por responder'
        }, 

        {
          label: 'Respondidas'
        }
      ]
    }
  ];

  activeAccordeon: number = -1;
isActive = false;
  // combine$ = combineLatest([
  //   this.melyService.getAsk(this.sort.fields, this.sort.types, this.paginationParams.rows, this.paginationParams.first),
  //   this.melyService.getProductAsk()
  // ])

  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      const sort_fields = params.get('sort_fields');
      const sort_types = params.get('sort_types');
      const limit = params.get('limit');
      const offset = params.get('offset');

      this.paginationParams.rows = limit !== null ? +limit : 10;
      this.paginationParams.first = offset !== null ? +offset : 0;
      this.sort.fields = sort_fields !== null ? sort_fields : 'date_created';
      this.sort.types = this.validateSortType(sort_types);

      this.getQuestion();
    });
  }

  private validateSortType(sortType: string | null): 'ASC' | 'DESC' {
    if (sortType === 'ASC' || sortType === 'DESC') {
      return sortType;
    }
    return 'DESC'; // Valor por defecto
  }


getQuestion() {
    this.melyService.getAsk(this.sort.fields, this.sort.types, this.paginationParams.rows, this.paginationParams.first)
    .pipe(
      switchMap(response => {
        this.melyService.idProductByQuestion = new Set(response.questions.map(q => q.item_id));
        return forkJoin({
          ask: [response.questions],
          products: this.melyService.getProductAsk()
        });
      })
    )
    .subscribe({
      next: (resp) => {
        this.melyService.productByQuestion = resp.products;
        this.questions = resp.ask.map(question => this.melyService.transformQuestion(question));
        console.log(this.questions)
      },
      error: (err) => console.error(err)
    });
}
    
    
toggleAccordeon(index: number) {
  if(this.activeAccordeon === index) {
    this.activeAccordeon = -1;
    console.log('abierto')
  
  } else {

    this.activeAccordeon = index;
    console.log('cerrado')
  }
}


onPageChange(event: any) {
  this.paginationParams.page = event.first;
  this.paginationParams.rows = event.rows;
  this.router.navigate([], {
    relativeTo: this.activatedRoute,
    queryParams: {
      offset: event.first,
      limit: event.rows,
    },

    queryParamsHandling: 'merge',
  });
}
}
