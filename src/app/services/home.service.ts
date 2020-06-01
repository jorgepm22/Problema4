import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { adminEmail, appKey, contactEmail } from '../const/key';
import { userPath, bookingPath } from '../const/path';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient, public alertController: AlertController) { }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  private handleError(error: HttpErrorResponse) {
    const message = "Error en el servidor"

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    this.presentAlert(message)
    return throwError(
      message);
  };
  
  getBookingData(tokenSesion: string): Observable<any> {
    const adminemail = adminEmail;
    const token = tokenSesion;
    const httpRequest = {
      headers: new HttpHeaders({
        App: appKey,
        Accept: 'aplication/json',
        adminemail,
        token
      }),
      params: new HttpParams().set('current', 'true')
    };
    return this.httpClient.get(userPath + '/' + contactEmail + bookingPath, httpRequest)
    .pipe(
      catchError(this.handleError.bind(this))
    )
    
  }
}
