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
  realList: Booking[] = [];
  filtro: string = "";

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
      this.realList = this.list
    })
    
  }

  filterBy() {
    this.list = this.realList.filter( item =>{ 
      if (item.bookingId.toString().includes(this.filtro) 
      || item.bookingPrice.toString().includes(this.filtro))
        return item})
  }
  sortIdBy(type){
    if ( type == "a"){
      this.list = this.realList.sort((a, b) => 
        parseFloat(a.bookingId) - parseFloat(b.bookingId));
    }
    else {
      this.list = this.realList.sort((a, b) => 
        parseFloat(b.bookingId) - parseFloat(a.bookingId));
    }
  }

  sortPriceBy(type){
    if ( type == "a"){
      this.list = this.realList.sort((a, b) => 
        a.bookingPrice - b.bookingPrice);
    }
    else {
      this.list = this.realList.sort((a, b) => 
        b.bookingPrice - a.bookingPrice);
    }
  }
}
