import { Component, OnInit, OnDestroy } from '@angular/core';
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
          // console.log(this.capacitations);
        }
      })
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
