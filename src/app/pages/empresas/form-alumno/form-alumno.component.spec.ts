import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAlumnoComponent } from './form-alumno.component';

describe('FormAlumnoComponent', () => {
  let component: FormAlumnoComponent;
  let fixture: ComponentFixture<FormAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
