import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { UrlAliasInputComponent } from './url-alias-input/url-alias-input.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UrlAliasInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
