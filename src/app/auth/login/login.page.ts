import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup

  constructor( 
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private router: Router) {
      this.form = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      }); 
     }

  ngOnInit() { 
  }

  login(){
    this.authService.login(this.form.get('email').value, this.form.get('password').value).subscribe((res)=>{
      console.log(res)
      this.router.navigateByUrl('home');
    });
  }

}
