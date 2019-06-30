import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SubscribalService {
  private sI = 0;
  private suggestedArrayOption = [];
  private fiteredSuggestedArrayOption=[];
  private keyToAppend = new Subject<any>();
  private keyUp = new Subject<string>();
  private selectedItemIndex = new Subject<number>();
  private suggestedArray = new Subject<any>();

  constructor() { }

  public returnSubjectKey(keyType) {
    switch (keyType) {
      case 'KEY_TO_APPEND': {
        return this.keyToAppend;
      }
      case 'KEY_UP': {
        return this.keyUp;
      }
      case 'ITEM_INDEX': {
        return this.selectedItemIndex;
      }
      case 'SUGGESTED_ARRAY': {
        return this.suggestedArray;
      }
    }
  }

  public publishValue(keyType, value) {
    switch (keyType) {
      case 'KEY_TO_APPEND': {
        this.keyToAppend.next(value);
        break;
      }
      case 'KEY_UP': {
        this.keyUp.next(value);
        break;
      }
      case 'ITEM_INDEX': {
        this.selectedItemIndex.next(value)
      }
      case 'SUGGESTED_ARRAY': {
        this.suggestedArray.next(value);
      }
    }
  }

  public selectedIndexValue(operator) {
    if(operator == '+') this.sI++;
    else this.sI--;

    if(this.sI < 0) this.sI=0;
    if(this.suggestedArrayOption.length-1 < this.sI) this.sI = this.suggestedArrayOption.length-1;

    this.publishValue('ITEM_INDEX', this.sI);
  }

  public resetIndex() {
    this.sI =0;
    this.publishValue('ITEM_INDEX', this.sI);
  }

  public setSuggestedArray(obj:any) {
    this.suggestedArrayOption = obj;
    this.setFiteredSuggestedArrayOption(obj);
    this.resetIndex();
    this.publishValue('SUGGESTED_ARRAY', this.suggestedArrayOption);
  }

  public setFiteredSuggestedArrayOption(obj) {
    if(Array.isArray(obj)) this.fiteredSuggestedArrayOption = obj;
  }

  public handleClick() {
    this.publishValue('KEY_TO_APPEND', this.fiteredSuggestedArrayOption[this.sI]);
  }

  public getCurrentIndex(): number {
    return this.sI;
  }

}
