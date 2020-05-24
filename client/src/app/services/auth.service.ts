import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdministratorInterface } from '../models/administrator';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  private url_api:string = "http://localhost:3000/api/administradores";
  public loading$ = new EventEmitter<boolean>();

  private selectedUser: AdministratorInterface = {};

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
    Authorization: this.getToken()
  })

  getAdministrators(): Observable<AdministratorInterface[]>{
    const accessToken = localStorage.getItem('accessToken');
    const url_api = `${this.url_api}?access_token=${accessToken}`;
    return this.http.get<AdministratorInterface[]>(url_api, {headers : this.headers});
  }

  createUser(administrator: AdministratorInterface): Observable<any>{
    let accessToken = localStorage.getItem('accessToken');
    this.prepareUser(administrator);
    const url_api = `${this.url_api}?access_token=${accessToken}`;
    return this.http.post<AdministratorInterface>(
      url_api,this.selectedUser,{ headers:this.headers }
    ).pipe(map(data => data));
  }

  updateUser(administrator: AdministratorInterface): Observable<AdministratorInterface>{
    let accessToken = localStorage.getItem('accessToken');
    const url_api = `${this.url_api}/${administrator.id_administrador}?access_token=${accessToken}`;
    return this.http.put<AdministratorInterface>(url_api, administrator, {headers: this.headers});
  }
  
  deleteUser(idUser: number){
    const accessToken = localStorage.getItem('accessToken');
    const url_api = `${this.url_api}/${idUser}?access_token=${accessToken}`;
    return this.http.delete(url_api, {headers: this.headers});
  }

  loginUser(username: string, password: string): Observable<any>{
    const url_api = `${this.url_api}/login?include=user`;
    return this.http.post<AdministratorInterface>(
      url_api,
      {
        username: username,
        password: password
      },).pipe(map(data => data));
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

  prepareUser(user: AdministratorInterface){
    this.selectedUser.ci = user.ci || "Sin CI";
    this.selectedUser.tipo = user.tipo;
    this.selectedUser.nombres = user.nombres;
    this.selectedUser.apellidos = user.apellidos || "Sin apellido";
    this.selectedUser.celular = user.celular || "Sin celular";
    this.selectedUser.username = user.username;
    this.selectedUser.email = user.email;
    this.selectedUser.password = user.password;
  }
}
