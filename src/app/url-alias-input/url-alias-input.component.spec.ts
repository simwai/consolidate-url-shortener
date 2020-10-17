import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlAliasInputComponent } from './url-alias-input.component';

describe('UrlAliasInputComponent', () => {
  let component: UrlAliasInputComponent;
  let fixture: ComponentFixture<UrlAliasInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlAliasInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlAliasInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
