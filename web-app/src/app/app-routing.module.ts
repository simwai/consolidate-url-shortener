import { UrlAliasInputComponent } from './components/url-alias-input/url-alias-input.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './components/login/login.component'
import { AuthGuardService } from './services/auth-guard/auth-guard.service'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'url-alias-input',
    component: UrlAliasInputComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
