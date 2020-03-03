import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hide:boolean = true;
  public isError:boolean = false;
  public loginForm: FormGroup;

  constructor(private authService: AuthService) {  }

  ngOnInit(): void {
    this.Validations();
  }

  Validations(){
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      userPassword: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      let userName:string = this.loginForm.value.userName.toLowerCase();
      let userPassword:string = this.loginForm.value.userPassword.toLowerCase();
      return this.authService.loginUser(userName, userPassword).subscribe(data => {
        console.log(data.user);
        this.authService.setUser(data.user);
        const token = data.id;
        this.authService.setToken(token);
        location.reload();
      },
        error => {
          console.log(error);
          this.isError = true;
        }
      )
    }
  }

  get userName() { return this.loginForm.get('userName'); }
  get userPassword() { return this.loginForm.get('userPassword'); }

  onReset() {
    this.loginForm.reset();
  }
}
