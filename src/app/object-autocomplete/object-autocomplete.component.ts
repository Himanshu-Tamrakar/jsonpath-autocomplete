import { Component, OnInit } from '@angular/core';
import jp from 'jsonpath/jsonpath.min';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-object-autocomplete',
  templateUrl: './object-autocomplete.component.html',
  styleUrls: ['./object-autocomplete.component.css']
})
export class ObjectAutocompleteComponent {
  public keyUp = new Subject<string>();
  public suggestionArray: object = [];
  public searchText: string = '';

  private jsonObject =
    {
      "product": "Live JSON generator",
      "version": 3.1,
      "releaseDate": "2014-06-25T00:00:00.000Z",
      "demo": true,
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
      }
    }

  constructor() {
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
        this.searchText = JSON.parse(JSON.stringify(''));
        this.suggestionArray = Object.keys(jp.query(this.jsonObject, eventValue)[0]);
      } else if (typeof (jp.query(this.jsonObject, eventValue)[0]) == 'string' || typeof (jp.query(this.jsonObject, eventValue)[0]) == 'number' || typeof (jp.query(this.jsonObject, eventValue)[0]) == 'boolean') {
        this.searchText = JSON.parse(JSON.stringify(''));
        this.suggestionArray = [];
      } else if (typeof (jp.query(this.jsonObject, eventValue)[0]) == 'undefined') {
        // this.suggestionArray = [];
        const valArr = eventValue.split('.');
        this.searchText = JSON.parse(JSON.stringify(valArr[valArr.length - 1]));
      } else {
        this.searchText = JSON.parse(JSON.stringify(''));
        // this.suggestionArray = [];
      }
    } catch (err) {
      this.searchText = JSON.parse(JSON.stringify(''));
      // this.suggestionArray = [];
    }
  }

  public DropDownComponentEventListener(v: string): void {
    console.log('emmited value', v);
  }

}
