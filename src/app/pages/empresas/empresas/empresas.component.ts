import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';

import { EmpresaService } from '../../../services/empresa/empresa.service';
import { Empresa } from '../../../models/empresa.model';
import { e } from '@angular/core/src/render3';

type DataTableAction = 'created' | 'updated' | 'deleted' | 'cancel';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit, OnDestroy {
  private subs: Array<Subscription> = [];
  empresas: Empresa[] = [];
  displayedColumns: string[] = ['img', 'nombre', 'actions'];
  dataSource = new MatTableDataSource<Empresa>();
  pageSizeOptions: number[] = [10, 25, 50];

  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  formEmpresa: Empresa;
  showForm: boolean = false;
  imgPath: string;

  constructor(
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.imgPath = this.empresaService.IMG_PATH;
    this.loadEmpresas();
  }

  loadEmpresas() {
    this.subs[0] = this.empresaService.getEmpresas().subscribe(
      (response: {}) => {
        this.empresas = [...response['empresas']];
        this.refreshTable();
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    this.formEmpresa = null;
    this.showForm = true;
  }

  rowClick(empresa: Empresa) {
    console.log('rowClick', empresa);
    // this.formEmpresa = empresa;
    // this.showForm = true;
  }

  edit(empresa: Empresa) {
    this.formEmpresa = empresa;
    this.showForm = true;
  }

  delete(empresa: Empresa) {
    swal({
      title: `Continuar eliminando la empresa ${empresa.nombre}?`,
      icon: 'warning',
      buttons: ['Cancelar', 'Eliminar'],
      dangerMode: true,
    }).then((willDelete: boolean) => {
      if (willDelete) {
        this.empresaService.deleteEmpresa(empresa._id).subscribe(
          (response: {}) => {
            this.formEmpresa = empresa;
            this.dataTableAction('deleted');
          },
          (error: {}) => {
            swal('Error', `Ocurrió un error al eliminar la empresa ${empresa.nombre}.`, 'error');
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
        this.empresas.unshift({ ...this.formEmpresa });
        this.refreshTable();
        break;

      case 'updated':
        index = this.empresas.findIndex((empresa: Empresa) => empresa._id === this.formEmpresa._id);
        if (this.empresas[index]) {
          this.empresas[index] = { ...this.formEmpresa };
          this.refreshTable();
        }
        break;

      case 'deleted':
        index = this.empresas.findIndex((empresa: Empresa) => empresa._id === this.formEmpresa._id);
        if (this.empresas[index]) {
          this.empresas.splice(index, 1);
          this.refreshTable();
        }
        break;

      case 'cancel':
        break;

      default:
        console.warn('Unknown action!');
        break;
    }

    this.formEmpresa = null;
  }

  refreshTable() {
    this.dataSource.data = [...this.empresas];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
