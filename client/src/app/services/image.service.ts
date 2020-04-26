import { AuthService } from './auth.service';
import { CapacitationInterface } from './../models/capacitation';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private url_api: string = "http://localhost:3000/api/containers";

  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
    Authorization: this.authService.getToken()
  });

  saveImage(file: File) {
    const token = this.authService.getToken();
    const formData = new FormData();
    formData.append(file.name, file);
    const url_api = `${this.url_api}/images/upload?access-token=${token}`;
    console.log(url_api);
    return this.http.post(url_api, formData).pipe(map(data => data));
  }

  getImageByName(imagen: string) {
    const url = `${this.url_api}/images/download/${imagen}`;
    return this.http.get(url, {responseType: 'blob'});
  }

  getAllImages(capacitations: CapacitationInterface[]): Observable<CapacitationInterface[]>{
    for(let i in capacitations){
      this.getImageByName(capacitations[i].imagen).subscribe(imagen => {
        const blob = new Blob([imagen], {type: 'image/jpg'})
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          capacitations[i].pathImagen = reader.result.toString();
        }, false)
        if(blob)
        reader.readAsDataURL(blob);
      })
    }
    return of<CapacitationInterface[]>(capacitations);
  }

  deleteImage(name: string) {
    const token = this.authService.getToken();
    const url_api = `${this.url_api}/images/files/${name}?access-token=${token}`;
    return this.http.delete(url_api, { headers: this.headers }).pipe(map(data => data));
  }
}
