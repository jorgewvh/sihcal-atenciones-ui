import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';

import { format } from 'date-fns';

import { LayoutService } from '@setrass-hn/layout-core';
import { ToolbarService } from './toolbar.service';
import PersonType from '../../models/enums/PersonType.enum';
import PageType from '../../models/enums/PageType.enum';
import { RegistroAtencionesPageComponent } from '../../pages/registro-atenciones-page/registro-atenciones-page.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('ktPageTitle', { static: true }) ktPageTitle: ElementRef = {} as ElementRef;
  @Input() pageType:PageType = PageType.PUBLIC;
  pageTitleAttributes: {
    [attrName: string]: string | boolean;
  };

  toolbarContainerCssClasses: string = '';
  pageTitleCssClasses: string = '';
  personTypeArray: any[] = [];
  terminationContractualArray: any[] = [];
  disablePersonType:boolean = false;
  personType: PersonType = PersonType.JURIDICA;
  constructor(
    private layout: LayoutService,
    private toolbarService: ToolbarService,
  ) {}

  ngOnInit(): void {
    this.toolbarService.disablPersonType$.subscribe( state =>{
      this.disablePersonType = state;
    });

    this.toolbarContainerCssClasses = this.layout.getStringCSSClasses('toolbarContainer');
    this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleAttributes = this.layout.getHTMLAttributes('pageTitle');

  }

  ngAfterViewInit() {

    if (this.ktPageTitle) {
      for (const key in this.pageTitleAttributes) {
        if (
          this.pageTitleAttributes.hasOwnProperty(key) &&
          this.ktPageTitle.nativeElement
        ) {
          this.ktPageTitle.nativeElement.attributes[key] =
            this.pageTitleAttributes[key];
        }
      }
    }
  }

  get getCurrentDateTime(){
    return format(new Date(), "dd/MM/yyyy - hh:mm aaaaa'm'");
  }

  getPersonTypeEnum(label: string){
    if(label === 'Comerciante Individual'){
      return PersonType.COMERCIANTE_INDIVIDUAL;
    }else if(label === 'Persona Natural'){
      return PersonType.NATURAL;
    }else{
      return PersonType.JURIDICA;
    }

  }

  getNewLabelPersonType(labelFromEnum: any) {
    switch(labelFromEnum){
      case 'JURIDICA':
        return 'Persona Jurídica'
        break;
      case 'NATURAL':
        return 'Persona Natural'
        break;
      case 'COMERCIANTE_INDIVIDUAL':
        return 'Comerciante Individual'
        break;
    }
  }

  getPersonType(event: any){
    let textSelected = event.target[event.target.selectedIndex].innerText;
    this.toolbarService.userTypeOf = this.getPersonTypeEnum(textSelected);
    this.toolbarService.userTypeOf$.emit(this.getPersonTypeEnum(textSelected));
  }

  sendSearch(value:string){
    this.toolbarService.search$.emit(value);
  }
}
