import { ElementRef, Renderer2 } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const el: ElementRef = {} as ElementRef;
    const renderer: Renderer2 = {} as Renderer2;
    const directive = new HighlightDirective(el, renderer);
    expect(directive).toBeTruthy();
  });
});
