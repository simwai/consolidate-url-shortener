import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    const userData = localStorage.getItem('userInfo')

    if (userData && JSON.parse(userData)) return true

    return false
  }

  // TODO fix user type
  setUserInfo(user: any): void {
    localStorage.setItem('userInfo', JSON.stringify(user))
  }

  // TODO refactor into http service
  validate(username: string, password: string): Observable<object> {
    return this.http.post('http://localhost:3000/authenticate', {username: username, password: password})
  }
}
