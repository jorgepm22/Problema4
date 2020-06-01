import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import { storageKey } from '../const/key';
import { StorageService } from '../services/storage.service';
import { Booking } from '../models/booking';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  list: Booking[] = [];

  constructor(private storage: StorageService, private homeService: HomeService) {}

  async ngOnInit(){
    let token;
    let response;
    await this.storage.getSessionToken().then(res => token = res)
    console.log(token)
    this.homeService.getBookingData(token).subscribe( res => {
      res.forEach(book => {
        this.list.push(new Booking(book.bookingId, book.tutenUserClient.firstName,
          book.tutenUserClient.lastName,book.bookingTime,
          book.locationId.streetAddress,book.bookingPrice))
        
      });
    })
    
  }

  sortBy(prop: string) {
    this.list = this.list.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    console.log(this.list.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1))
    return this.list;
  }
}
