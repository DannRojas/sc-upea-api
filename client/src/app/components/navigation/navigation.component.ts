import { ToastrService } from 'ngx-toastr';
import { isNullOrUndefined } from 'util';
import { AdministratorInterface } from './../../models/administrator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../user/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private toastrService: ToastrService) { }

  @ViewChild(LoginComponent)
  loginComponent: LoginComponent;

  public administrator: AdministratorInterface;
  public isLogin:boolean = false;
  public loading:boolean = true;

  ngOnInit(): void {
    this.getCurrentUser();
    this.authService.loading$.subscribe((loading:boolean)=>{
      this.loading = loading;
    })
  }

  getCurrentUser(){
    if(!isNullOrUndefined(this.authService.getCurrentUser())){
      this.administrator = this.authService.getCurrentUser();
      this.isLogin = true;
    }
  }

  openLogin(){
    this.loginComponent.onReset();
  }

  onLogout():void {
    this.authService.logoutUser().subscribe(data => data);
    this.router.navigate(["/"]);
    this.toastrService.info("Por favor espere", "Saliendo...");
    setTimeout(() => {
      location.reload();
    }, 1000);
  }

}
