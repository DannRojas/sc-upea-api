import { AdministratorInterface } from './../../../models/administrator';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmModalComponent } from './../confirm-modal/confirm-modal.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CapacitationService } from 'src/app/services/capacitation.service';
import { ImageService } from 'src/app/services/image.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CapacitationInterface } from 'src/app/models/capacitation';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  public capacitations: CapacitationInterface[];

  constructor(private capacitationService: CapacitationService, private imageService: ImageService, private authService: AuthService) { }

  @ViewChild(ConfirmModalComponent)
  confirmModal: ConfirmModalComponent;

  private selectedCapacitation: CapacitationInterface;
  private currentAdministrator: AdministratorInterface = {};

  ngOnInit(): void {
    this.authService.loading$.emit(true);
    this.getListCapacitations();
  }

  getListCapacitations(): void {
    this.currentAdministrator = this.authService.getCurrentUser();
    if(this.currentAdministrator.tipo === "propietario"){
      console.log("propietario");
      this.capacitationService.getCapacitationsByAttribute('id_administrador', this.currentAdministrator.id_administrador).subscribe(data => {
        this.imageService.getAllImages(data).pipe(takeUntil(this.unsubscribe$)).subscribe(capacitations => {
          this.capacitations = capacitations;
          for (let i in this.capacitations) {
            this.capacitations[i].fecha_inicio = new Date(this.capacitations[i].fecha_inicio);
            this.capacitations[i].fecha_fin = new Date(this.capacitations[i].fecha_fin);
            this.capacitations[i].fecha_inicio_insc = new Date(this.capacitations[i].fecha_inicio_insc);
            this.capacitations[i].fecha_fin_insc = new Date(this.capacitations[i].fecha_fin_insc);
          }
          this.authService.loading$.emit(false);
        })
      });
    }else{
      console.log("administrador");
      this.capacitationService.getAllCapacitations().subscribe(data => {
        this.imageService.getAllImages(data).pipe(takeUntil(this.unsubscribe$)).subscribe(capacitations => {
          this.capacitations = capacitations;
          for (let i in this.capacitations) {
            this.capacitations[i].fecha_inicio = new Date(this.capacitations[i].fecha_inicio);
            this.capacitations[i].fecha_fin = new Date(this.capacitations[i].fecha_fin);
            this.capacitations[i].fecha_inicio_insc = new Date(this.capacitations[i].fecha_inicio_insc);
            this.capacitations[i].fecha_fin_insc = new Date(this.capacitations[i].fecha_fin_insc);
          }
          this.authService.loading$.emit(false);
        })
      });
    }
  }

  onPreDelete(capacitation: CapacitationInterface){
    this.selectedCapacitation = Object.assign({}, capacitation);
    this.confirmModal.onPreConfirm("¿Está seguro de que desea eliminar "+capacitation.nombre+"?");
  }

  onDeleteCapacitation(confirmAction: boolean){
    if(confirmAction){
      this.imageService.deleteImage(this.selectedCapacitation.imagen).subscribe(deleteImage => {
        this.capacitationService.deleteCapacitation(this.selectedCapacitation.id_capacitacion).subscribe(deleteCapacitation => this.ngOnInit())
      })
    }else{
      this.selectedCapacitation = Object.assign({});
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
