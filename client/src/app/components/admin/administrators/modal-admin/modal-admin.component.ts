import { AdministratorInterface } from './../../../../models/administrator';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-admin',
  templateUrl: './modal-admin.component.html',
  styleUrls: ['./modal-admin.component.scss']
})
export class ModalAdminComponent implements OnInit {

  constructor(private administratorService: AuthService) { }

  public administrator: AdministratorInterface = {};

  @ViewChild('btnOpen')
  btnOpen: ElementRef;

  @ViewChild('btnClose')
  btnClose: ElementRef;

  @Output()
  confirmAdd: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  openModal(){
    this.administrator = Object.assign({});
    this.btnOpen.nativeElement.click();
  }

  closeModal(){
    this.btnClose.nativeElement.click();
  }

  onAddAdministrator(){
    this.administrator.tipo="administrator";
    this.administratorService.createUser(this.administrator).subscribe(data => {
      this.confirmAdd.emit(true);
    });
  }

}
