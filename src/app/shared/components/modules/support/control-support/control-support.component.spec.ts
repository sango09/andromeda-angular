import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ControlSupportComponent} from './control-support.component';

// @ts-ignore
describe('ControlSupportComponent', () => {
  let component: ControlSupportComponent;
  let fixture: ComponentFixture<ControlSupportComponent>;

  // @ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlSupportComponent]
    })
      .compileComponents();
  });

  // @ts-ignore
  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // @ts-ignore
  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
