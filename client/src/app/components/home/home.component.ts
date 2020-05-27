import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from './../../services/image.service';
import { CapacitationService } from './../../services/capacitation.service';
import { CapacitationInterface } from './../../models/capacitation';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InscriptionModalComponent } from '../inscription-modal/inscription-modal.component';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  public capacitations: CapacitationInterface[];

  constructor(private capacitationService: CapacitationService, private imageService: ImageService, private toastrService: ToastrService, private authService: AuthService) { }

  @ViewChild(InscriptionModalComponent)
  inscriptionModalComponent: InscriptionModalComponent;

  private currentDate = new Date();
  private orderCapacitations: CapacitationInterface[];

  ngOnInit(): void {
    this.authService.loading$.emit(true);
    this.getListCapacitations();
    // this.toastrService.info("Este es un mensaje","Titulo",{closeButton: true, timeOut: 5000, });
  }

  getListCapacitations(): void {
    this.capacitationService.getAllCapacitations().subscribe(data => {
      this.imageService.getAllImages(data).pipe(takeUntil(this.unsubscribe$)).subscribe(capacitations => {
        this.capacitations = capacitations;

        // this.sort(capacitations);
        // console.log(this.capacitations);
        this.authService.loading$.emit(false);
        for (let i in this.capacitations) {
          this.capacitations[i].fecha_inicio = new Date(this.capacitations[i].fecha_inicio);
          this.capacitations[i].fecha_fin = new Date(this.capacitations[i].fecha_fin);
          this.capacitations[i].fecha_inicio_insc = new Date(this.capacitations[i].fecha_inicio_insc);
          this.capacitations[i].fecha_fin_insc = new Date(this.capacitations[i].fecha_fin_insc);
        }
      })
    });
  }

  // sort(capacitations: CapacitationInterface[]){
  //   let aux = 0, cont = 0, capacit: CapacitationInterface;
  //   capacitations.map(capacitation => {
  //     capacitation.fecha_fin_insc = new Date(capacitation.fecha_fin_insc);
  //   })
  //   for(let j = 0; j<capacitations.length; j++){
  //     for(let i=j; i<capacitations.length; i++){
  //       if(capacitations[i].fecha_fin_insc.getTime()>aux){
  //         capacit = capacitations[i];
  //         capacitations[i] = capacitations[cont];
  //         capacitations[cont] = capacit;
  //         aux = capacitations[i].fecha_fin_insc.getTime();
  //       }
  //     }
  //     aux = 0;
  //   }
  //   console.log(capacitations);
  // }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onEnroll(capacitation: CapacitationInterface){
    if(capacitation.fecha_fin_insc.getFullYear()>=this.currentDate.getFullYear() && capacitation.fecha_fin_insc.getMonth()>=this.currentDate.getMonth() && capacitation.fecha_fin_insc.getDate()>=this.currentDate.getDate()){
      this.inscriptionModalComponent.openModal(capacitation);
    }else{
      this.toastrService.warning("Las fechas de inscripción para esta capacitación terminaron", "Fecha terminada", {closeButton: true, timeOut: 6000 })
    }
  }

}
