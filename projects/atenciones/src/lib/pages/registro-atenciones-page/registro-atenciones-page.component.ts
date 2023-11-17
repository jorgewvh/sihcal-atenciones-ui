import { Component, OnInit, Renderer2, ElementRef, ViewChild, TemplateRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { LayoutService } from '@setrass-hn/layout-core';
import { differenceInYears, format, subYears } from 'date-fns';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject, identity } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import AttentionType from '../../models/attention-type.model';
import { RegistroAtencionesService } from '../../services/registro-atenciones/registro-atenciones.service';
import { setDataCacheStore } from '../../utils/utils';
import { LookupsService } from '../../services/lookups/lookups.service';
import { DateFromDatetime } from '../../utils/gestion-atenciones.pipe';
import { Offices } from '../../models/office.model';
import PersonTypeAttention from '../../models/enums/PersonTypeAttention.enum';


@Component({
  selector: 'lib-registro-atenciones-page',
  templateUrl: './registro-atenciones-page.component.html',
  styleUrls: ['./registro-atenciones-page.component.scss']
})
export class RegistroAtencionesPageComponent implements OnInit, AfterViewInit {
  @ViewChild('overlay') $overlay: ElementRef;
  @ViewChild('lineMenu') $lineMenu: ElementRef;
  @ViewChild('actionsNg', {static: true}) actionsNg!: TemplateRef<any>;
  @ViewChild('stageNg') stateNg!: TemplateRef<any>;
  @ViewChild('searchFiltersModal') searchFiltersModal!: TemplateRef<any>;
  @ViewChild(DataTableDirective, { static: false})

  datatableElement: DataTableDirective;
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  search: string;
  page: number;
  length: number = 10;
  start: number = 0;
  serverSide: boolean = true;
  togglLineMenu: boolean = false;
  employerId: string = "";
  exportType: string = '0';

  formFilter: FormGroup;
  formInspectionR: FormGroup;
  formFilterToolbar: FormGroup;
  id: string = "";
  attentionId:string;
  applicantId:string;

  identityNumberPlaceholder = '0801196487659';
  identityNumberMaxLength = 13;
  identityNumberType = 'number';

  applicantType: PersonTypeAttention = PersonTypeAttention.TRABAJADOR;

  attentionTypes: any[] = [];
  applicantTypes: any[] = [];
  filterAtentions: any[] =[];
  countryList: any[]=[];


  regionalOffices: any[] = [];
  LocalOffices: any[] = [];
  rawLocalOffices: any[] = [];
  regionalOffice: string;
  localOffice: string;
  SelectedlocalOffice: string;
  SelectedlRegionalOffice: string;

  seletedAttentionTypes: string = "";
  seletedApplicantTypes: string = "";
  seletedCountry:string = "";

  fieldIdentityType: boolean = true;
  fieldIdentityNumber: boolean = true;
  fieldRtn: boolean = false;

  isShowGrid: boolean = true;
  

  personType: PersonTypeAttention = PersonTypeAttention.TRABAJADOR;

  

  minDate: string;
  pageTitleCssClasses: string = '';
  toolbarContainerCssClasses: string = '';

