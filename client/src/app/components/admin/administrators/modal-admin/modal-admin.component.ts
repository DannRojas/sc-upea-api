import { NgForm } from '@angular/forms';
import { AdministratorInterface } from './../../../../models/administrator';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

interface Type{
  value: string;
  showValue: string;
}

@Component({
  selector: 'app-modal-admin',
  templateUrl: './modal-admin.component.html',
  styleUrls: ['./modal-admin.component.scss']
})

export class ModalAdminComponent implements OnInit {

  constructor(private administratorService: AuthService) { }

  public administrator: AdministratorInterface = {};

  public types: Type[] = [{value: "super-administrador", showValue: "Super-Administrador"}, {value: "administrador", showValue: "Administrador"}, {value: "propietario", showValue: "Propietario"}];

  public isUpdate:boolean;

  @ViewChild('btnOpen')
  btnOpen: ElementRef;

  @ViewChild('btnClose')
  btnClose: ElementRef;

  @ViewChild('administratorForm')
  administratorForm: NgForm;

  @Output() confirmAdd: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  onAddOrUpdateAdministrator(){
    if(this.administratorForm.valid){
      if(this.isUpdate){
        // console.log("Is Update");
        this.administratorService.updateUser(this.administrator).subscribe(data => {
          this.confirmAdd.emit(true);
          this.closeModal();
        }, (error: HttpErrorResponse) => {
          console.log(error);
        })
      }else{
        // console.log("Is New");
        this.administratorService.createUser(this.administrator).subscribe(data => {
          this.confirmAdd.emit(true);
          this.closeModal();
        }, (error: HttpErrorResponse) => {
          // console.log(error);
        });
      }
    }
  }

  openModal( administrator: AdministratorInterface ){
    this.administratorForm.reset();
    this.administrator = Object.assign({}, administrator);
    this.btnOpen.nativeElement.click();
  }

  closeModal(){
    this.administratorForm.reset();
    this.administrator = Object.assign({});
    this.btnClose.nativeElement.click();
  }

}
