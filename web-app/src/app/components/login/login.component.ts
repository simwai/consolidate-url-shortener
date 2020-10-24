import { FormGroup, FormControl } from '@angular/forms'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    const username: string = this.loginForm.value.username
    const password: string = this.loginForm.value.password


    const $result = this.authService.validate(username, password)
    $result.subscribe(response => {
        console.log(response)
        // this.authService.setUserInfo({user: response.user})
        this.router.navigate(['login'])
      })
    }
}
