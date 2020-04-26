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

  constructor(private capacitationService: CapacitationService, private imageService: ImageService) { }

  @ViewChild(ConfirmModalComponent)
  confirmModal: ConfirmModalComponent;

  private selectedCapacitation: CapacitationInterface;

  ngOnInit(): void {
    this.getListCapacitations();
  }

  getListCapacitations(): void {
    this.capacitationService.getAllCapacitations().subscribe(data => {
      this.imageService.getAllImages(data).pipe(takeUntil(this.unsubscribe$)).subscribe(capacitations => {
        this.capacitations = capacitations;
        for (let i in this.capacitations) {
          this.capacitations[i].fecha_inicio = new Date(this.capacitations[i].fecha_inicio);
          this.capacitations[i].fecha_fin = new Date(this.capacitations[i].fecha_fin);
          this.capacitations[i].fecha_inicio_insc = new Date(this.capacitations[i].fecha_inicio_insc);
          this.capacitations[i].fecha_fin_insc = new Date(this.capacitations[i].fecha_fin_insc);
        }
      })
    });
  }

  onPreDelete(capacitation: CapacitationInterface){
    this.selectedCapacitation = Object.assign({}, capacitation);
    this.confirmModal.onPreConfirm("¿Está seguro de que desea eliminar "+capacitation.nombre+"?");
  }

  onDeleteCapacitation(confirmAction: boolean){
    if(confirmAction){
      this.imageService.deleteImage(this.selectedCapacitation.imagen).subscribe(deleteImage => {
        this.capacitationService.deleteCapacitation(this.selectedCapacitation.id_capacitacion).subscribe(deleteCapacitation => this.getListCapacitations())
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
