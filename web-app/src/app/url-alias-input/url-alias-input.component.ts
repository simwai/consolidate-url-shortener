import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { HttpService } from '../services/httpService/http-service.service'

@Component({
  selector: 'app-url-alias-input',
  templateUrl: './url-alias-input.component.html',
  styleUrls: ['./url-alias-input.component.scss']
})
export class UrlAliasInputComponent implements OnInit {
  urlAliasForm = new FormGroup({
    alias: new FormControl(''),
    url: new FormControl('')
  })

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    console.log(this.urlAliasForm.value.url)
    console.log(this.urlAliasForm.value.alias)

    this.httpService.setUrlAlias(this.urlAliasForm.value.url, this.urlAliasForm.value.alias)
  }
}
