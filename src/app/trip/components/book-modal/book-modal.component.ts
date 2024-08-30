import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookingService } from 'trip/services/booking.service';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [],
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.scss'
})
export class BookModalComponent implements OnInit {
  carNumber: number = 0;

  seatNumber: number = 0;

  price: number = 0;

  @Output() isModalVisible = new EventEmitter();

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.carNumber$.subscribe((carNumber) => (this.carNumber = carNumber));
    this.bookingService.seatNumber$.subscribe((seatNumber) => (this.seatNumber = seatNumber));
    this.bookingService.price$.subscribe((price) => (this.price = price));
  }

  bookTrip() {
    console.log('book');
    this.bookingService.makeOrder().subscribe({
      next: (res) => console.log(res)
    });
  }

  closeModal() {
    this.bookingService.updateBooking(0, 0, 0);
    this.isModalVisible.emit(false);
  }
}
