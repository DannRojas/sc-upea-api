import { NgForm } from '@angular/forms';
import { PeopleService } from './../../../../services/people.service';
import { InscriptionService } from './../../../../services/inscription.service';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { InscriptionInterface, InscriptionPeopleInterface } from 'src/app/models/inscription';
import { PeopleInterface } from './../../../../models/people';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-inscription',
  templateUrl: './modal-inscription.component.html',
  styleUrls: ['./modal-inscription.component.scss']
})
export class ModalInscriptionComponent implements OnInit {

  public types:string[] = ["Estudiante", "Profesional", "Otro"];

  constructor(private inscriptionService: InscriptionService, private peopleService: PeopleService, private toastrService: ToastrService) { }

  public activatePeople: boolean = false;

  public people: PeopleInterface = {};
  public inscription: InscriptionInterface;

  public inscPeople: InscriptionPeopleInterface = {};

  @ViewChild('inscriptionForm')
  inscriptionForm: NgForm;
  @ViewChild('btnOpenMInscription')
  btnOpenMInscription: ElementRef;
  @ViewChild('btnCloseMInscription')
  btnCloseMInscription: ElementRef;

  @Output() confirmUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  updatePeople(){
    this.people = Object.assign({});
    this.people.id_persona = this.inscPeople.personaId;
    this.people.ci = this.inscPeople.ci;
    this.people.nombres = this.inscPeople.nombres;
    this.people.apellidos = this.inscPeople.apellidos;
    this.people.tipo = this.inscPeople.tipo;
    this.peopleService.updatePeople(this.people).subscribe(people => {
      this.activatePeople = false;
      this.toastrService.info("Usuario modificado satisfactoriamente", "Usuario modificado");
    })
  }

  updateInscription(){
    console.log(this.inscPeople);
    this.inscription = Object.assign({});
    this.inscription.id_inscripcion = this.inscPeople.id_inscripcion;
    this.inscription.capacitacionId = this.inscPeople.capacitacionId;
    this.inscription.personaId = this.inscPeople.personaId;
    this.inscription.fecha_insc = this.inscPeople.fecha_insc;
    this.inscription.m_cancelado = this.inscPeople.m_cancelado;
    console.log(this.inscription)
    this.inscriptionService.updateInscription(this.inscription).subscribe(inscription => {
      this.toastrService.info("Inscripción modificada satisfactoriamente", "Inscripción modificada");
    })
  }

  openModal(inscPeople: InscriptionPeopleInterface){
    this.activatePeople = false;
    this.inscriptionForm.reset();
    this.inscriptionForm.resetForm();
    this.inscPeople = Object.assign({});
    this.inscPeople = Object.assign({}, inscPeople);
    this.btnOpenMInscription.nativeElement.click();
  }

  closeModal(){
    this.confirmUpdate.emit(true);
    this.inscriptionForm.reset();
    this.inscPeople = Object.assign({});
    this.btnCloseMInscription.nativeElement.click();
  }

}
