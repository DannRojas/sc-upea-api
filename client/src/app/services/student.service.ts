import { StudentInterface } from './../models/student';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private url_api: string = "http://localhost:3000/api/estudiantes";

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authService.getToken()
  });

  getAllStudents(): Observable<StudentInterface[]> {
    const url_api = this.url_api;
    return this.http.get<StudentInterface[]>(url_api);
  }

  getStudentsByAttribute(attribute:string, argument:string): Observable<StudentInterface[]>{
    const url_api = `${this.url_api}?filter[where][${attribute}]=${argument}`;
    return this.http.get<StudentInterface[]>(url_api);
  }

  getStudentById(id_estudiante: number): Observable<StudentInterface> {
    const url_api = `${this.url_api}/${id_estudiante}`;
    return this.http.get<StudentInterface>(url_api);
  }

  savestudent(student: StudentInterface): Observable<StudentInterface> {
    //TODO: get token
    const url_api = this.url_api;
    return this.http.post<StudentInterface>(url_api, student);
  }

  updateStudent(student: StudentInterface): Observable<StudentInterface> {
    //TODO: get token
    const url_api = `${this.url_api}/${student.id_estudiante}`;
    return this.http.put<StudentInterface>(url_api, student).pipe(map(data => data));
  }

  deletePeople(id_estudiante: string) {
    //TODO: get token
    const token = this.authService.getToken();
    const url_api = `${this.url_api}/${id_estudiante}?access_token=${token}`;
    return this.http.delete(url_api, { headers: this.headers }).pipe(map(data => data));
  }
}
