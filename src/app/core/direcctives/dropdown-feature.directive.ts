import { Directive, ElementRef, Renderer, HostListener, Output, EventEmitter } from '@angular/core';
import { SubscribalService } from '../../core/services/subscribal.service';
@Directive({
  selector: '[appDropdownFeature]'
})
export class DropdownFeatureDirective {

  constructor(private el: ElementRef, private render: Renderer, private subscribalService:SubscribalService) { }

  @HostListener('document:click', ['$event'])
  @HostListener('document:keyup.enter', ['$event'])
  dropdownAction(evetn:KeyboardEvent) {
    console.log('event worked', event.target['innerHTML']);
    this.subscribalService.publishValue('KEY_TO_APPEND', event.target['innerHTML']);

  }

}
