import { Component, OnInit } from '@angular/core';
import jp from 'jsonpath/jsonpath.min';

@Component({
  selector: 'app-object-autocomplete',
  templateUrl: './object-autocomplete.component.html',
  styleUrls: ['./object-autocomplete.component.css']
})
export class ObjectAutocompleteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private jsonObject = {
      "_id": "5cf3a29b9feeb6018f47283c",
      "index": 0,
      "guid": "9396c356-ef46-45c5-a288-44e44efba69d",
      "isActive": false,
      "balance": "$2,528.41",
      "picture": "http://placehold.it/32x32",
      "age": 31,
      "eyeColor": "blue",
      "name": "Kimberly Carrillo",
      "gender": "female",
      "company": "UNCORP",
      "email": "kimberlycarrillo@uncorp.com",
      "phone": "+1 (827) 567-3988",
      "address": "725 Oxford Street, Rose, Northern Mariana Islands, 2008",
      "about": "Eu exercitation ipsum ut est non voluptate sint ullamco elit ex consequat magna nostrud reprehenderit. Irure elit pariatur velit veniam veniam in. Deserunt enim excepteur do enim enim id dolore id veniam exercitation aliqua sit. Est sunt Lorem et dolor eu. Cupidatat qui in ad dolore quis adipisicing reprehenderit. Irure nisi Lorem amet et sunt nulla officia adipisicing.\r\n",
      "registered": "2014-12-08T05:09:29 -06:-30",
      "latitude": 24.77343,
      "longitude": 49.375398,
      "tags": [
        "sint",
        "fugiat",
        "ipsum",
        "laboris",
        "qui",
        "irure",
        "officia"
      ],
      "friends": [
        {
          "id": 0,
          "name": "Lorna Ashley"
        },
        {
          "id": 1,
          "name": "Stein Brady"
        },
        {
          "id": 2,
          "name": "Tina Bentley"
        }
      ],
      "greeting": "Hello, Kimberly Carrillo! You have 2 unread messages.",
      "favoriteFruit": "apple"
    }

  suggestionArray: object = []

  onKey(event: any) {
    try {
      if (typeof (jp.query(this.jsonObject, event.target.value)[0]) == 'object') {
        this.suggestionArray = Object.keys(jp.query(this.jsonObject, event.target.value)[0]);
      } else {
        this.suggestionArray = [];
      }

    } catch (err) {
      this.suggestionArray = [];
    }

  }

}
