import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import jp from 'jsonpath/jsonpath.min';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap, map, tap } from 'rxjs/operators';
import { SubscribalService } from '../core/services/subscribal.service';

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


  private jsonObject = {
    "product": "Live JSON generator",
    "version": 3.1,
    "releaseDate": "2014-06-25T00:00:00.000Z",
    "demo": true,
    "hiyo": {
      "0": {
        "himanshu": "tamrakar"
        },
      "1": 'one'
    },
    "person": {
      "id": 12345,
      "name": "John Doe",
      "phones": {
        "home": "800-123-4567",
        "mobile": "877-123-1234"
      },
      "email": [
        "jd@example.com",
        "jd@example.org"
      ],
      "dateOfBirth": "1980-01-02T00:00:00.000Z",
      "registered": true,
      "emergencyContacts": [
        {
          "name": "Jane Doe",
          "phone": "888-555-1212",
          "relationship": "spouse"
        },
        {
          "name": "Justin Doe",
          "phone": "877-123-1212",
          "relationship": "parent"
        }
      ]
    },
    "test": { "0": "asd", "1": { "hilo": "World" }, "2": 'asda' },
    "test1": ["asd", "sasd", "asda"]
  }

  constructor(private subscribalService:SubscribalService) {

    this.subScripeToAppendKey('KEY_TO_APPEND');

    const subscription = this.keyUp.pipe(
      debounceTime(100),
      map(event => this.onKey(event))
      // distinctUntilChanged(),
      // flatMap(search => of(search).pipe(delay(500)))
    ).subscribe();
  }

  onKey(eventValue: any): void {
    if (eventValue == '') { this.suggestionArray = []; this.searchText = JSON.parse(JSON.stringify('')); return; }

    try {
      if (typeof (jp.query(this.jsonObject, eventValue)[0]) == 'object') {
        console.log('object', jp.query(this.jsonObject, eventValue))
        this.searchText = JSON.parse(JSON.stringify(''));
        this.suggestionArray = Object.keys(jp.query(this.jsonObject, eventValue)[0]);
      } else if (typeof (jp.query(this.jsonObject, eventValue)[0]) == 'string' || typeof (jp.query(this.jsonObject, eventValue)[0]) == 'number' || typeof (jp.query(this.jsonObject, eventValue)[0]) == 'boolean') {
        console.log('other')
        this.searchText = JSON.parse(JSON.stringify(''));
        this.suggestionArray = [];
      } else if (typeof (jp.query(this.jsonObject, eventValue)[0]) == 'undefined') {
        console.log('undefined')
        // this.suggestionArray = [];
        const valArr = eventValue.split('.');
        this.searchText = JSON.parse(JSON.stringify(valArr[valArr.length - 1]));
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

  public DropDownComponentEventListener(v: string): void {
    let temp = this.iB.nativeElement.value.split('.');

    this.iB.nativeElement.value = temp.join(".");
    this.keyUp.next(this.iB.nativeElement.value);
  }

  public subScripeToAppendKey(key:string) {
    this.subscribalService.returnSubjectKey(key).subscribe((value) => {

    })
  }

}
