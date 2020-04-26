import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { InscriptionInterface } from '../models/inscription';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private url_api: string = "http://localhost:3000/api/inscripciones";

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authService.getToken()
  });

  getAllInscriptions(): Observable<InscriptionInterface[]>{
    const url_api = this.url_api;
    return this.http.get<InscriptionInterface[]>(url_api);
  }

  getInscriptionsByAttribute(attribute:string, argument:string): Observable<InscriptionInterface[]>{
    const url_api = `${this.url_api}?filter[where][${attribute}]=${argument}`;
    return this.http.get<InscriptionInterface[]>(url_api);
  }

  getInscriptionById(id_inscripcion: number): Observable<InscriptionInterface> {
    const url_api = `${this.url_api}/${id_inscripcion}`;
    return this.http.get<InscriptionInterface>(url_api);
  }

  updateInscription(inscription: InscriptionInterface): Observable<InscriptionInterface>{
    const url_api = `${this.url_api}/${inscription.id_incripcion}`;
    return this.http.put<InscriptionInterface>(url_api, inscription).pipe(map(data => data));
  }

  deletePeople(id_inscripcion: string) {
    //TODO: get token
    const url_api = `${this.url_api}/${id_inscripcion}`;
    return this.http.delete(url_api).pipe(map(data => data));
  }

}
