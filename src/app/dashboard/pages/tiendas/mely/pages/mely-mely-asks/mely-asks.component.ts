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
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StatusData } from 'src/app/core/interface/status-data.interface';
import { SkeletonModule } from 'primeng/skeleton';

const DEFAULT_DURATION = 0.35;

@Component({
  selector: 'app-mely-asks',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MenuModule,
    ToastModule,
    AccordionModule,
    PaginatorModule,
    BreadcrumbComponent,
    InputTextareaModule,
    SkeletonModule
  ],
  templateUrl: './mely-asks.component.html',
  styleUrl: './mely-asks.component.scss',
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

  breadcrumbHome: BreadcrumbItem = {
    icon: 'list_alt',
    label: 'Preguntas',
    separator: true,
  };

  breadcrumbItems: BreadcrumbItem[] = [
    {
      icon: 'storefront',
      label: 'Tiendas',
      separator: true,
    },

    {
      icon: 'store',
      label: 'Mercado libre',
      separator: false,
    },

    {
      icon: 'list_alt',
      label: 'Preguntas',
    },
  ];

  paginationParams: PaginationParams = {
    page: 0,
    rows: 10,
    first: 0,
    totalRecords: 0
  };

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

  statusQuestion: StatusData = {status: 'loading'};
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

  topbarLabel: string = 'Óbtener datos desde';

  topbarMenu: MenuItem[] = [

    {
      label: 'Obtener desde:',
      items: [
        {
          label: 'Último 15 días',
          command: (e) => {
            this.topbarLabel = 'Último 15 días';
          }
        },

        {
          label: 'Último 30 días',
          command: (e) => this.topbarLabel = 'Último 30 días'
        }
      ]
    }
  ];


  textAreaValue = '';

  activeAccordeon: number = -1;
isActive = false;

isOpen: boolean[] = [];

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
  this.statusQuestion.status = 'loading';
    this.melyService.getAsk(this.sort.fields, this.sort.types, this.paginationParams.rows, this.paginationParams.first)
    .pipe(
      switchMap(response => {
        this.melyService.idProductByQuestion = new Set(response.ask.questions.map(q => q.item_id));
        this.paginationParams.totalRecords = response.totalAsk
        return combineLatest({
          ask: [response.ask.questions],
          products: this.melyService.getProductAsk()
        });
      })
    )
    .subscribe({
      next: (resp) => {
        this.melyService.productByQuestion = resp.products;
        this.questions = resp.ask.map( (question: any) => this.melyService.transformQuestion(question));
         this.statusQuestion.status = resp.ask.length > 0 ? 'success' : 'empty';
         console.log(resp)

      },
      error: (err) => {
        console.log(err);
        this.statusQuestion.status = 'error';
        this.questions = [];
      }
    });
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

gg(i: number) {
  console.log(this.isOpen[i])
}
}
