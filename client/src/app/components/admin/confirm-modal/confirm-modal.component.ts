import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor() { }

  @ViewChild('buttonOpenModal')
  buttonOpenModal: ElementRef;

  @ViewChild('buttonCloseModal')
  buttonCloseModal: ElementRef;

  @Output() confirmAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  public message:string;

  ngOnInit(): void {
  }

  onPreConfirm(message?:string){
    this.message = message;
    this.buttonOpenModal.nativeElement.click();
  }

  confirm(){
    this.confirmAction.emit(true);
    this.buttonCloseModal.nativeElement.click();
  }

}
