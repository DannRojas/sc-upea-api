import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdministratorInterface } from '../models/administrator';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private url_api:string = "http://localhost:3000/api/administradores"

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json"
  })

  createUser(administrator: AdministratorInterface): Observable<any>{
    let accessToken = localStorage.getItem('accessToken');
    const url_api = `${this.url_api}?access_token=${accessToken}`;
    return this.http.post<AdministratorInterface>(
      url_api,
      {
        tipo: administrator.tipo,
        username: administrator.username,
        email: administrator.email,
        password: administrator.password
      },
      { headers:this.headers }
    ).pipe(map(data => data));
  }

  loginUser(username: string, password: string): Observable<any>{
    const url_api = `${this.url_api}/login?include=user`;
    return this.http.post<AdministratorInterface>(
      url_api,
      {
        username: username,
        password: password
      },
      {headers: this.headers}).pipe(map(data => data));
  }

  logoutUser():Observable<any> {
    let accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    const url_api = `${this.url_api}/logout?access_token=${accessToken}`;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    return this.http.post<AdministratorInterface>(url_api, {headers: this.headers});
  }

  setUser(administrator: AdministratorInterface):void {
    let user_string = JSON.stringify(administrator);
    localStorage.setItem("currentUser", user_string);
  }

  setToken(token):void {
    localStorage.setItem('accessToken', token);
  }

  getToken():string {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser():AdministratorInterface {
    let user_string = localStorage.getItem('currentUser');
    if(!isNullOrUndefined(user_string)){
      let user: AdministratorInterface = JSON.parse(user_string);
      return user;
    }else{
      return null;
    }
  }
}
