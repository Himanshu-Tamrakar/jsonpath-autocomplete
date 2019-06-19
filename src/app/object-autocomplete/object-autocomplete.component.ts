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

  private jsonObject = [
  {
    "_id": "5d099823ece8e0a540ebeecf",
    "index": 0,
    "guid": "b0fbc7d8-e7ad-4b29-affa-1e7a08904793",
    "isActive": true,
    "balance": "$2,863.97",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "green",
    "name": "Rosalyn Bass",
    "gender": "female",
    "company": "CANDECOR",
    "email": "rosalynbass@candecor.com",
    "phone": "+1 (865) 523-3592",
    "address": "464 Glen Street, Macdona, Tennessee, 195",
    "about": "Consectetur nulla eiusmod sunt aliqua commodo est quis. Laborum minim nostrud sint ad magna voluptate in Lorem enim excepteur dolore. Irure sunt ad proident eu eiusmod id occaecat cillum amet proident incididunt ea. Nostrud culpa ex velit fugiat non eiusmod irure ullamco aute voluptate. Minim id labore pariatur amet reprehenderit nisi in ea cupidatat adipisicing adipisicing occaecat. Incididunt consectetur culpa duis magna ullamco consectetur id et in incididunt sint ut id exercitation.\r\n",
    "registered": "2019-06-11T09:24:38 -06:-30",
    "latitude": -76.155262,
    "longitude": 6.870334,
    "tags": [
      "non",
      "Lorem",
      "voluptate",
      "veniam",
      "culpa",
      "commodo",
      "pariatur"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Yvonne Ingram"
      },
      {
        "id": 1,
        "name": "Lenore Wolfe"
      },
      {
        "id": 2,
        "name": "Josie Weber"
      }
    ],
    "greeting": "Hello, Rosalyn Bass! You have 4 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5d0998230c3ea71db4c96f85",
    "index": 1,
    "guid": "9b5f72cd-f85a-4f63-b43e-c3df92599ca6",
    "isActive": true,
    "balance": "$3,378.26",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "green",
    "name": "Juliana Terrell",
    "gender": "female",
    "company": "FREAKIN",
    "email": "julianaterrell@freakin.com",
    "phone": "+1 (890) 552-2501",
    "address": "465 Desmond Court, Holcombe, Northern Mariana Islands, 2108",
    "about": "Anim officia quis ea proident cillum. Sunt mollit fugiat cupidatat exercitation mollit. Sunt adipisicing ad sunt ea nisi occaecat dolor dolore nisi sit eiusmod quis est ut. Minim ea sint id commodo ipsum aliqua esse magna tempor ut.\r\n",
    "registered": "2015-08-07T04:39:33 -06:-30",
    "latitude": -36.848297,
    "longitude": -75.476449,
    "tags": [
      "nostrud",
      "amet",
      "aliqua",
      "laborum",
      "ipsum",
      "nulla",
      "commodo"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Julianne Spence"
      },
      {
        "id": 1,
        "name": "Schwartz Kim"
      },
      {
        "id": 2,
        "name": "Dudley Bradley"
      }
    ],
    "greeting": "Hello, Juliana Terrell! You have 10 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5d099823c85f668bad66ed53",
    "index": 2,
    "guid": "f363f6b2-4edd-4b65-950b-162a71732c48",
    "isActive": false,
    "balance": "$1,609.30",
    "picture": "http://placehold.it/32x32",
    "age": 36,
    "eyeColor": "blue",
    "name": "Bell Saunders",
    "gender": "male",
    "company": "ORONOKO",
    "email": "bellsaunders@oronoko.com",
    "phone": "+1 (938) 478-3109",
    "address": "811 Lamont Court, Brady, California, 493",
    "about": "Dolor Lorem ea minim anim reprehenderit id dolor ea nostrud ipsum occaecat. Cillum do ea in ut dolore qui quis exercitation. Laborum nulla eu magna est excepteur esse commodo sunt.\r\n",
    "registered": "2019-01-26T10:08:05 -06:-30",
    "latitude": 46.720987,
    "longitude": 104.971571,
    "tags": [
      "non",
      "amet",
      "minim",
      "aliquip",
      "qui",
      "ex",
      "ad"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Delgado Wyatt"
      },
      {
        "id": 1,
        "name": "Odonnell Crosby"
      },
      {
        "id": 2,
        "name": "Lauri Gates"
      }
    ],
    "greeting": "Hello, Bell Saunders! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5d099823fae4bc50e6b326ef",
    "index": 3,
    "guid": "1a4b24bd-f1c1-41d5-986b-921086a10da1",
    "isActive": false,
    "balance": "$1,891.92",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "blue",
    "name": "Spencer Kemp",
    "gender": "male",
    "company": "ISBOL",
    "email": "spencerkemp@isbol.com",
    "phone": "+1 (826) 530-2030",
    "address": "333 Bevy Court, Gratton, Guam, 5800",
    "about": "Ad ex mollit incididunt laborum adipisicing amet Lorem sint occaecat dolore anim incididunt. Duis amet non excepteur consequat elit magna et occaecat laborum Lorem. Aute veniam reprehenderit fugiat nulla dolor cillum. Cupidatat esse nisi ad aliqua sint laboris nostrud nostrud nostrud commodo commodo qui cupidatat magna. Laboris eiusmod do amet duis minim exercitation ullamco. Consectetur Lorem cupidatat occaecat proident Lorem excepteur cillum ullamco exercitation irure. Veniam pariatur deserunt nostrud tempor pariatur occaecat elit occaecat velit.\r\n",
    "registered": "2017-05-27T12:05:08 -06:-30",
    "latitude": 44.553956,
    "longitude": 37.261021,
    "tags": [
      "irure",
      "laboris",
      "irure",
      "amet",
      "exercitation",
      "reprehenderit",
      "ullamco"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Carmella Hurley"
      },
      {
        "id": 1,
        "name": "Nola Leblanc"
      },
      {
        "id": 2,
        "name": "Adams Heath"
      }
    ],
    "greeting": "Hello, Spencer Kemp! You have 10 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5d0998231507147fd2506319",
    "index": 4,
    "guid": "f146ef8d-35d8-4980-8d7b-47ca9b115442",
    "isActive": true,
    "balance": "$2,454.00",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "brown",
    "name": "Jean Simmons",
    "gender": "female",
    "company": "SURELOGIC",
    "email": "jeansimmons@surelogic.com",
    "phone": "+1 (868) 536-3984",
    "address": "227 Anchorage Place, Nescatunga, Oregon, 9754",
    "about": "Ut dolore Lorem nostrud fugiat nisi anim commodo ad quis exercitation enim. Exercitation velit ex ipsum nostrud laborum. Irure fugiat proident cupidatat non nisi ipsum fugiat veniam dolore adipisicing anim aliqua pariatur nulla. Laborum ad non tempor enim incididunt consectetur exercitation id tempor. Proident sint magna in magna aute pariatur eiusmod eiusmod et. Magna dolor id laborum nisi voluptate reprehenderit nostrud enim laborum id ex deserunt laboris sint. Aliqua et consequat occaecat velit cillum nisi id reprehenderit ut velit.\r\n",
    "registered": "2017-04-07T01:03:26 -06:-30",
    "latitude": -84.593754,
    "longitude": 125.938652,
    "tags": [
      "nulla",
      "veniam",
      "reprehenderit",
      "veniam",
      "deserunt",
      "nulla",
      "cillum"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Kristine Bonner"
      },
      {
        "id": 1,
        "name": "Karla Schultz"
      },
      {
        "id": 2,
        "name": "Katelyn Turner"
      }
    ],
    "greeting": "Hello, Jean Simmons! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5d09982382beef7458c569fd",
    "index": 5,
    "guid": "ce405b7f-125a-4221-8975-e4961c0b29a1",
    "isActive": true,
    "balance": "$2,964.74",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "blue",
    "name": "Anthony Witt",
    "gender": "male",
    "company": "KANGLE",
    "email": "anthonywitt@kangle.com",
    "phone": "+1 (943) 474-3400",
    "address": "413 Fairview Place, Grapeview, Minnesota, 7260",
    "about": "Cillum eiusmod ullamco anim eiusmod fugiat velit. Veniam excepteur sit do elit velit proident id anim. Irure est magna eu duis id mollit exercitation ut incididunt do esse. Velit deserunt quis irure et nisi.\r\n",
    "registered": "2016-10-16T08:09:12 -06:-30",
    "latitude": 49.986997,
    "longitude": 70.368889,
    "tags": [
      "nostrud",
      "magna",
      "fugiat",
      "duis",
      "sint",
      "culpa",
      "do"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Terry Kidd"
      },
      {
        "id": 1,
        "name": "Horn Peck"
      },
      {
        "id": 2,
        "name": "Katie Sosa"
      }
    ],
    "greeting": "Hello, Anthony Witt! You have 4 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5d099823e08cae0b492e6f17",
    "index": 6,
    "guid": "b978adbf-3fa3-4bf8-a88e-b7c1b3f43cd7",
    "isActive": true,
    "balance": "$2,959.18",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "blue",
    "name": "Vance Bauer",
    "gender": "male",
    "company": "NETROPIC",
    "email": "vancebauer@netropic.com",
    "phone": "+1 (836) 456-3252",
    "address": "475 Louise Terrace, Camas, Arkansas, 9354",
    "about": "Labore duis ipsum quis ex elit exercitation id ex dolor nulla excepteur aute. Lorem fugiat aliqua Lorem et est ad laborum aute. Minim proident commodo ut enim. Adipisicing in in esse qui. Ad magna nisi proident nostrud irure reprehenderit adipisicing nulla.\r\n",
    "registered": "2018-12-21T01:04:47 -06:-30",
    "latitude": 13.324184,
    "longitude": 57.0459,
    "tags": [
      "culpa",
      "in",
      "id",
      "exercitation",
      "cupidatat",
      "tempor",
      "magna"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Griffith Roberson"
      },
      {
        "id": 1,
        "name": "Lucas Figueroa"
      },
      {
        "id": 2,
        "name": "Sarah Walters"
      }
    ],
    "greeting": "Hello, Vance Bauer! You have 4 unread messages.",
    "favoriteFruit": "banana"
  }
]

  suggestionArray: object = []

  onKey(event: any): void {
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

  public DropDownComponentEventListener(v: string): void {
    console.log('emmited value', v);
  }

}
