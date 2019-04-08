import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ValidationService } from '../../../services/validation.service';
import { AlumnoService } from '../../../services/alumno/alumno.service';
import { SubirArchivoService } from '../../../services/subir-archivo/subir-archivo.service';
import { Alumno } from '../../../models/alumno.model';

@Component({
  selector: 'app-form-alumno',
  templateUrl: './form-alumno.component.html',
  styleUrls: ['./form-alumno.component.css']
})
export class FormAlumnoComponent implements OnInit, OnDestroy {
  private SWAL_TIMER = 3000;

  @Input() alumno: Alumno;
  @Output() alumnoChange = new EventEmitter();
  @Output() closeForm = new EventEmitter();

  private subs: Array<Subscription> = [];
  formData: FormGroup;
  fileUpload: File;

  constructor(
    private fb: FormBuilder,
    private alumnoService: AlumnoService
  ) { }

  ngOnInit() {
    this.formData = this.fb.group({
      nombre: ['', Validators.required],
      email: [, Validators.email],
      telefono: []
    });

    if (this.alumno) {
      this.formData.setValue({
        nombre: this.alumno.nombre,
        email: this.alumno.email,
        telefono: this.alumno.telefono
      });
    }
  }

  save() {
    if (this.formData.valid) {
      if (this.alumno && this.alumno._id) {
        this.update();
      } else {
        this.create();
      }
    } else {
      ValidationService.validateAllFormFields(this.formData);
    }
  }

  update() {
    const data: Alumno = this.formData.value;
    this.subs[1] = this.alumnoService.putAlumno(this.alumno._id, data).subscribe(
      (res: {}) => {
        this.alumno = res['alumno'];
        this.alumnoChange.emit(this.alumno);
        this.closeForm.emit('updated');
        swal('El alumno fue actualizado.', {
          icon: 'success',
          buttons: [false],
          timer: this.SWAL_TIMER,
        });
      },
      error => {
        swal('Error', 'Ocurrió un error al actualizar el alumno.', 'error');
        console.error(error);
      }
    );
  }

  create() {
    const data: Alumno = this.formData.value;
    this.subs[0] = this.alumnoService.postAlumno(data).subscribe(
      (res: {}) => {
        this.alumno = res['alumno'];
        this.alumnoChange.emit(this.alumno);
        this.closeForm.emit('created');
        swal('El alumno fue creado.', {
          icon: 'success',
          buttons: [false],
          timer: this.SWAL_TIMER,
        });
      },
      error => {
        swal('Error', 'Ocurrió un error al crear el alumno.', 'error');
        console.error(error);
      }
    );
  }

  cancel() {
    this.closeForm.emit('cancel');
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
