import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechtabComponent } from './techtab.component';

describe('TechtabComponent', () => {
  let component: TechtabComponent;
  let fixture: ComponentFixture<TechtabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechtabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
