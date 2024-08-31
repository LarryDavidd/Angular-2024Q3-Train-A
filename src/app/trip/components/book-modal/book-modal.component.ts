import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookingService } from 'trip/services/booking.service';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.scss'
})
export class BookModalComponent implements OnInit {
  carNumber: number = 0;

  seatNumber: number = 0;

  price: number = 0;

  @Output() isModalVisible = new EventEmitter();

  constructor(
    private bookingService: BookingService,
    private modal: MatDialog
  ) {}

  ngOnInit(): void {
    this.bookingService.carNumber$.subscribe((carNumber) => (this.carNumber = carNumber));
    this.bookingService.seatNumber$.subscribe((seatNumber) => (this.seatNumber = seatNumber));
    this.bookingService.price$.subscribe((price) => (this.price = price));
  }

  bookTrip() {
    console.log('book');
    this.bookingService.makeOrder().subscribe({
      next: (res) => console.log('orderId: ', res),
      error: (err) => {
        if (err === 'alreadyBooked') {
          this.modal.open(InfoModalComponent, {
            data: {
              errorMessage: `You already booked a seat on this train`,
              suggestionMessage: 'Please go to the Orders page to cancel the existing reservation and try again.',
              linkForRedirect: 'orders'
            }
          });
          return;
        }
        this.modal.open(InfoModalComponent, { data: `Error: ${err}` });
        console.error(err);
      }
    });
  }

  closeModal() {
    this.bookingService.updateBooking(0, 0, 0);
    this.isModalVisible.emit(false);
  }
}
