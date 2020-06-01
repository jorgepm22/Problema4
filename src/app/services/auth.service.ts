import { Injectable } from '@angular/core';
import { appKey } from '../const/key';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { APIPath, loginPath } from '../const/path';
import { User } from '../models/user.model';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = {
    App: appKey,
    Accept: 'aplication/json'
  };
  constructor(private httpClient: HttpClient, public alertController: AlertController) { 
    
  }

  private handleError(error: HttpErrorResponse) {
    let message

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    if (error.status == 400)
      message = "Datos invalidos"
    else
      message = "Error del servidor"

    this.presentAlert(message)
    return throwError(
      message);
  };

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  
  login(email: string, password: string): Observable<User> {
    const headers = {
      headers: new HttpHeaders({
        ...this.headers,
        Password: password,
      }),
    }
    return this.httpClient.put<any>(loginPath + '/' + email,{}, headers)
    .pipe(
      catchError(this.handleError.bind(this))
    )
  }
}
