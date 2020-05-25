import { GeneratorPDF } from './../../services/generatorPDF.service';
import { InscriptionService } from './../../services/inscription.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CapacitationInterface } from './../../models/capacitation';
import { PeopleInterface } from 'src/app/models/people';
import { PeopleService } from 'src/app/services/people.service';
import { ToastrService } from 'ngx-toastr';
import { InscriptionInterface } from 'src/app/models/inscription';

@Component({
  selector: 'app-inscription-modal',
  templateUrl: './inscription-modal.component.html',
  styleUrls: ['./inscription-modal.component.scss']
})
export class InscriptionModalComponent implements OnInit {

  constructor(private peopleService: PeopleService, private inscriptionService: InscriptionService, private toastrService: ToastrService, private generatorPDF: GeneratorPDF) { }

  public people: PeopleInterface = {};
  public ci:string = "";
  public capacitation: CapacitationInterface = {};

  public inscription : InscriptionInterface = {};

  public disablePeopleForm: boolean = false;

  public isSigned: boolean = false;

  @ViewChild('buttonOpenModal')
  openCIForm: ElementRef;

  @ViewChild('buttonCloseModal')
  closeCIForm: ElementRef;
  
  @ViewChild('ciForm')
  ciForm: NgForm;

  @ViewChild('btnOpenMPeople')
  btnOpenMPeople: ElementRef;

  @ViewChild('btnCloseMPeople')
  btnCloseMPeople: ElementRef;

  @ViewChild('peopleForm')
  peopleForm: NgForm;

  public types:string[] = ["Estudiante", "Profesional", "Otro"];

  ngOnInit(): void {
  }

  openModal(capacitation: CapacitationInterface){
    this.capacitation = Object.assign({}, capacitation);
    this.ciForm.resetForm();
    this.ci = "";
    this.resetValues();
    this.openCIForm.nativeElement.click();
  }

  resetValues(){
    this.people = Object.assign({});
    this.inscription = Object.assign({});
    this.disablePeopleForm = false;
    this.isSigned = false;
  }

  onSubmit(){
    if(this.ciForm.valid){
      this.peopleService.getPeopleByAttribute('ci', this.ci).subscribe( (peoples: PeopleInterface[]) => {
        if(peoples.length > 0){
          this.toastrService.info("Si estos no son tus datos vuelve a ingresar tu CI, si el problema persiste contáctate con un administrador","Usuario existente", {closeButton: true, timeOut: 8000});
          this.disablePeopleForm = true;
          this.closeCIForm.nativeElement.click();
          this.openRegisterPeople();
          this.people = Object.assign({}, peoples[0]);
          this.isEnrolled();
        }else{
          this.toastrService.info("Ingresa tus datos", "Usuario nuevo");
          this.disablePeopleForm = false;
          this.closeCIForm.nativeElement.click();
          this.openRegisterPeople();
          this.people = Object.assign({});
        }
      })
    }
  }

  openRegisterPeople(){
    this.peopleForm.reset();
    this.peopleForm.resetForm();
    this.btnOpenMPeople.nativeElement.click();
  }

  onRegisterPeople(){
    if(this.peopleForm.valid){
      this.people.ci = this.ci;
      this.peopleService.savePeople(this.people).subscribe( people => {
        this.people = Object.assign({}, people);
        this.disablePeopleForm = true;
        this.isEnrolled();
      })
    }
  }

  isEnrolled(){
    this.inscriptionService.getInscriptionsByAttribute('personaId', this.people.id_persona).subscribe( (inscriptions: InscriptionInterface[]) => {
      this.isSigned = false;
      inscriptions.map( inscription => {
        if(this.capacitation.id_capacitacion === inscription.capacitacionId){
          this.isSigned = true;
          this.inscription = Object.assign({}, inscription);
        }
      })
    })
  }

  onEnrolled(){
    this.inscription.capacitacionId = this.capacitation.id_capacitacion;
    this.inscription.fecha_insc = new Date();
    this.inscription.m_cancelado = 0;
    this.inscription.personaId = this.people.id_persona;
    this.inscription.id_inscripcion = null;
    this.inscriptionService.saveInscription(this.inscription).subscribe( inscription => {
      this.toastrService.info("Si la capacitación tiene costo debe regularizar este a la brevedad posible","Inscripción exitosa", {closeButton: true, timeOut: 8000});
      this.isEnrolled();
    })
  }

  closeModal(){
    this.peopleForm.resetForm();
    this.people = Object.assign({});
    this.btnCloseMPeople.nativeElement.click();
  }

  generatePDF(){
    this.generatorPDF.generateTicket(this.capacitation, this.people);
    
  }

}
