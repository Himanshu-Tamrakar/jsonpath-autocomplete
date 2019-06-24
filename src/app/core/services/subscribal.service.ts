import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SubscribalService {
  private keyToAppend = new Subject<any>();

  constructor() { }

  public returnSubjectKey(keyType) {
    switch(keyType) {
      case 'KEY_TO_APPEND' : {
        return this.keyToAppend;
      }
    }
  }

  public publishValue(keyType, value) {
    switch(keyType) {
      case 'KEY_TO_APPEND' : {
          this.keyToAppend.next(value);
          break;
      }
    }
  }

}
