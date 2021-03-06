import { ModalInscriptionComponent } from './../modal-inscription/modal-inscription.component';
import { PeopleService } from './../../../../services/people.service';
import { InscriptionService } from './../../../../services/inscription.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AdministratorInterface } from './../../../../models/administrator';
import { CapacitationInterface } from 'src/app/models/capacitation';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { CapacitationService } from 'src/app/services/capacitation.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { PeopleInterface } from 'src/app/models/people';
import { InscriptionPeopleInterface, InscriptionInterface } from 'src/app/models/inscription';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  constructor( private _activatedRoute: ActivatedRoute, private capacitationService: CapacitationService, private imageService: ImageService, private authService: AuthService, private toastrService: ToastrService, private inscriptionService: InscriptionService, private peopleService: PeopleService) { }

  private admin: AdministratorInterface;
  
  @ViewChild(ModalInscriptionComponent)
  modalInscriptionComponent: ModalInscriptionComponent;

  @ViewChild('capacitationForm')
  public capacitationForm: NgForm;

  public capacitation: CapacitationInterface = Object.assign({});
  startDate = new Date(1990, 0, 1);
  public image: File = null;
  public isUpdate:boolean = false;
  public isDisabled:boolean = false;
  public isErrorForm:boolean = false;

  ngOnInit(): void {
    this.authService.loading$.emit(true);
    this.admin=this.authService.getCurrentUser();
    const idCapacitation = this._activatedRoute.snapshot.params['id'];
    if(idCapacitation !== "0"){
      this.getCapacitation(idCapacitation);
      this.isUpdate = true;
      this.isDisabled = true;
    }else{
      this.capacitation.pathImagen = "assets/img/404imagen.png";
      this.isUpdate = false;
      this.isDisabled = false;
      this.authService.loading$.emit(false);
    }
  }

  getCapacitation(idCapacitation){
    this.capacitationService.getCapacitationById(idCapacitation).subscribe((capacitation:CapacitationInterface) => {
      this.imageService.getImageByName(capacitation.imagen).subscribe(image => {
        this.capacitation = capacitation;
        this.getInscriptions();
        const blob = new Blob([image], { type: 'image/jpg' })
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.capacitation.pathImagen = reader.result.toString();
        }, false)
        if (blob)
          reader.readAsDataURL(blob);
        this.authService.loading$.emit(false);
      })
    })
  }

  onFileSelected(image){
    try{
      this.image = image.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        this.capacitation.pathImagen = reader.result.toString();
      }
    }catch(e) {
      this.capacitation.pathImagen = "assets/img/404imagen.png";
    }
  }

  onAddOrUpdate(){
    if(this.isUpdate){
      if(this.image !== null){
        this.imageService.deleteImage(this.capacitation.imagen).subscribe(deleteImage => {
          this.capacitation.imagen = this.image.name;
          this.imageService.saveImage(this.image).subscribe(saveImage => {
            this.capacitationService.updateCapacitation(this.capacitation).subscribe(updateCapacitation => {
              this.isErrorForm = false;
              this.isDisabled = true;
              this.toastrService.info("La capacitación "+updateCapacitation.nombre+" ha sido modificada", "Capacitación modificada")
            })
          })
        })
      }else{
        this.capacitationService.updateCapacitation(this.capacitation).subscribe(updateCapacitation => {
          this.isErrorForm = false;
          this.isDisabled = true;
          this.toastrService.info("La capacitación "+updateCapacitation.nombre+" ha sido modificada", "Capacitación modificada");
        })
      }
    }else{
      if(this.capacitationForm.valid && this.capacitation.pathImagen != "../../../../assets/img/404imagen.png" && !isNullOrUndefined(this.image)){
        this.imageService.saveImage(this.image).subscribe(saveImage => {
          this.capacitation.imagen = this.image.name;
          this.capacitation.id_administrador = this.admin.id_administrador;
          this.capacitationService.saveCapacitation(this.capacitation).subscribe(newCapacitation => {
            this.isErrorForm = false;
            this.isDisabled = true;
            this.toastrService.success("La capacitación "+newCapacitation.nombre+" se ha introducido satisfactoriamente.", "Capacitación agregada")
          })
        })
      } else {
        this.isErrorForm = true;
      }
    }
  }

  // ***********************************************

  public inscPeoples: InscriptionPeopleInterface[] = [];
  public inscPeople: InscriptionPeopleInterface = {};

  public inscription: InscriptionInterface = {};
  
  @ViewChild(ConfirmModalComponent)
  confirmModal: ConfirmModalComponent;

  getInscriptions(){
    this.inscriptionService.getInscriptionsByAttribute('capacitacionId', this.capacitation.id_capacitacion).subscribe( (inscriptions : InscriptionInterface[]) => {
      if(inscriptions.length>0){
        this.inscPeoples = inscriptions;
        this.peopleService.getAllPeoples().subscribe( (peoples: PeopleInterface[]) => {
          peoples.map(people => {
            for(let i in this.inscPeoples){
              if(this.inscPeoples[i].personaId === people.id_persona){
                this.inscPeoples[i].ci = people.ci;
                this.inscPeoples[i].nombres = people.nombres;
                this.inscPeoples[i].apellidos = people.apellidos;
                this.inscPeoples[i].tipo = people.tipo;
              }
            }
          })
        })
      }else{
        this.inscPeoples = [];
      }
    })
  }

  onPreDeleteInscription( inscriptionPeople: InscriptionPeopleInterface){
    this.inscription.id_inscripcion = inscriptionPeople.id_inscripcion;
    this.confirmModal.onPreConfirm("¿Está seguro de que desea eliminar la inscripción de "+inscriptionPeople.nombres+"?");
  }

  onDeleteInscription(event){
    if(event){
      this.inscriptionService.deleteInscription(this.inscription.id_inscripcion).subscribe(data => {
        this.getInscriptions();
        this.toastrService.info("Se ha eliminado la inscripción con éxito", "Eliminado con éxito");
      })
    }
  }

}
