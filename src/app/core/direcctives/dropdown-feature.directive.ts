import { Directive, ElementRef, Renderer, HostListener, Output, EventEmitter } from '@angular/core';
import { SubscribalService } from '../../core/services/subscribal.service';
@Directive({
  selector: '[appDropdownFeature]'
})
export class DropdownFeatureDirective {
  private count:any;
  constructor(private el: ElementRef, private render: Renderer, private subscribalService: SubscribalService) {
  }

  @HostListener('document: click', ['$event'])
  @HostListener('document: keyup', ['$event'])
  onInputChange(event: KeyboardEvent) {
  debugger
    if (event.keyCode == 38) {
      setTimeout(()=>{this.el.nativeElement.scrollTop = this.el.nativeElement.scrollTop - 20;}, 50)
    } else if (event.keyCode == 40) {
      setTimeout(()=>{this.el.nativeElement.scrollTop = this.el.nativeElement.scrollTop + 20;}, 50)
    } else if(event.keyCode == 13 || event.type == 'click') {
      setTimeout(()=>{this.el.nativeElement.scrollTop = 0; }, 50)
    } else {}
  }

  // @HostListener('document:click', ['$event'])
  // @HostListener('document:keyup.enter', ['$event'])
  // dropdownAction(evetn:KeyboardEvent) {
  //   console.log('event worked', event.target['innerHTML']);
  //   this.subscribalService.publishValue('KEY_TO_APPEND', event.target['innerHTML']);
  //
  // }

}
