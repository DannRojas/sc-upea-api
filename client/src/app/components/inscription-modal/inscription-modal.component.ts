import { PeopleInterface } from './../../models/people';
import { PeopleService } from './../../services/people.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CapacitationInterface } from './../../models/capacitation';

@Component({
  selector: 'app-inscription-modal',
  templateUrl: './inscription-modal.component.html',
  styleUrls: ['./inscription-modal.component.scss']
})
export class InscriptionModalComponent implements OnInit {

  constructor(private peopleService: PeopleService) { }

  public people: PeopleInterface;

  @ViewChild('buttonOpenModal')
  buttonOpenModal: ElementRef;

  @ViewChild('buttonCloseModal')
  buttonCloseModal: ElementRef;
  
  @ViewChild('ciForm')
  ciForm: NgForm;

  public ci:string = "";

  ngOnInit(): void {
  }

  openModal(capacitation: CapacitationInterface){
    this.ciForm.resetForm();
    this.ci = "";
    this.buttonOpenModal.nativeElement.click();
  }

  onSubmit(){
    this.peopleService.getPeopleByAttribute("ci", this.ci).subscribe(peoples => {
      if(peoples.length>0){
        this.people = peoples[0];
      }
    })
  }

}
