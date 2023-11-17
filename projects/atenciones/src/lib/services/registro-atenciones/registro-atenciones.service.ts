import { EventEmitter, Injectable } from "@angular/core";
import { BaseHttpService } from "../base-http.service";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import PersonTypeAttention from "../../models/enums/PersonTypeAttention.enum";
import ApplicantType from "../../models/applicant-type.model";
import AttentionDto from "../../models/attentionDto.model";
import attentionToGridDtoList from "../../models/attentionToGridDtoList";
import AttentionType from "../../models/attention-type.model";
import workerWrapperResponseList from "../../models/workerWrapperResponseList.model";
import attentionFilesDtoList from "../../models/attentionFilesDtoList.model";

@Injectable({
    providedIn: 'root'
})
export class RegistroAtencionesService extends BaseHttpService{
    
    userTypeOfAttention: PersonTypeAttention = PersonTypeAttention.TRABAJADOR;
    search$ = new EventEmitter<string>();
    auditAttention$ = new EventEmitter<string>();
    userTypeOfAttention$ = new EventEmitter<PersonTypeAttention>();

    private _refresh$ = new Subject<void>();
    readonly baseUrl = environment.API.REGISTRO_ATENCIONES;
    readonly filebaseUrl = environment.API.FILE_MANAGER;


    constructor(http: HttpClient,
    ){
        super(http);
    }

    get refresh$(){
        return this._refresh$;
    }

    /* Inicio de endpoints */
    deleteAttention(id:string):Observable<AttentionDto[]>{
        return this.deleteRequest<AttentionDto[]>(`${this.baseUrl}/attentions/v1/deleteLogicAttention/${id}`);
    }

    getApplicantType():Observable<ApplicantType>{
        return this.getRequest<ApplicantType>(`${this.baseUrl}/attentions/v1/applicantType/all`);
    }

    getAttentionType():Observable<AttentionType>{
        return this.getRequest<AttentionType>(`${this.baseUrl}/attentions/v1/attentionType/all`);
    }

    getByApplicantType(identity:any, applicantType: any, rtn:any):Observable<workerWrapperResponseList[]>{
        return this.getRequest<workerWrapperResponseList[]>(`${this.baseUrl}/attentions/v1/findByApplicantType/{identity}/${applicantType}/{rtn}?identity=${identity}&rtn=${rtn}`)
    }

    getFindById(id:string):Observable<attentionToGridDtoList[]>{
        return this.getRequest<attentionToGridDtoList[]>(`${this.baseUrl}/attentions/v1/findById/${id}`);
    }

    getFindByNameOrLastName(filters:string): Observable<attentionToGridDtoList[]>{
        return this.getRequest<attentionToGridDtoList[]>(`${this.baseUrl}/attentions/v1/findByNameOrLastName/${filters}`);
    }

    getFiltersGrid(filter:string, page:number, size:number):Observable<any>{
        return this.getRequest<any[]>(`${this.baseUrl}/attentions/v1/listAttentions/${filter}/${page}/${size}`);
    }

    getGridAttentionList(page: number, size: number): Observable<any>{
        return this.getRequest<any[]>(`${this.baseUrl}/attentions/v1/listAttentions/${page}/${size}`);
    }

    postAttention(data:any):Observable<AttentionDto[]>{
        return this.postRequest<AttentionDto[]>(`${this.baseUrl}/attentions/v1/add-new`, data);
    }

    updateAttention(data:any, AttentionId:any):Observable<any[]>{
        return this.patchRequest<any[]>(`${this.baseUrl}/attentions/v1/update/${AttentionId}`, data);
    }

    postFileAttention(data:any): Observable<attentionFilesDtoList[]>{
        return this.postRequest<attentionFilesDtoList[]>(`${this.baseUrl}/attention-files/v1/add-new-list-attention-files`, data)
    }

    deleteFileAttention(id:string): Observable<attentionFilesDtoList[]>{
        return this.deleteRequest<attentionFilesDtoList[]>(`${this.baseUrl}/attention-files/v1/deleteAttentionFile/${id}`);
    }

    getFileAttention(attentionId:string):Observable<attentionFilesDtoList[]>{
        return this.getRequest<attentionFilesDtoList[]>(`${this.baseUrl}/attention-files/v1/get-files/${attentionId}`)
    }

    updateFileAttention(data:any,id:string):Observable<attentionFilesDtoList[]>{
        return this.patchRequest<attentionFilesDtoList[]>(`${this.baseUrl}/attention-files/v1/update-attention-file/${id}`, data);
    }

    uploadFileAttention(file: FormData, attentionId:string): Observable<any>{
        return this.postFileRequest<any>(`${this.filebaseUrl}/file-uploader/staff/upload/upload/staff-files?ownerId=${attentionId}`,file);
    }

    




    

}