import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() { }
  // getCurrentkeys(v: string) {
  //   let arr = [];
  //
  //   return new Promise((resolve, reject) => {
  //     if (!this.checkSyntex(v)) return resolve(arr);
  //     arr = Object.keys(this.jsonObject);
  //     return resolve(arr);
  //   })
  // }
}
