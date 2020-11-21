import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})

// TODO check if mergable with auth.service
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private route: Router) { }

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated()

    if (isAuthenticated) return true

    // route to login if not authenticated
    this.route.navigate(['login'])
    return false
  }
}