  constructor(
    private layout: LayoutService,
    private toolbarService: ToolbarService,
    private render2: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private attentionService: RegistroAtencionesService,
    private lookupsService: LookupsService,
    private ref: ChangeDetectorRef,
    private dateFromDatetime: DateFromDatetime,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      if(Object.values(params).length === 0){
        this.isShowGrid=true;
      }else{
        this.isShowGrid=false;
      }
    })

    this.formBuilde();
    this.formBuild();
    this.formBuildee();
    
    setTimeout(() => {
      const self = this;
      this.setDtOptions(self);
    },);
    this.toolbarSearch();
    this.toolbarExportTable();

    /* this.lookupsService.getCountries().subscribe({
      next:(data)=>{
        
        this.countryList = data;
      },
      error:(error)=>{
        const err = error.message || error;
        console.warn(err);
      }
    }); */

    this.attentionService.getAttentionType().subscribe(
      (data:any) =>{
        this.attentionTypes = data;
      },
      (error) =>{
        const err = error.message | error;
        console.warn('error!!!:', err);
      });

    this.lookupsService.getOffices().subscribe({
      next:(offices:Offices[])=>{
        this.regionalOffices = offices;
      },
      error:(error?:any)=>{
        const err = error;
        console.warn("error!!!:", err);
      },
    }); 

    this.attentionService.userTypeOfAttention$.emit(this.personType);

    for(let item in PersonTypeAttention){
        switch(item){
          case PersonTypeAttention.REPRESENTANTE_LEGAL:
            this.applicantTypes.push({
              value: item,
              label: "Representante legal"
            });
            break;


          case PersonTypeAttention.APODERADO_LEGAL:
            this.applicantTypes.push({
              value: item,
              label: "Apoderado legal"
            });
            break;
          
          case PersonTypeAttention.SINDICATO:
            this.applicantTypes.push({
              value: item,
              label: "Sindicato"
            });

            break;          
            case PersonTypeAttention.TRABAJADOR:
              this.applicantTypes.push({
                value: item,
                label: "Trabajador"
              });
  
              break;

                  
            case PersonTypeAttention.PATRONO:
            this.applicantTypes.push({
              value: item,
              label: "Patrono"
            });

            break;
        }
    }

    this.attentionService.userTypeOfAttention$.subscribe( value =>{
      this.personType = value;
      this.ref.detectChanges();
    })

    this.formFilter.valueChanges.subscribe( value =>{
      this.applicantType = value.applicantType;
    })

    this.toolbarContainerCssClasses = this.layout.getStringCSSClasses('toolbarContainer');
    this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
    this.identityNumberType = 'text';
  }

  ngAfterViewInit(): void {
    this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
    setTimeout(()=>{
      this.dtTrigger.next(this.dtOptions);
    }, 200);
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  setDtOptions(self: any): void {
    self.dtOptions = {
      paging: true,
      dom: 'lrtip',
      pageLength: this.length,
      serverSide: this.serverSide,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-MX.json"
      },
      ajax: (dataTablesParameters: any, callback: any) => self.getAttentionData(dataTablesParameters, callback),
      columns: [{
        title: '<b>No. Doc </b>',
        data: 'attentionDto.attencionNumber'
      },
      {
        title: '<b>Tipo de Atención</b>',
        data: 'attentionTypeName',
      },
      {
        title: '<b>Nombre de Solicitante</b>',
        data: 'applicantName'
      },
      {
        title: '<b>Tipo de Ciudadano</b>',
        data: 'applicantTypeName',
      },
      {
        title: '<b>Fecha y Hora</b>',
        data: 'attentionDto.createdAt',
        ngPipeInstance: this.dateFromDatetime
        // createdUp
      },
      {
        title: '<b>Estado</b>',
        data: 'attentionDto.status'
      },
      {
        title: '<b>Acciones</b>',
        data: null,
        orderable: false,
        searchable: false,
        defaultContent: '',
        ngTemplateRef: {
          ref: self.actionsNg,
        }
      }
      ],
      buttons: [
        {
          extend: 'csvHtml5',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5]
          }
        },
        {
          extend: 'print',
          title: 'Usuarios',
          exportOptions: {
            title: "Usuarios",
            columns: [0, 1, 2, 3, 4, 5]
          }
        },
        {
          extend: 'excelHtml5',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5]
          }
        }
      ]
    };
  }

  getAttentionData(dataTablesParameters: any, callback: any): any{
    let { start, length } = dataTablesParameters;
    this.start = start;
    this.length = length;
    this.page = (this.start / this.length);

    if(this.search){
      return this.getApplicantNameorLastName(this.search, callback);
    }

    ///Actualizamos serverside para que haga la paginacion en backend
    if (this.dtOptions.serverSide == false){
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api)=>{
        this.updateServerSide(dtInstance, true);
      });
    }
    if(this.length){
      this.attentionService.getGridAttentionList(this.page, this.length).subscribe((data:any)=>{
        console.log(data);
        callback({
          recordsTotal: data.totalRow,
          recordsFiltered: data.totalRow,
          data: data.attentionToGridDtoList,
        });
        data ? this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay'): null;
      }, ((error?: any)=>{
        const err = error.message | error;
        console.warn(err);
      }));
    }
    this.ref.detectChanges();
  }

  //Funcion para buscar por id
  getAttentionDataSearch(value:string, callback:any):void{
    this.attentionService.getFindById(value).subscribe((data:any)=>{
      console.log(data);
      let { attentionDto, totalRow} = data;
      callback({
        recordsTotal: totalRow,
        recordsFiltered: totalRow,
        data: attentionDto,
      });
      data ? this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay') : null;
    }, ((error?:any) =>{
      const err = error.message | error;
      console.warn(err);
    }));
    this.ref.detectChanges();
  }

  ///Funcion para buscar por nombre y/o apellido
  getApplicantNameorLastName(value: string, callback:any){
    this.attentionService.getFindByNameOrLastName(value).subscribe((data:any)=>{
      console.log(data);
      let {attentionToGridDtoList, totalRow} = data;
      callback({
        recordsTotal: totalRow,
        recordsFiltered: totalRow,
        data: attentionToGridDtoList,
      });

      data ? this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay'): null;
    },((error?:any)=>{
      const err = error.message | error;
      console.warn(err);
    }));
    this.ref.detectChanges();
  }
      
  private formBuilde(){
    this.formInspectionR = this.formBuilder.group({
      regionalOffice: ['',[Validators.required]],
      localOffice: ['',[Validators.required]],
      staffId: ['',[Validators.required]],
      managerName: ['',[Validators.required]],
      comment: ['',[Validators.maxLength(250)]],
      attentionId: ['',[]]
    })
  }

  private formBuild() {
    this.formFilter = this.formBuilder.group({
      applicantType: ['TRABAJADOR', Validators.required],
      identityType: ['DNI', [Validators.required]],
      identitynumber: ['', [Validators.required,Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]],
      rtn: ['',[Validators.required,Validators.minLength(14), Validators.maxLength(14), Validators.pattern(/^[0-9]+$/)]]
    })

    this.formFilter.get('identityType')?.valueChanges.
      subscribe(value => {
        this.formFilter.get('identitynumber')?.clearValidators();
        if (value === 'DNI') {
          this.identityNumberPlaceholder = "0801199405653";
          this.identityNumberMaxLength = 13;
          this.formFilter.get('identitynumber')?.setValidators([Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]);
        } else if (value === 'PASAPORTE') {
          this.identityNumberPlaceholder = "G876539";
          this.identityNumberMaxLength = 9;
          this.identityNumberType = 'text';
          this.formFilter.get('identitynumber')?.setValidators([Validators.required, Validators.minLength(7), Validators.maxLength(9), Validators.pattern(/[A-Z]{1}\d{6}/)]);
        } else {
          this.identityNumberPlaceholder = "08011994056539";
          this.identityNumberMaxLength = 15;
          this.identityNumberType = 'text';
          this.formFilter.get('identitynumber')?.setValidators([Validators.required, Validators.minLength(13), Validators.maxLength(15), Validators.pattern(/^[0-9]+$/)]);
        }
      });
  }

  private formBuildee(){
    this.formFilterToolbar = this.formBuilder.group({
      filterAttention: ['',[]],
      filterApplicant: ['',[]]
    })
  }

  isValidField(formControlName: string) {
    return this.formFilter.get(formControlName)?.touched &&
      this.formFilter.get(formControlName)?.valid
  }

  isInvalidField(formControlName: string) {
    return this.formFilter.get(formControlName)?.touched &&
      this.formFilter.get(formControlName)?.invalid
  }

  getErrorField(element: string, errorName: string) {
    return this.formFilter.get(element)?.hasError(errorName);
  }

  isValidFieldIR(formControlName: string) {
    return this.formInspectionR.get(formControlName)?.touched &&
      this.formInspectionR.get(formControlName)?.valid
  }

  isInvalidFieldIR(formControlName: string) {
    return this.formInspectionR.get(formControlName)?.touched &&
      this.formInspectionR.get(formControlName)?.invalid
  }

  getErrorFieldIR(element: string, errorName: string) {
    return this.formInspectionR.get(element)?.hasError(errorName);
  }

  validateForm(){
    Object.keys(this.formFilter.controls).forEach(field =>{
      const control = this.formFilter.get(field);
      if(control){
        control.markAsTouched({ onlySelf:true});
      }
    });
  }

  validatePersonType(event: any){
    
    if(event.target.value === 'TRABAJADOR'){
      this.fieldIdentityType = true;
      this.fieldIdentityNumber = true;
      this.fieldRtn = false;
    }else if(event.target.value === 'REPRESENTANTE_LEGAL' || 
    event.target.value === 'APODERADO_LEGAL'){
      this.fieldIdentityType = true;
      this.fieldIdentityNumber = true;
      this.fieldRtn = true;
    }else{
      this.fieldIdentityType = false;
      this.fieldIdentityNumber = false;
      this.fieldRtn = true;
    }
    this.ref.detectChanges();
  }

  setMinDate() {
    this.minDate = this.formFilter.get('birthday')?.value;
  }

  substractionYears() {
    let currentSecondsDate = new Date().getTime();
    return format(subYears(currentSecondsDate, 80), 'yyyy-MM-dd');
  }

  /**
  * 
  * @param {number} majorDays 
  * @returns 
  */
  getFutureDate(majorDays?: number) {
    if (majorDays) {
      let totalDay = (new Date().getDate()) + majorDays;
      return format(new Date().setDate(totalDay), 'yyyy-MM-dd');
    }
    return format(new Date(), 'yyyy-MM-dd');
  }

  calculateAge(event: Event) {
    const birthDate = (event.target as HTMLInputElement)?.value;
    const today = new Date();
    const age = differenceInYears(today, new Date(birthDate));
    this.formFilter.get('age')?.setValue(age.toString());
  }

  capitalizeInput(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    let val: string[] = input.value.split(' ');
    const valUpdated = val.map(str => str.charAt(0).toUpperCase() + str.slice(1))
    this.formFilter.get(field)?.setValue(valUpdated.join(' '));
  }

  get typeIdentity() {
    return this.formFilter.get('identityType')?.value;
  }

  setOffices(localOfficeId:string){
    this.localOffice = localOfficeId;
    this.rawLocalOffices = this.getLocalOfficesArray();
    let LocalOfficeData = this.getLocalOfficeData();
    let regionalData = this.getRegionalOfficeData(LocalOfficeData.office.parentId);
    this.getLocalOffices(regionalData.office.id);
    this.SelectedlRegionalOffice = regionalData.office.name;
    this.SelectedlocalOffice = LocalOfficeData.office.name;
    this.formInspectionR.get("regionalOffice")?.setValue(regionalData.office.id);
    this.formInspectionR.get("localOffice")?.setValue(LocalOfficeData.office.id);
}

  getLocalOfficeData(){
    let localOffice = this.rawLocalOffices.find(val => val.office.office == this.localOffice)
    return localOffice;
  }

  getRegionalOfficeData(id:any){
    let regionalOffice = this.regionalOffices.filter(x => x.office.id == id);
    return regionalOffice[0]
  }

  getLocalOffices(id:any){
    this.formInspectionR.get('localOffice')?.reset();
    this.LocalOffices = [];
    if(id){
      let office: Offices = this.regionalOffices.find(office => office.office.id === id);
      this.LocalOffices = office.childrenOffice;
    }else {
      this.formInspectionR.get('regionalOffice')?.reset();
    }
  }

  getLocalOfficesArray(){
    let localOffices = [];
      for(let regional of this.regionalOffices){ 
        for (let child of regional.childrenOffice){
          localOffices.push(child);
        }        
      }
    return localOffices;
  }

  toolbarSearch(): void {
    this.attentionService.search$.subscribe((value) => {
      this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
      this.search = value;
      console.log("datatableElement: ", this.datatableElement)
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.search(this.search);
        //Actualizamos serverSide para que haga la paginación en frontend
        this.updateServerSide(dtInstance, false);
      });
    });
  }

  toolbarExportTable(): void {
    this.toolbarService.exportType$.subscribe((value) => {
      this.datatableElement.dtInstance.then((dtInstance: any) => {
        dtInstance.button(value).trigger()
      });
    });
  }

  updateServerSide(dtInstance: DataTables.Api, serverSide: boolean): void {
    this.dtOptions.serverSide = serverSide;
    dtInstance.destroy();
    this.dtTrigger.next(this.dtOptions);
  }

  get getCurrentDateTime() {
    return format(new Date(), "dd/MM/yyyy - hh:mm aaaaa'm'");
  }

  getDateFromArray(data:any):string{
    return `${data[0]}-${data[1] >= 10 ? data[1] : "0" + data[1].toString() }-${data[2] >= 10 ? data[2] : "0" + data[2].toString()}`;
  }

  getAge(birthDate: string): void {
    const today = new Date();
    const age = differenceInYears(today, new Date(birthDate));
    this.formFilter.get('age')?.setValue(age.toString());
  }

  getApplicantType(): AttentionType {
    let applicantType = this.applicantTypes.filter(x => x.type_applicant == this.seletedApplicantTypes);
    return applicantType[0]
  }

  setApplicantTypes(applicantType: string): void{
    this.seletedApplicantTypes = applicantType;
    this.formFilter.get("applicantType")?.setValue(this.getApplicantType().id)
  }

  showAlertDelete(data: any) {
    let { id: id } = data.attentionDto;
    Swal.fire({
      icon: 'warning',
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Eliminar',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary'
      }
    }) .then((result) => {
      if (result.isConfirmed) {
        this.deleteRegistryAttention(id);
      }
    }) 
  }

  createToast(): any {
    return Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  }

  deleteRegistryAttention(id:string) : void{
    this.attentionService.deleteAttention(id).subscribe(response =>{
      let {errorCode:code}:any = response;
      let toastContent: any = {
        icon: 'success',
        title: 'Registro eliminado exitosamente!'
      }
      this.ref.detectChanges();

      const Toast = this.createToast();

      if(code != '200'){
        toastContent = {
          icon: 'error',
          title: 'Ocurrio un error al eliminar el registro'
        };
      }else{
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api)=>{
          dtInstance.draw('full-hold');
        }); 
      }
      Toast.fire(toastContent)
        })
  }
  
  editAttention(data:any):void{
    this.attentionId = data.attentionDto.id;
    console.log(data.attentionDto.id);
    //corregir la ruta
    this.router.navigate([`/atenciones/atenciones-formulario`], { queryParams: { edit: data.attentionDto.id , applicantTypeName: data.applicantTypeName} });
  }

  sendSearch(value: string) {
    this.attentionService.search$.emit(value);
  }

  openModal(template: any) {
    this.modalService.open(template, { centered: true, size: 'sm' }); 
  }

  openModalForm(template: any) {
    this.modalService.open(template, { centered: true, size: 'md' });
    this.formFilter.reset();
  }

  openAuditoria(template: any) {
    this.modalService.open(template, { centered: true, size: 'md' });
  }

  openInspectionRequest(template: any, data:any) {
    this.formInspectionR.get("attentionId")?.setValue(data.attentionDto.id);
    console.log(data);
    this.modalService.open(template, { centered: true, size: 'md' });
  }

  exportTable(): void {
    this.toolbarService.exportType$.emit(this.exportType);
  }

  nextToFormAttentions(){
    let identity = this.formFilter.get('identitynumber')?.value;
    let applicantType = this.formFilter.get('applicantType')?.value;
    let rtn = this.formFilter.get('rtn')?.value;

    
    applicantType = this.getApplicantTypeName(applicantType);

    if(applicantType != '' && identity != '' && rtn != ''){
      this.router.navigate([`/atenciones/atenciones-formulario`],
       {queryParams: {applicantType, identity, rtn}});
      this.ref.detectChanges();
      return null; 
    }else  if(applicantType != '' && identity != ''){  
        this.router.navigate([`/atenciones/atenciones-formulario`],
         {queryParams: {applicantType, identity}});
        this.ref.detectChanges();
        return null;
    }else if(applicantType != '' && rtn != ''){
      this.router.navigate([`/atenciones/atenciones-formulario`],
       {queryParams: {applicantType, rtn}});
      this.ref.detectChanges();
      return null; 
    }
  }

  getApplicantTypeName(name:string): any {
    switch(name){
      case PersonTypeAttention.REPRESENTANTE_LEGAL:
        return "Representante%20Legal";


      case PersonTypeAttention.APODERADO_LEGAL:
        return "Apoderado%20Legal";
      
      case PersonTypeAttention.SINDICATO:
       return "Sindicato";   
         
      case PersonTypeAttention.TRABAJADOR:
        return "Trabajador"; 
 
      case PersonTypeAttention.PATRONO:
          return "Patrono"; 
    }
  }

  updateInspectionRequest(id:string):void{
    this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
    let data: any = this.formInspectionR.value;

    if(this.attentionId){
      data["id"]= this.attentionId;
    }
    data["attentionId"] = id;

    console.log('data', data);

    if(this.attentionId) {
      this.attentionService.updateAttention(data, this.attentionId).subscribe((response: any) => {
        response ? this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay') : null;
        const { attentionDto } = response;
        setDataCacheStore(attentionDto);
      })
    }
  }

  nextToGridInspectionR(){
    this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
    console.log(this.id);
    if(this.formInspectionR.valid){
      this.updateInspectionRequest(this.id);
      this.router.navigate([`/atenciones`]).then(()=>{
          window!.location.reload();
      })
      this.ref.detectChanges();
    } else {
      this.validateFormInspectionR();
    }
  }

  validateFormInspectionR(){
    Object.keys(this.formInspectionR.controls).forEach(field =>{
      const control = this.formInspectionR.get(field);
      if(control){
        control.markAsTouched({ onlySelf:true});
      }
    });
  }
}
