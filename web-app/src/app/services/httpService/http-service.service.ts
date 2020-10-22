import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
// import { Observable, throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'

import { SetUrlAliasConfig } from './../http-service.interface'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  setUrlAliasConfig: SetUrlAliasConfig

  setUrlAlias(url: string, alias: string): void {
    // TODO put this in env config
    const finalUrl = 'http://localhost:3000/url/' + url + '/alias/' + alias
    this.http.post<any>(finalUrl, '').subscribe(data => {
      console.log(data)
    })
  }
}
