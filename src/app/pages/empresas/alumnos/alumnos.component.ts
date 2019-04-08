import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { EmpresaService } from '../../../services/empresa/empresa.service';
import { AlumnoService } from '../../../services/alumno/alumno.service';
import { Empresa } from '../../../models/empresa.model';
import { Alumno } from '../../../models/alumno.model';

type DataTableAction = 'created' | 'updated' | 'deleted' | 'cancel';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit, OnDestroy {
  private subs: Array<Subscription> = [];
  private empresa: Empresa = { _id: null, nombre: null };
  imgSrc: String;

  alumnos: Alumno[] = [];
  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'actions'];
  dataSource = new MatTableDataSource<Alumno>();
  pageSizeOptions: number[] = [10, 25, 50];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  formAlumno: Alumno;
  showForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private alumnoService: AlumnoService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loadEmpresa(params.get('id'));
    });
  }

  loadEmpresa(id: string) {
    this.subs[0] = this.empresaService.getEmpresa(id).subscribe(
      (response: {}) => {
        this.empresa = response['empresa'];
        this.imgSrc = this.empresa.img ? this.empresaService.IMG_PATH + this.empresa.img : null;
        console.log(this.empresa);
        this.loadAlumnos();
      }
    );
  }

  loadAlumnos() {
    this.subs[1] = this.alumnoService.getAlumnos().subscribe(
      (response: {}) => {
        this.alumnos = [...response['alumnos']];
        this.refreshTable();
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    this.formAlumno = null;
    this.showForm = true;
  }

  rowClick(alumno: Alumno) {
    console.log('rowClick', alumno);
    // this.router.navigate(['empresas', empresa._id, 'alumnos']);
  }

  edit(alumno: Alumno) {
    this.formAlumno = alumno;
    this.showForm = true;
  }

  delete(alumno: Alumno) {
    swal({
      title: `Continuar eliminando el alumno ${alumno.nombre}?`,
      icon: 'warning',
      buttons: ['Cancelar', 'Eliminar'],
      dangerMode: true,
    }).then((willDelete: boolean) => {
      if (willDelete) {
        this.alumnoService.deleteAlumno(alumno._id).subscribe(
          (response: {}) => {
            this.formAlumno = alumno;
            this.dataTableAction('deleted');
          },
          (error: {}) => {
            swal('Error', `Ocurrió un error al eliminar el alumno ${alumno.nombre}.`, 'error');
            console.error(error);
          }
        );
      }
    });
  }

  closeForm(action: DataTableAction) {
    this.dataTableAction(action);
    this.showForm = false;
  }

  dataTableAction(action: DataTableAction) {
    let index: number;
    switch (action) {
      case 'created':
        this.alumnos.unshift({ ...this.formAlumno });
        this.refreshTable();
        break;

      case 'updated':
        index = this.alumnos.findIndex((alumno: Alumno) => alumno._id === this.formAlumno._id);
        if (this.alumnos[index]) {
          this.alumnos[index] = { ...this.formAlumno };
          this.refreshTable();
        }
        break;

      case 'deleted':
        index = this.alumnos.findIndex((alumno: Alumno) => alumno._id === this.formAlumno._id);
        if (this.alumnos[index]) {
          this.alumnos.splice(index, 1);
          this.refreshTable();
        }
        break;

      case 'cancel':
        break;

      default:
        console.warn('Unknown action!');
        break;
    }

    this.formAlumno = null;
  }

  refreshTable() {
    this.dataSource.data = [...this.alumnos];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
