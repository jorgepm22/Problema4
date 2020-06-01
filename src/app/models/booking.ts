export class Booking {
    public clientName: string;
    public bookingId: string;
    public bookingTime: string;
    public streetAddres: string;
    public bookingPrice: number;
  
    constructor(bookingId,
        firstName, 
        lastName ,
        bookingTime,
        streetAddress,
        bookingPrice) {
  
      this.clientName = firstName + ' ' + lastName;
      this.bookingId = bookingId;
      this.bookingTime = new Date(bookingTime).toLocaleDateString();
      this.bookingPrice = bookingPrice;
      this.streetAddres = streetAddress ;
    }
  }