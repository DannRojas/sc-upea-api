import { ImageService } from 'src/app/services/image.service';
import { CapacitationService } from 'src/app/services/capacitation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CapacitationInterface } from 'src/app/models/capacitation';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  constructor( private _activatedRoute: ActivatedRoute, private capacitationService: CapacitationService, private imageService: ImageService) { }

  public capacitation: CapacitationInterface;

  ngOnInit(): void {
    const idCapacitation = this._activatedRoute.snapshot.params['id'];
    this.getCapacitation(idCapacitation);
  }

  getCapacitation(idCapacitation){
    this.capacitationService.getCapacitationById(idCapacitation).subscribe(capacitation => {
      this.imageService.getImageByName(capacitation.imagen).subscribe(image => {
        this.capacitation = capacitation;
        const blob = new Blob([image], { type: 'image/jpg' })
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.capacitation.pathImagen = reader.result.toString();
        }, false)
        if (blob)
          reader.readAsDataURL(blob);
      })
    })
  }

  

}
