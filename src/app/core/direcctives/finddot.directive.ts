import { Directive, ElementRef, Renderer, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({ selector: '[appFinddot]' })
export class FinddotDirective {

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef, private render: Renderer) { }

  @HostListener('document:keyup', ['$event'])
  onInputChange(event: any) {
    // get position
    let pos = this.el.nativeElement.selectionStart;

    let val = this.el.nativeElement.value;

    setTimeout(() => {
      this.ngModelChange.emit(val);
      this.render.setElementProperty(this.el.nativeElement, 'value', "THIS VALUE");
      this.el.nativeElement.selectionStart = pos - 4;
      this.el.nativeElement.selectionEnd = pos - 4;

    })

  }

}
