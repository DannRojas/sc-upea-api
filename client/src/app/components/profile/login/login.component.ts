import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hide:boolean = true;
  public isError:boolean = false;
  public loginForm: FormGroup;

  @ViewChild('btnClose')
  btnClose: ElementRef;

  @ViewChild('formDirective')
  formDirective: NgForm;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {  }

  ngOnInit(): void {
    this.Validations();
  }

  Validations(){
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      userPassword: ['', [Validators.required, Validators.minLength(5)]]
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
    this.isError = false;
    this.formDirective.resetForm();
    this.loginForm.reset();
    // this.loginForm.patchValue({
    //   userName: '',
    //   userPassword: ''
    // });
  }
}
