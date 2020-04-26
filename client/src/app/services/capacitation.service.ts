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
  private capacitation: CapacitationInterface = {};

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authService.getToken()
  });

  getAllCapacitations(): Observable<CapacitationInterface[]>{
    return this.http.get<CapacitationInterface[]>(this.url_api);
  }

  getCapacitationById(idCapacitation: number){
    let url: string = `${this.url_api}/${idCapacitation}`;
    return this.http.get<CapacitationInterface>(url);
  }

  saveCapacitation(capacitation: CapacitationInterface){
    // console.log("new capacitation");
    this.onPreAddOrUpdate(capacitation);
    const token = this.authService.getToken();
    return this.http.post(this.url_api, this.capacitation);
  }

  updateCapacitation(capacitation: CapacitationInterface): Observable<CapacitationInterface> {
    // console.log("update capacitation");
    this.onPreAddOrUpdate(capacitation);
    const token = this.authService.getToken();
    const url_api = `${this.url_api}/${capacitation.id_capacitacion}/?access_token=${token}`;
    return this.http.put<CapacitationInterface>(url_api, this.capacitation, { headers: this.headers }).pipe(map(data => data))
  }

  deleteCapacitation(id: string) {
    //TODO: get token
    const token = this.authService.getToken();
    const url_api = `${this.url_api}/${id}?access_token=${token}`;
    return this.http.delete(url_api, { headers: this.headers }).pipe(map(data => data));
  }

  onPreAddOrUpdate(capacitation: CapacitationInterface){
    // console.log(capacitation);
    this.capacitation.id_administrador = capacitation.id_administrador;
    this.capacitation.nombre = capacitation.nombre;
    this.capacitation.descripcion = capacitation.descripcion;
    this.capacitation.costo = capacitation.costo;
    this.capacitation.duracion = capacitation.duracion;
    this.capacitation.expositor = capacitation.expositor;
    this.capacitation.fecha_inicio = capacitation.fecha_inicio;
    this.capacitation.fecha_fin = capacitation.fecha_fin;
    this.capacitation.fecha_inicio_insc = capacitation.fecha_inicio_insc;
    this.capacitation.fecha_fin_insc = capacitation.fecha_fin_insc;
    this.capacitation.imagen = capacitation.imagen;
    this.capacitation.lugar = capacitation.lugar;
    this.capacitation.hora = capacitation.hora;
  }

  
}
