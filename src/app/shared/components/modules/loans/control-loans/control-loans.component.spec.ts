import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlLoansComponent } from './control-loans.component';

describe('ControlLoansComponent', () => {
  let component: ControlLoansComponent;
  let fixture: ComponentFixture<ControlLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
