import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CapacitationInterface } from '../models/capacitation';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CapacitationService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private url_api: string = "http://localhost:3000/api/capacitaciones";

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authService.getToken()
  });

  getAllCapacitations(): Observable<CapacitationInterface[]>{
    return this.http.get<CapacitationInterface[]>(this.url_api);
  }

  getCapacitationById(idCapacitation: number){
    let url: string = `${this.url_api}/${idCapacitation}`;
    // console.log(url);
    return this.http.get<CapacitationInterface>(url);
  }

  saveCapacitation(capacitation: CapacitationInterface){
    return this.http.post(this.url_api, capacitation);
  }

  updateCapacitation(capacitation: CapacitationInterface): Observable<CapacitationInterface> {
    //TODO: get token
    // this.prepareProduct(capacitation);
    const token = this.authService.getToken();
    const url_api = `${this.url_api}/${capacitation.id_capacitacion}/?access_token=${token}`;
    return this.http.put<CapacitationInterface>(url_api, capacitation, { headers: this.headers }).pipe(map(data => data))
  }

  deleteCapacitation(id: string) {
    //TODO: get token
    const token = this.authService.getToken();
    const url_api = `${this.url_api}/${id}?access_token=${token}`;
    return this.http.delete(url_api, { headers: this.headers }).pipe(map(data => data));
  }

  
}
