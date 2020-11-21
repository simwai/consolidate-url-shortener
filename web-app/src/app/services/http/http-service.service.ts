import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

import { SetUrlAliasConfig } from './http-service.interface'

interface AccessToken {
  accessToken: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  setUrlAliasConfig: SetUrlAliasConfig

  setUrlAlias(url: string, alias: string): void {
    // TODO put this in env config
    const finalUrl = 'http://localhost:1000/url/' + url + '/alias/' + alias

    this.http.post<any>(finalUrl, '').subscribe(data => {
      console.log(data)
    })
  }

  login(username: string, password: string): Observable<AccessToken> {
    return this.http.post<any>('http://localhost:1000/login', {username: username, password: password})
  }

  validateToken(accessToken: string): Observable<ArrayBuffer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    })

    return this.http.post<any>('http://localhost:1000/validateToken', {accessToken: accessToken}, {headers: headers})
  }
}
