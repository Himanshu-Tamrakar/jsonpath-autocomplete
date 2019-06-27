import { Directive, ElementRef, Renderer, HostListener, Output, EventEmitter } from '@angular/core';
import { SubscribalService } from '../../core/services/subscribal.service';
@Directive({
  selector: '[appDropdownFeature]'
})
export class DropdownFeatureDirective {

  constructor(private el: ElementRef, private render: Renderer, private subscribalService:SubscribalService) { }

  @HostListener('document:keyup', ['$event'])
  onInputChange(event: KeyboardEvent) {
    this.arrawClicked(event)
  }

  private arrawClicked(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 37: {
        break;
      }
      case 38: {
        console.log('from drop', event.key);
        break;
      }
      case 39: {
        break;
      }
      case 40: {
        console.log('from drop', event.key);
        break;
      }
    }
  }

  // @HostListener('document:click', ['$event'])
  // @HostListener('document:keyup.enter', ['$event'])
  // dropdownAction(evetn:KeyboardEvent) {
  //   console.log('event worked', event.target['innerHTML']);
  //   this.subscribalService.publishValue('KEY_TO_APPEND', event.target['innerHTML']);
  //
  // }

}
