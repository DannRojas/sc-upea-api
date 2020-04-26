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

  constructor(private authService: AuthService) { }

  public administrators: AdministratorInterface[];
  public selectedAdministrator: AdministratorInterface;

  @ViewChild(ConfirmModalComponent)
  confirmModalComponent: ConfirmModalComponent;

  @ViewChild(ModalAdminComponent)
  modalAdminComponent: ModalAdminComponent;

  ngOnInit(): void {
    this.getListAdministrator();
  }

  onAdd(){
    this.modalAdminComponent.openModal();
  }

  getListAdministrator(): void{
    this.authService.getAdministrators().subscribe(administrators => {
      this.administrators = administrators;
    })
  }

  onPreDelete(administrator: AdministratorInterface){
    this.selectedAdministrator = administrator;
    this.confirmModalComponent.onPreConfirm("¿Está seguro de que desea eliminar al administrador "+administrator.nombre+"?");
  }

  onDeleteAdministrator(confirmAction: boolean){
    if(confirmAction){
      this.authService.deleteUser(this.selectedAdministrator.id_administrador).subscribe(data => this.getListAdministrator());
    }else{
      this.selectedAdministrator = Object.assign({});
    }
  }

}
