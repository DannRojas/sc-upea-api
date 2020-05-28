import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AdministratorInterface } from './../../../models/administrator';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private toastrService: ToastrService) { }

  public user: AdministratorInterface;

  public oldPassword: string;
  public newPassword: string;

  public hideOldPassword: boolean = true;
  public hideNewPassword: boolean = true;

  public isDisabled: boolean = true;

  @ViewChild('passwordForm')
  passwordForm: NgForm;

  ngOnInit(): void {
    this.authService.loading$.emit(true);
    this.user = this.authService.getCurrentUser();
  }

  onChangePassword(){
    if(this.passwordForm.valid){
      this.authService.changePassword(this.oldPassword, this.newPassword).subscribe( data => {
        this.toastrService.success("Contraseña cambiada con éxito");
      },(err: HttpErrorResponse) => {
        if(err.error.error.message === "Invalid current password")
          this.toastrService.error("La contraseña actual es incorrecta");
        else
          this.toastrService.error("Intente iniciar sesión nuevamente", "Error al cambiar la contraseña");
      }, () => this.onResetForm() )
    }
  }

  ngAfterContentInit(){
    this.authService.loading$.emit(false);
  }

  onResetForm(){
    this.isDisabled = !this.isDisabled;
    this.oldPassword = "";
    this.newPassword = "";
    this.passwordForm.resetForm();
  }
}
