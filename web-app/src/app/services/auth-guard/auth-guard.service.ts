import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
// TODO check if mergable with auth.service
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private route: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) return true

    this.route.navigate(['login'])
    return false
  }
}
