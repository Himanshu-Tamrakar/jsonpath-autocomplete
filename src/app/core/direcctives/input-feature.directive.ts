import { Directive, ElementRef, Renderer, HostListener, Output, EventEmitter } from '@angular/core';
import { SubscribalService } from '../../core/services/subscribal.service';

@Directive({
  selector: '[appInputFeature]'
})
export class InputFeatureDirective {

  constructor(private el: ElementRef, private render: Renderer, private subscribalService:SubscribalService) { }

  @HostListener('document:keyup', ['$event'])
  onInputChange(event: any) {
    this.subscribalService.publishValue('KEY_UP', event.target.value);
  }

}
