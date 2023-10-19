import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class BaseHttpService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    }),
  };

  constructor(
    protected httpClient: HttpClient
  ) {}

  protected handleError(error: HttpErrorResponse) {
    let issue = {
      status : error.status,
      message : error.error.error
    };
    console.log(issue);
    return throwError(issue);
  }

  protected getRequest<T>(endpoint: string):  Observable<T> {
    return this.httpClient.get<T>(
      endpoint,
      this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  protected postRequest<T>(endpoint: string, body:any):  Observable<T> {
    return this.httpClient.post<T>(
      endpoint,
      body,
      this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  protected putRequest<T>(endpoint: string, body:any):  Observable<T> {
    return this.httpClient.put<T>(
      endpoint,
      body,
      this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  protected patchRequest<T>(endpoint: string, body:any):  Observable<T> {
    return this.httpClient.patch<T>(
      endpoint,
      body,
      this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  protected postRequestWithoutResponse<T>(endpoint: string, body:any):  Observable<T> {
    return this.httpClient.post<T>(
      endpoint,
      body,
      this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  protected deleteRequest<T>(endpoint: string):  Observable<T> {
    return this.httpClient.delete<T>(endpoint).pipe(
      catchError(this.handleError)
    );
  }
}
