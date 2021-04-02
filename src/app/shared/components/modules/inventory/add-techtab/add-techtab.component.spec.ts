import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AddTechtabComponent} from './add-techtab.component';

describe('AddTechtabComponent', () => {
  let component: AddTechtabComponent;
  let fixture: ComponentFixture<AddTechtabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTechtabComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTechtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
