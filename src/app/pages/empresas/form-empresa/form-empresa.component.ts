import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ValidationService } from '../../../services/validation.service';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import { SubirArchivoService } from '../../../services/subir-archivo/subir-archivo.service';
import { Empresa } from '../../../models/empresa.model';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent implements OnInit, OnDestroy {
  private SWAL_TIMER = 3000;

  @Input() empresa: Empresa;
  @Output() empresaChange = new EventEmitter();
  @Output() closeForm = new EventEmitter();

  private subs: Array<Subscription> = [];
  formData: FormGroup;
  fileUpload: File;
  imgSrc: String | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private subirArchivoService: SubirArchivoService
  ) { }

  ngOnInit() {
    this.formData = this.fb.group({
      nombre: ['', Validators.required]
    });

    if (this.empresa) {
      this.formData.setValue({
        nombre: this.empresa.nombre
      });
      this.imgSrc = this.empresaService.IMG_PATH + this.empresa.img;
    }
  }

  validateFile(file: File) {
    if (!file) {
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Error', 'El archivo seleccionado no es una imagen.', 'error');
      this.fileUpload = null;
      this.imgSrc = null;
      return;
    }

    this.fileUpload = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.imgSrc = reader.result;
  }

  save() {
    if (this.formData.valid) {
      if (this.empresa && this.empresa._id) {
        this.update();
      } else {
        this.create();
      }
    } else {
      ValidationService.validateAllFormFields(this.formData);
    }
  }

  update() {
    const data: Empresa = this.formData.value;
    this.subs[1] = this.empresaService.putEmpresa(this.empresa._id, data).subscribe(
      (res: {}) => {
        this.empresa = res['empresa'];
        this.uploadFile(() => {
          this.empresaChange.emit(this.empresa);
          this.closeForm.emit('updated');
          swal('La empresa fue actualizada.', {
            icon: 'success',
            buttons: [false],
            timer: this.SWAL_TIMER,
          });
        });
      },
      error => {
        swal('Error', 'Ocurrió un error al actualizar la empresa.', 'error');
        console.error(error);
      }
    );
  }

  create() {
    const data: Empresa = this.formData.value;
    this.subs[0] = this.empresaService.postEmpresa(data).subscribe(
      (res: {}) => {
        this.empresa = res['empresa'];
        this.uploadFile(() => {
          this.empresaChange.emit(this.empresa);
          this.closeForm.emit('created');
          swal('La empresa fue creada.', {
            icon: 'success',
            buttons: [false],
            timer: this.SWAL_TIMER,
          });
        });
      },
      error => {
        swal('Error', 'Ocurrió un error al crear la empresa.', 'error');
        console.error(error);
      }
    );
  }

  uploadFile(callback: Function) {
    if (this.fileUpload) {
      this.subirArchivoService.subirArchivo(this.fileUpload, 'empresas', this.empresa._id)
        .then((resp: {}) => {
          this.empresa.img = resp['empresa']['img'];
          callback();
        })
        .catch((resp: {}) => {
          console.error(resp);
          setTimeout(() => {
            swal('Ocurrion un error al subir la imagen.', {
              icon: 'warning',
              buttons: [false],
              timer: this.SWAL_TIMER,
            });
          }, this.SWAL_TIMER);
          callback();
        });
    } else {
      callback();
    }
  }

  cancel() {
    this.closeForm.emit('cancel');
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
