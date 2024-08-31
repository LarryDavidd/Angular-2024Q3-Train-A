import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { SeatStatusType } from 'trip/models/trip.model';

@Directive({
  selector: '[appHighlight]',
  exportAs: 'appHighlight'
})
export class HighlightDirective implements OnChanges {
  @Input('appHighlight') seatStatus!: SeatStatusType;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['seatStatus']) {
      this.setColor();
    }
  }

  private setColor(): void {
    if (this.el && this.el.nativeElement) {
      let color: string;
      switch (this.seatStatus) {
        case 'free':
          color = 'rgb(30, 64, 175)'; // blue
          break;
        case 'occupied':
          color = 'rgb(156, 163, 175)'; // gray
          break;
        case 'selected':
          color = 'rgb(249, 115, 22)'; // orange
          break;
      }

      this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
      this.renderer.setStyle(this.el.nativeElement, 'border-color', color);
    }
  }
}
