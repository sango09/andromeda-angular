import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSupportComponent } from './detail-support.component';

describe('DetailSupportComponent', () => {
  let component: DetailSupportComponent;
  let fixture: ComponentFixture<DetailSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
