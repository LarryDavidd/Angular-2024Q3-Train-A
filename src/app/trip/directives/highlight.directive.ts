import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  exportAs: 'appHighlight'
})
export class HighlightDirective implements OnChanges {
  @Input('appHighlight') seatStatus!: 'free' | 'occupied' | 'selected';

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
          color = 'gray';
          break;
        case 'selected':
          color = 'orange';
          break;
      }

      this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    }
  }
}
