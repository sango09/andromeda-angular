import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailPasswordComponent } from './send-email-password.component';

describe('SendEmailPasswordComponent', () => {
  let component: SendEmailPasswordComponent;
  let fixture: ComponentFixture<SendEmailPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEmailPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
