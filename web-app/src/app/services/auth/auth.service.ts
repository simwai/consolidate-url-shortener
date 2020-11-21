import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { HttpService } from '../http/http-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService) { }

  async isAuthenticated(): Promise<boolean> {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      const $response = await this.httpService.validateToken(accessToken)

      return new Promise((resolve, _reject) => {
        $response.subscribe(
          _response => resolve(true),
          _error => {
            resolve(false)
          }
        )
      })
    }
  }

  authenticate(username: string, password: string): Promise<boolean> {
    const $response = this.httpService.login(username, password)

    // TODO use interceptor
    return new Promise((resolve, _reject) => {
      $response.subscribe(
        response => {
          localStorage.setItem('accessToken', response.accessToken)
          resolve(true)
        },
        _error => {
          resolve(false)
        }
      )
    })
  }
}
