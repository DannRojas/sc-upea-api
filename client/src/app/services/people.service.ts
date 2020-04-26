import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleInterface } from '../models/people';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private url_api: string = "http://localhost:3000/api/personas";

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authService.getToken()
  });

  getAllPeoples(): Observable<PeopleInterface[]> {
    const url_api = this.url_api;
    return this.http.get<PeopleInterface[]>(url_api);
  }

  getPeopleByAttribute(attribute:string, argument:string): Observable<PeopleInterface[]>{
    const url_api = `${this.url_api}?filter[where][${attribute}]=${argument}`;
    return this.http.get<PeopleInterface[]>(url_api);
  }

  getPeopleById(id_persona: number): Observable<PeopleInterface> {
    const url_api = `${this.url_api}/${id_persona}`;
    return this.http.get<PeopleInterface>(url_api);
  }

  savePeople(people: PeopleInterface): Observable<PeopleInterface> {
    //TODO: get token
    const url_api = this.url_api;
    return this.http.post<PeopleInterface>(url_api, people);
  }

  updatePeople(people: PeopleInterface): Observable<PeopleInterface> {
    //TODO: get token
    const url_api = `${this.url_api}/${people.id_persona}`;
    return this.http.put<PeopleInterface>(url_api, people).pipe(map(data => data));
  }

  deletePeople(id_persona: string) {
    //TODO: get token
    const token = this.authService.getToken();
    const url_api = `${this.url_api}/${id_persona}?access_token=${token}`;
    return this.http.delete(url_api, { headers: this.headers }).pipe(map(data => data));
  }
}
