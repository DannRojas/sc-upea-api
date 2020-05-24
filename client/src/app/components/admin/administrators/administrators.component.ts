import { ToastrService } from 'ngx-toastr';
import { ModalAdminComponent } from './modal-admin/modal-admin.component';
import { ConfirmModalComponent } from './../confirm-modal/confirm-modal.component';
import { AdministratorInterface } from './../../../models/administrator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.scss']
})
export class AdministratorsComponent implements OnInit {

  constructor(private authService: AuthService, private toastrService: ToastrService) { }

  public administrators: AdministratorInterface[];
  public selectedAdministrator: AdministratorInterface;
  public currentAdministrator: AdministratorInterface;

  @ViewChild(ConfirmModalComponent)
  confirmModalComponent: ConfirmModalComponent;

  @ViewChild(ModalAdminComponent)
  modalAdminComponent: ModalAdminComponent;

  ngOnInit(): void {
    this.authService.loading$.emit(true);
    this.getListAdministrator();
    this.currentAdministrator = this.authService.getCurrentUser();
  }

  addOrUpdateAdministrator(administrator?: AdministratorInterface){
    if(administrator)
      this.modalAdminComponent.isUpdate = true;
    else
      this.modalAdminComponent.isUpdate = false;
    this.modalAdminComponent.administratorForm.reset();
    this.modalAdminComponent.administratorForm.resetForm();
    this.selectedAdministrator = {};
    this.selectedAdministrator = Object.assign({}, administrator) || Object.assign({});
    this.modalAdminComponent.administrator = Object.assign({});
    this.modalAdminComponent.administrator = Object.assign({}, this.selectedAdministrator);
    this.modalAdminComponent.btnOpen.nativeElement.click();
  }

  posModalAdministrator(event){
    this.ngOnInit();
    if(this.modalAdminComponent.isUpdate){
      this.toastrService.success("Administrador modificado satisfactoriamente");
    }else{
      this.toastrService.success("Administrador agregado satisfactoriamente");
    }
  }

  getListAdministrator(): void{
    this.authService.getAdministrators().subscribe(administrators => {
      this.administrators = administrators;
      this.authService.loading$.emit(false);
    })
  }

  onPreDelete(administrator: AdministratorInterface){
    this.selectedAdministrator = administrator;
    this.confirmModalComponent.onPreConfirm("¿Está seguro de que desea eliminar al administrador "+administrator.nombres+"?");
  }

  onDeleteAdministrator(confirmAction: boolean){
    if(confirmAction){
      this.authService.deleteUser(this.selectedAdministrator.id_administrador).subscribe(data => this.ngOnInit());
    }else{
      this.selectedAdministrator = Object.assign({});
    }
  }

}
