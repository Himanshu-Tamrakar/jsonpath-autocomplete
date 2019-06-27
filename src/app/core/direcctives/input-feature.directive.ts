import { Directive, ElementRef, Renderer, HostListener, Output, EventEmitter } from '@angular/core';
import { SubscribalService } from '../../core/services/subscribal.service';

@Directive({
  selector: '[appInputFeature]'
})
export class InputFeatureDirective {

  constructor(private el: ElementRef, private render: Renderer, private subscribalService: SubscribalService) { }
  @HostListener('keydown', ['$event'])
  onKeyDown(event:any) {
    this.arrawClicked(event)
  }

  @HostListener('keyup', ['$event'])
  onInputChange(event: KeyboardEvent) {
    this.subscribalService.publishValue('KEY_UP', event.target['value']);
  }

  private arrawClicked(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 37: {
        break;
      }
      case 38: {
        //Preventing cursor to move at start point: On arrow up key pressed
        event.preventDefault();
        break;
      }
      case 39: {
        break;
      }
      case 40: {
        console.log(event.key);
        break;
      }
    }
  }

}
