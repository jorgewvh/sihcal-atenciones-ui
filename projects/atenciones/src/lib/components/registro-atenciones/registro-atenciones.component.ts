import { Component, OnInit, Renderer2, ElementRef, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { differenceInYears, format, subYears } from 'date-fns';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import PersonTypeAttention from '../../models/enums/PersonTypeAttention.enum';

import { LookupsService } from '../../services/lookups/lookups.service';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
import { setDataCacheStore } from '../../utils/utils';
import { RegistroAtencionesService } from '../../services/registro-atenciones/registro-atenciones.service';
import PersonType from '../../models/enums/PersonType.enum';
import AttentionType from '../../models/attention-type.model';

import workerWrapperResponseList from '../../models/workerWrapperResponseList.model';
import PatronoWrapper from '../../models/patronoWrapper';
import workersDto from '../../models/workerDto.model';
import { DateFromDatetime } from '../../utils/gestion-atenciones.pipe';
import Swal from 'sweetalert2';




@Component({
  selector: 'lib-registro-atenciones',
  templateUrl: './registro-atenciones.component.html',
  styleUrls: ['./registro-atenciones.component.scss']
})
export class RegistroAtencionesComponent implements OnInit {
  @ViewChild('overlay') $overlay: ElementRef;
  @Input() userTypeAttention: PersonTypeAttention = PersonTypeAttention.TRABAJADOR;

  personTypeAttention = PersonTypeAttention;

  formAttention: FormGroup;
  id: string = "";
  attentionId:string;
  applicantId:string;
  minDate: string;

  identityNumberPlaceholder = '0801197509876';
  identityNumberMaxLength = 13;
  identityNumberType = 'number';

  attentionTypes: any[] = [];
  applicantTypes: any [] = [];
  filterAtentions: any[] = [];
  countryList: any [] = [];

  seletedAttentionTypes: string = "";
  selectedApplicantTypes: string = "";
  selectedCountry: string = "";

  isWorker : boolean = true;
  isEmployer: boolean = true;
  isLegalOwner: boolean = true;
  isSyndicate: boolean = false;

  files: File[] = [];

  fileName: File;

  //Día del mes
  dayOfMonth: number = new Date().getUTCDate();




  constructor(
    private formBuilder: FormBuilder,
    private toolbarService: ToolbarService,
    private render2: Renderer2,
    private router: Router,
    private lookUpService: LookupsService,
    private def: ChangeDetectorRef,
    private attentionService: RegistroAtencionesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formBuild();
    
    this.lookUpService.getCountries().subscribe({
      next: (data) =>{
        this.countryList = data;
      },
      error:(error)=>{
        const err = error.message || error;
        console.warn
      }
    });

    this.attentionService.getAttentionType().subscribe({
      next: (data:any) =>{
        this.attentionTypes = data;
      },
      error:(error)=>{
        const err = error.message || error;
        console.warn(err)
      }
    });
      

    this.route.queryParams.subscribe((params:any)=>{
      /* if(params["id"]){
          this.attentionService.getFindById(params["id"]).subscribe({
          next:(res:any)=>{
            console.log("res: ", res);
            this.fillApplicantInfo(res.workersDto.workerWrapperResponseList);
          },
          error:(error)=>{
            const err = error.message||error;
            console.warn(err);
          }      
        })  
      } */
      if(params.edit || params.view){
        this.setFieldsByApplicantType(params);
        this.def.detectChanges();
        console.log('Estoy EDITANDOOO o VIENDO0000');
      }else{
        console.log('FILTRO000000');
        this.setFieldsByFilter(params);
        this.def.detectChanges();
      }
    });

    this.identityNumberType = 'text';
    this.getPersonData();
  }

  private formBuild(){
    this.formAttention = this.formBuilder.group({
      identitynumber: ['',[]],
      identityType: ['',[]],
      identificationNumber: ['',[]],
      identificationType: ['',[]],
      rtn: ['',[]],
      fullName: ['',[]],
      name: ['',[]],
      lastName: ['',[]],
      phone: ['',[]],
      phoneNumber: ['',[]],
      email: ['',[]],
      gender: ['',[]],
      legalName: ['',[]],
      commercialName: ['',[]],
      applicantId: ['',[]],
      createdAt: ['',[]],
      attentionType: ['',[Validators.required]],
      details: ['', [Validators.required,Validators.maxLength(500)]],
      applicantType: ['',[]],
      id: ['',[]],
      userId:['',[]],
      status:['',[]],
      updatedAt: ['',[]],
      attencionNumber: ['',[]],
      reason:['',[Validators.required]],
      employerId: ['',[]],
      tempStatus:['',[]],
      workerFullname: ['',[]],
      workerIdentity: ['',[]],
      fileName: ['',[]]
    })
  }

  sendFiles(id:string):void{
    if(this.fileName){
      const fileName = new FormData();
      fileName.append("file", this.fileName, this.fileName.name);
      this.attentionService.uploadFileAttention(fileName, id).subscribe({
        next:(fileName:any)=>{
          console.log("El archivo:" + this.attentionId + "subido con exito a s3.")
        }
      })
    }
  }

  isValidField(formControlName: string) {
    return this.formAttention.get(formControlName)?.touched &&
      this.formAttention.get(formControlName)?.valid
  }

  isInvalidField(formControlName: string) {
    return this.formAttention.get(formControlName)?.touched &&
      this.formAttention.get(formControlName)?.invalid
  }

  getErrorField(element: string, errorName: string) {
    return this.formAttention.get(element)?.hasError(errorName);
  }

  setMinDate() {
    this.minDate = this.formAttention.get('birthday')?.value;
  }

  substractionYears() {
    let currentSecondsDate = new Date().getTime();
    return format(subYears(currentSecondsDate, 80), 'yyyy-MM-dd');
  }

  get getCurrentDateTime() {
    return format(new Date(), "dd/MM/yyyy - hh:mm aaaaa'm'");
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
    this.formAttention.get('age')?.setValue(age.toString());
  }

  capitalizeInput(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    let val: string[] = input.value.split(' ');
    const valUpdated = val.map(str => str.charAt(0).toUpperCase() + str.slice(1))
    this.formAttention.get(field)?.setValue(valUpdated.join(' '));
  }

  get typeIdentity(){
    return this.formAttention.get('identityType')?.value;
  }

  onSelect(event:any){
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any){
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  validateForm(){
    Object.keys(this.formAttention.controls).forEach(field =>{
      const control = this.formAttention.get(field);
      if(control){
        control.markAsTouched({ onlySelf:true});
        console.log("field: ", field +" " + control.valid )
      }
    });
  }

  getUserTypeAttention():string{
    return PersonTypeAttention[this.userTypeAttention];
  }

  getUserPersonTypeEnum(label:string){
    let personTypeEnum = PersonTypeAttention.TRABAJADOR;
    if (label === 'PATRONO'){
      personTypeEnum = PersonTypeAttention.PATRONO;
    }else if( label === 'REPRESENTANTE_LEGAL'){
      personTypeEnum = PersonTypeAttention.REPRESENTANTE_LEGAL;
    }else if( label === 'APODERADO_LEGAL'){
      personTypeEnum = PersonTypeAttention.APODERADO_LEGAL;
    }else if( label === 'SINDICATO'){       
      personTypeEnum = PersonTypeAttention.SINDICATO;
    }
    return personTypeEnum;
  }

  getPersonData(){

    this.route.queryParams.subscribe((params:any)=>{
    let {identity="0", rtn="0", applicantType="0", edit} = params;

    this.attentionService.getByApplicantType(identity,applicantType,rtn).subscribe({
      next:(response:any)=>{
        this.formAttention.get('applicantType')?.setValue(applicantType); 
  
        if(response.workersDto?.workerWrapperResponseList){
        this.id =response.workersDto.workerWrapperResponseList[0].id;
        let workersDto:any =response.workersDto.workerWrapperResponseList[0];
        this.fillApplicantInfo(workersDto);
        }
       
        if(response.patronoWrapper?.patronosEmpleadoresMasterDtos){
          this.id = response.patronoWrapper.patronosEmpleadoresMasterDtos[0].id;
          let patronoWrapper:any =response.patronoWrapper.patronosEmpleadoresMasterDtos[0];
          this.fillPatronoWrapper(patronoWrapper);
        }
  
        if(response.patronoWrapper?.legalOwnerList){
          this.id = response.patronoWrapper.legalOwnerList[0].masterId;
          let patronoWrapper:any =response.patronoWrapper.legalOwnerList[0];
          this.fillPatronoWrapper(patronoWrapper);
        }
     
    },error: error => {
      console.log(error);
    }})

    })

    this.def.detectChanges();
  }

  fillApplicantInfo(data:workersDto):void{
    if(data){
      for(const [key,value] of Object.entries(data)){
        this.formAttention.get(key)?.setValue(value);
      }
    }
  }

  fillPatronoWrapper(data:PatronoWrapper):void{
    if(data){
      for(const [key,value] of Object.entries(data)){
        this.formAttention.get(key)?.setValue(value);
      }
    }
  }

  /** @returns*/ 
  getFormVariable(): any{
    return {
      identitynumber: "identitynumber",
      identityType: "identityNumber",
      rtn: "rtn",
      name: "name",
      lastName: "lastName",
      phone: "phone",
      phoneNumber: "phoneNumber",
      email: "email",
      gender: "gender",
      legalName: "legalName",
      commercialName: "commercialName",
      identificationNumber: "identificationNumber",
      identificationType: "identificationType",
      fullName: "fullName",
    }
  }

  getAge(birthDate: string): void {
    const today = new Date();
    const age = differenceInYears(today, new Date(birthDate));
    this.formAttention.get('age')?.setValue(age.toString());
  }

  getAttentionType(): AttentionType {
    let attentionType = this.attentionTypes.filter(x => x.type_attentions == this.seletedAttentionTypes);
    return attentionType[0]
  }

  setAttentionTypes(attentionType: string): void{
    this.seletedAttentionTypes = attentionType;
    this.formAttention.get("attentionType")?.setValue(this.getAttentionType().id)
  }
  
  nextToGrid( ){
    this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
    console.log(this.id);
    if(this.formAttention.valid){
      console.log(this.formAttention.value);
      this.postAttentionData(this.id);
      this.router.navigate([`/atenciones`]).then(()=>{
        /* window!.location.reload(); */
      })
      this.def.detectChanges();
    }else{
      this.validateForm();
    }
  }

  backToGrid(){
    this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
    this.router.navigate([`/atenciones`]).then(() =>{
      window!.location.reload();
    })
  }

  setFieldsByApplicantType(params: any){
    if(params.edit !== ''){
      if(params.applicantTypeName === 'Trabajador'){
        this.userTypeAttention = PersonTypeAttention.TRABAJADOR;
        this.def.detectChanges();
        return;
      }
      if(params.applicantTypeName === 'Patrono'){
        this.userTypeAttention = PersonTypeAttention.PATRONO;
        this.def.detectChanges();
        return;
      }
      if(params.applicantTypeName === 'Representante%20Legal'){
        this.userTypeAttention = PersonTypeAttention.REPRESENTANTE_LEGAL;
        this.def.detectChanges();
        return;
      }
      if(params.applicantTypeName === 'Apoderado%20Legal'){
        this.userTypeAttention = PersonTypeAttention.APODERADO_LEGAL;
        this.def.detectChanges();
        return;
      }
      if(params.applicantTypeName === 'Sindicato'){
        this.userTypeAttention = PersonTypeAttention.SINDICATO;
        this.def.detectChanges();
        return;
      }


    }
  }

  setFieldsByFilter(params: any): void{
    console.log('Filtro');
    if(params['applicantType'] === 'Patrono' && params['rtn'] != null ){ // patrono
      this.userTypeAttention = PersonTypeAttention.PATRONO;
      this.def.detectChanges();
    }else if(params['applicantType'] === 'Trabajador' && params['identity'] != null){ //trabajador
      this.userTypeAttention = PersonTypeAttention.TRABAJADOR;
      this.def.detectChanges();
    }else if(params['applicantType'] === 'Representante%20Legal' && params['identity'] && params['rtn'] != null){ //representante
      this.userTypeAttention = PersonTypeAttention.REPRESENTANTE_LEGAL;
      this.def.detectChanges();
    }else if(params['applicantType'] === 'Apoderado%20Legal' && params['identity'] && params['rtn'] != null){ //apoderado
      this.userTypeAttention = PersonTypeAttention.APODERADO_LEGAL;
      this.def.detectChanges();
    }else{ //sindicato
      this.userTypeAttention = PersonTypeAttention.SINDICATO;
      this.def.detectChanges();
    }
  }

  postAttentionData(id:string): void {
    this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
    let data: any = this.formAttention.value;
    

    if(this.attentionId){
      data["id"]= this.attentionId;
    }
    data["applicantId"]= id;
    console.log('data',data )

    if (this.attentionId) {
      this.attentionService.updateAttention(data, this.attentionId).subscribe((response: any) => {
        response ? this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay') : null;
        const { attentionDto } = response;
        setDataCacheStore(attentionDto);
      })
    } else {
      this.attentionService.postAttention(data).subscribe((response: any) => {
        response ? this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay') : null;
        const { attentionDto } = response;
        setDataCacheStore(attentionDto);
        this.formAttention.reset();
        console.log(response);
      })
    }          
  } 

  checkPostAttentionData(res:any):void{
    if(res.responseAdvisor.errorCode == 200){
      const { attentionDto} = res;
      setDataCacheStore(attentionDto);
      this.attentionId = attentionDto.id;

      //this.sendFiles(this.attentionId);  
    }else{
      // display toast
      const Toast = this.createToast();
      let toastContent: any = {
        icon: 'error',
        title: 'Ocurrio un error'
      };

      if(res.responseAdvisor){
        toastContent = {
          icon: 'error',
          title: res.responseAdvisor.errorMessages.join(",")
        };
      }
      Toast.fire(toastContent);
    }
    this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay')
  }

  createToast():any{
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

}
