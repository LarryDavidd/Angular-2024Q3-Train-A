import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookingService } from 'trip/services/booking.service';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.scss'
})
export class BookModalComponent implements OnInit {
  carNumber: number = 0;

  seatNumber: number = 0;

  price: number = 0;

  isBookingInProgress: boolean = false;

  @Output() isModalVisible = new EventEmitter<boolean>();

  @Output() bookingSuccess = new EventEmitter<{ carNumber: number; seatNumber: number }>();

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
    this.isBookingInProgress = true;
    this.bookingService.makeOrder().subscribe({
      next: () => {
        this.isBookingInProgress = false;
        this.bookingSuccess.emit({ carNumber: this.carNumber, seatNumber: this.seatNumber });
      },
      error: (err) => {
        this.isBookingInProgress = false;
        if (err === 'alreadyBooked') {
          this.modal.open(InfoModalComponent, {
            data: {
              errorMessage: `You already booked a seat on this train`,
              suggestionMessage: 'Please go to the Orders page to cancel the existing reservation and try again.',
              linkForRedirect: 'orders',
              errorSource: 'Booking'
            }
          });
          return;
        }
        this.modal.open(InfoModalComponent, { data: { errorMessage: `Error: ${err}` } });
        console.error(err);
      }
    });
  }

  closeModal() {
    this.bookingService.updateBooking(0, 0, 0);
    this.isModalVisible.emit(false);
  }
}
