import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

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
    private storage: StorageService,
    private router: Router) {
      this.form = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      }); 
     }

  ngOnInit() { 
  }

  login(){
    this.authService.login(this.form.get('email').value, this.form.get('password').value).subscribe( async (res)=>{
      this.storage.setSessionToken(res.sessionTokenBck)
      this.router.navigateByUrl('home');
    });
  }

}
