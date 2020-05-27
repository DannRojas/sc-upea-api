import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(){
    if(this.authService.getCurrentUser() && this.authService.getCurrentUser().tipo === "super-administrador"){
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
