import { isNullOrUndefined } from 'util';
import { AdministratorInterface } from './../../models/administrator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../profile/login/login.component';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  @ViewChild(LoginComponent)
  loginComponent: LoginComponent;

  public administrator: AdministratorInterface;
  public isLogin:boolean = false;
  public loading:boolean = true;

  ngOnInit(): void {
    this.getCurrentUser();
    this.authService.loading$.subscribe((loading:boolean)=>{
      // console.log(loading);
      this.loading = loading;
    })
    // this.router.events.subscribe(event => {
    //   if(event instanceof NavigationStart){
    //     this.loading = true;
    //   }else if(event instanceof NavigationEnd){
    //     this.loading = false;
    //   }
    //   console.log(this.loading);
    // })
  }

  getCurrentUser(){
    if(!isNullOrUndefined(this.authService.getCurrentUser())){
      this.administrator = this.authService.getCurrentUser();
      this.isLogin = true;
    }else{
      this.router.navigate(["/"]);
    }
  }

  openLogin(){
    this.loginComponent.onReset();
  }

  onLogout():void {
    this.authService.logoutUser().subscribe(data => data);
    location.reload();
  }

}
