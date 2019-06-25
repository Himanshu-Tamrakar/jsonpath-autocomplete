import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import jp from 'jsonpath/jsonpath.min';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap, map, tap } from 'rxjs/operators';
import { SubscribalService } from '../core/services/subscribal.service';
import { CommanService } from '../core/services/comman.service';

@Component({
  selector: 'app-object-autocomplete',
  templateUrl: './object-autocomplete.component.html',
  styleUrls: ['./object-autocomplete.component.css']
})
export class ObjectAutocompleteComponent {
  public keyUp = new Subject<string>();
  public suggestionArray: object = [];
  public searchText: string = '';

  @ViewChild('inputBox') iB: ElementRef;


  private jsonObject:any

  constructor(private subscribalService: SubscribalService, private CommanService:CommanService) {

    this.getData();

    const sub = this.subscribalService.returnSubjectKey('KEY_UP').pipe(
      debounceTime(100),
      map(event => this.onKey(event))
    ).subscribe();


    this.subscribalService.returnSubjectKey('KEY_TO_APPEND').pipe(
      debounceTime(100),
      map(event => this.appendKey(event))
    ).subscribe();
  }

  private getData() {
    this.CommanService.getAutoCompleteObject().subscribe((r) => {
      this.jsonObject = r['parsorObject'];
    }, (err) => {
      this.jsonObject = {};
    })
  }

  public onKey(eventValue: any): void {
    if (eventValue == '') { this.suggestionArray = []; this.searchText = JSON.parse(JSON.stringify('')); return; }
    let sT = '';
    let temp = eventValue.split('.');
    if (temp.length > 1) {

      try {
        if (typeof (jp.query(this.jsonObject, eventValue)[0]) == 'string' || typeof (jp.query(this.jsonObject, eventValue)[0]) == 'number' || typeof (jp.query(this.jsonObject, eventValue)[0]) == 'boolean') {
          this.searchText = JSON.parse(JSON.stringify(sT));
          this.suggestionArray = [];
          return;
        } else if (typeof (jp.query(this.jsonObject, eventValue)[0]) == 'object') {
          this.searchText = JSON.parse(JSON.stringify(sT));
          this.suggestionArray = Object.keys(jp.query(this.jsonObject, eventValue)[0]);
        } else {
          sT = temp[temp.length - 1];
          temp.splice(-1, 1);
          eventValue = temp.join('.')
        }
      } catch (err) {
        sT = temp[temp.length - 1];
        temp.splice(-1, 1);
        eventValue = temp.join('.')
      }


    }

    // console.log('sdsds',temp.join('.'));
    try {
      if (typeof (jp.query(this.jsonObject, eventValue)[0]) == 'object') {
        // this.searchText = JSON.parse(JSON.stringify(''));
        this.searchText = JSON.parse(JSON.stringify(sT));

        this.suggestionArray = Object.keys(jp.query(this.jsonObject, eventValue)[0]);

        if (Array.isArray(jp.query(this.jsonObject, eventValue)[0])) {
          let tempArr = <any[]>this.suggestionArray;
          tempArr.unshift('*');
          this.suggestionArray = tempArr;
        }

      } else if (typeof (jp.query(this.jsonObject, eventValue)[0]) == 'string' || typeof (jp.query(this.jsonObject, eventValue)[0]) == 'number' || typeof (jp.query(this.jsonObject, eventValue)[0]) == 'boolean') {
        console.log('other')
        this.searchText = JSON.parse(JSON.stringify(''));
        this.suggestionArray = [];
      } else if (typeof (jp.query(this.jsonObject, eventValue)[0]) == 'undefined') {
        console.log('undefined')
        // this.suggestionArray = [];
        const valArr = eventValue.split('.');
        // this.searchText = JSON.parse(JSON.stringify(valArr[valArr.length - 1]));
        this.searchText = JSON.parse(JSON.stringify(sT));
      } else {
        console.log('else')
        this.searchText = JSON.parse(JSON.stringify(''));
        // this.suggestionArray = [];
      }
    } catch (err) {
      console.log('catch')
      this.searchText = JSON.parse(JSON.stringify(''));
      // this.suggestionArray = [];
    }
  }

  public appendKey(keyName: string) {
    let temp = this.iB.nativeElement.value.split('.');

    // TO CHECK WHEATHER LAST KEY IS NOT EMPTY
    if (temp[temp.length - 1] == '') temp[temp.length - 1] = keyName;
    else temp.push(keyName);

    this.iB.nativeElement.value = temp.join(".");

    this.subscribalService.publishValue('KEY_UP', this.iB.nativeElement.value);
  }

  // public DropDownComponentEventListener(v: string): void {
  //   let temp = this.iB.nativeElement.value.split('.');
  //
  //   this.iB.nativeElement.value = temp.join(".");
  //   this.keyUp.next(this.iB.nativeElement.value);
  // }



}
